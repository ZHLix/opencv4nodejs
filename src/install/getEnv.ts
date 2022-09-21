import OpenCVBuilder, { OpenCVBuildEnv, OpencvModule } from '@zhlix/opencv-build'
import log from 'npmlog'
import { resolvePath } from '../lib/commons'
import { defaultLibDir, getOPENCV4NODEJS_DEFINES, getOPENCV4NODEJS_INCLUDES, getOPENCV4NODEJS_LIBRARIES } from './utils'

log.level = 'silent'

/**
 * @returns return a path like /usr/local/lib
 */
function getDefaultLibDir(env: OpenCVBuildEnv) {
  log.info('install', 'OPENCV_LIB_DIR is not set, looking for default lib dir')
  if (env.isWin) {
    throw new Error('OPENCV_LIB_DIR has to be defined on windows when auto build is disabled')
  }
  return defaultLibDir
}

/**
 * @returns a built lib directory
 */
function getLibDir(env: OpenCVBuildEnv): string {
  if (env.isAutoBuildDisabled) {
    return resolvePath(process.env.OPENCV_LIB_DIR) || getDefaultLibDir(env)
  } else {
    const dir = resolvePath(env.opencvLibDir)
    if (!dir) {
      throw Error('failed to resolve opencvLibDir path')
    }
    return dir
  }
}

export const getDefines = () => {
  const builder = new OpenCVBuilder()
  const libDir: string = getLibDir(builder.env)
  const libsInDir: OpencvModule[] = builder.getLibs.getLibs()
  const libsFoundInDir: OpencvModule[] = libsInDir.filter(lib => lib.libPath)
  if (!libsFoundInDir.length) {
    throw new Error('no OpenCV libraries found in lib dir: ' + libDir)
  }
  return getOPENCV4NODEJS_DEFINES(libsFoundInDir).join(';')
}

export const getIncludes = () => {
  const env = new OpenCVBuildEnv()
  return getOPENCV4NODEJS_INCLUDES(env).join(';')
}

export const getLibraries = () => {
  const builder = new OpenCVBuilder()
  const libDir: string = getLibDir(builder.env)
  const libsInDir: OpencvModule[] = builder.getLibs.getLibs()
  const libsFoundInDir: OpencvModule[] = libsInDir.filter(lib => lib.libPath)
  if (!libsFoundInDir.length) {
    throw new Error('no OpenCV libraries found in lib dir: ' + libDir)
  }
  return getOPENCV4NODEJS_LIBRARIES(builder.env, libDir, libsFoundInDir).join(';')
}

export const getLibraryDir = () => {
  const builder = new OpenCVBuilder()
  const libDir: string = getLibDir(builder.env)
  return libDir
}

type EnvNameType = 'OPENCV4NODEJS_DEFINES' | 'OPENCV4NODEJS_INCLUDES' | 'OPENCV4NODEJS_LIBRARIES' | 'OPENCV4NODEJS_LIBRARY_DIR'

const envName = process.argv[2] as EnvNameType

if (!envName) {
  throw new Error('没有传递环境名称来解析环境')
}

let outputs: string

switch (envName) {
  case 'OPENCV4NODEJS_DEFINES':
    outputs = getDefines()
    break
  case 'OPENCV4NODEJS_INCLUDES':
    outputs = getIncludes()
    break
  case 'OPENCV4NODEJS_LIBRARIES':
    outputs = getLibraries()
    break
  case 'OPENCV4NODEJS_LIBRARY_DIR':
    outputs = getLibraryDir()
    break
  default:
    throw new Error('传递的环境名称不符合要求')
}

outputs
  .split(';')
  .filter(v => v)
  .forEach(v => console.log(v))
