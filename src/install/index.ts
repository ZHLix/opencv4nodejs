import { spawn } from './utils'
import { compileLib } from './compileLib'

async function run() {
  const argv = process.argv
  try {
    await spawn('node-pre-gyp', ['install'], { cwd: process.cwd() })
  } catch (e) {
    // console.log(argv)
    compileLib(argv)
  }
}

run()
