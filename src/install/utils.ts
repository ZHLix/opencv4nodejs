import child_process from 'child_process'
import { EOL } from 'os'
import log from 'npmlog'
import { OpenCVBuildEnv, OpencvModule } from '@zhlix/opencv-build'
import { resolvePath } from '../lib/commons'
import path from 'path'
import pc from 'picocolors'

/**
 * excape spaces for shell execution
 * @param txt text to escape
 * @returns a shell no spaced parameter
 */
export const protect = (txt: string): string => {
  if (txt.includes(' ')) {
    return `"${txt}"`
  } else {
    return txt
  }
}


export function exec(cmd: string, options?: child_process.ExecOptions): Promise<string> {
  log.silly('install', 'executing: %s', protect(cmd))
  return new Promise(function (resolve, reject) {
    child_process.exec(cmd, options, function (err, stdout, stderr) {
      const _err = err || stderr
      if (_err) return reject(_err)
      return resolve(stdout.toString())
    })
  })
}

export function execSync(cmd: string, options?: child_process.ExecOptions): string {
  log.silly('install', 'executing: %s', protect(cmd))
  const stdout = child_process.execSync(cmd, options)
  return stdout.toString()
}

/**
 * only used by findVs2017
 */
export function execFile(cmd: string, args: string[], options?: child_process.ExecOptions): Promise<string> {
  log.silly('install', 'executing: %s %s', protect(cmd), args.map(protect).join(' '))
  return new Promise(function (resolve, reject) {
    const child = child_process.execFile(cmd, args, options, function (err, stdout, stderr) {
      const _err = err || stderr
      if (_err) return reject(_err)
      return resolve(stdout.toString())
    })
    child.stdin && child.stdin.end()
  })
}

export function spawn(
  cmd: string,
  args: string[],
  options: child_process.ExecOptions,
  filters?: { err?: (data: Buffer) => Buffer | null; out?: (data: Buffer) => Buffer | null },
): Promise<string> {
  filters = filters || {}
  const filterStdout = (data: Buffer) => {
    if (filters && filters.out) {
      data = filters.out(data) as Buffer
      if (!data) return
    }
    process.stdout.write(data)
  }

  const filterStderr = (data: Buffer) => {
    if (filters && filters.err) {
      data = filters.err(data) as Buffer
      if (!data) return
    }
    process.stderr.write(data)
  }

  log.silly('install', 'spawning:', protect(cmd), args.map(protect).join(' '))
  return new Promise(function (resolve, reject) {
    try {
      const child = child_process.spawn(cmd, args, { stdio: ['inherit', 'pipe', 'pipe'], ...options })
      child.stderr.on('data', filterStderr)
      child.stdout.on('data', filterStdout)
      child.on('exit', function (code) {
        if (typeof code !== 'number') {
          code = null
        }
        const msg = `running: ${protect(cmd)} ${args.map(protect).join(' ')}${EOL}in ${
          options.cwd as string
        } exited with code ${code} (for more info, set '--loglevel silly')'`
        if (code !== 0) {
          return reject(msg)
        }
        return resolve(msg)
      })
    } catch (err) {
      return reject(err)
    }
  })
}



export const defaultDir = '/usr/local'
export const defaultLibDir = `${defaultDir}/lib`
export const defaultIncludeDir = `${defaultDir}/include`
export const defaultIncludeDirOpenCV4 = `${defaultIncludeDir}/opencv4`

/**
 * @returns global system include paths
 */
function getDefaultIncludeDirs(env: OpenCVBuildEnv) {
  log.info('install', 'OPENCV_INCLUDE_DIR is not set, looking for default include dir')
  if (env.isWin) {
    throw new Error('OPENCV_INCLUDE_DIR has to be defined on windows when auto build is disabled')
  }
  return [defaultIncludeDir, defaultIncludeDirOpenCV4]
}


export function getOPENCV4NODEJS_LIBRARIES(env: OpenCVBuildEnv, libDir: string, libsFoundInDir: OpencvModule[]): string[] {
  const libs = env.isWin
    ? libsFoundInDir.map(lib => resolvePath(lib.libPath))
    : // dynamically link libs if not on windows
      ['-L' + libDir].concat(libsFoundInDir.map(lib => '-lopencv_' + lib.opencvModule)).concat('-Wl,-rpath,' + libDir)

  if (libs.length > 0) {
    const dir = path.dirname(libs[0])
    const names = libs.map(lib => path.basename(lib))
    log.info('libs', `${EOL}Setting lib from ${pc.green(dir)} : ${names.map(pc.yellow).join(', ')}`)
  } else {
    log.info('libs', `${EOL}no Libs available`)
  }
  return libs
}

/**
 * generate all C++ Defines and debug them nicely on screen
 * @param libsFoundInDir selected modules
 * @returns list of defines
 */
export function getOPENCV4NODEJS_DEFINES(libsFoundInDir: OpencvModule[]): string[] {
  const defines = libsFoundInDir.map(lib => `OPENCV4NODEJS_FOUND_LIBRARY_${lib.opencvModule.toUpperCase()}`)
  log.info('defines', `${EOL}Setting the following defines:`)
  const longest = Math.max(...defines.map(a => a.length))
  let next = ''
  for (const define of defines) {
    if (next.length > 80) {
      log.info('defines', pc.yellow(next))
      next = ''
    }
    next += define.padEnd(longest + 1, ' ')
  }
  if (next) log.info('defines', pc.yellow(next))
  return defines
}

/**
 * generate C++ Includes
 * @param env context
 * @returns list of directory to include for C++ compiler
 */
export function getOPENCV4NODEJS_INCLUDES(env: OpenCVBuildEnv): string[] {
  const { OPENCV_INCLUDE_DIR } = process.env
  let explicitIncludeDir = ''
  if (OPENCV_INCLUDE_DIR) {
    explicitIncludeDir = resolvePath(OPENCV_INCLUDE_DIR)
  }
  const includes = env.isAutoBuildDisabled
    ? explicitIncludeDir
      ? [explicitIncludeDir]
      : getDefaultIncludeDirs(env)
    : [resolvePath(env.opencvInclude), resolvePath(env.opencv4Include)]
  log.info('install', `${EOL}Setting the following includes:`)
  includes.forEach(inc => log.info('includes', pc.green(inc)))
  return includes
}