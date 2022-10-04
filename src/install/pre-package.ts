import { copyFileSync, readlinkSync, renameSync, statSync, symlinkSync } from 'fs'
import { glob } from 'glob'
import { basename, dirname, join } from 'path'
import rimraf from 'rimraf'

const baseDir = 'build/Release'

const getType = (path: string) => {
  try {
    readlinkSync(path)
    return 'link'
  } catch (e) {
    const stat = statSync(path)
    if (stat.isFile()) return 'file'
    if (stat.isDirectory()) return 'dir'
    return undefined
  }
}

const main = async () => {
  // win 创建库文件软连接
  if (process.platform == 'win32') {
    const files = glob.sync('{bin,lib}/*', { nodir: true, cwd: baseDir }).map(v => join(baseDir, v))

    files.forEach(v => {
      const type = getType(v)
      console.log(`typeof ${v} => ${type}`)
      if (type == 'dir') return
      renameSync(v, join(baseDir, basename(v)))
      // if (type == 'link') return symlinkSync(join('./', basename(dirname(v)), basename(v)), join(baseDir, basename(v)))
      // symlinkSync(v, join(baseDir, basename(v)))
    })

    // 删除无用文件 & 目录
    const list = [join(baseDir, 'bin'), join(baseDir, 'lib')]
    list.forEach(v => rimraf.sync(v))
  }
  // 删除无用文件 & 目录
  const list = [join(baseDir, '.deps'), join(baseDir, 'obj.target'), join(baseDir, 'obj')]
  list.forEach(v => rimraf.sync(v))
}

main()
