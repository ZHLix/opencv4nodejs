import { defineConfig } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import bin from 'rollup-plugin-shebang-bin'
import { terser } from 'rollup-plugin-terser'

export default defineConfig({
  input: {
    // 'install/bin': 'src/install/index.ts',
    'install/pre-package': 'src/install/pre-package.ts',
    'install/getEnv': 'src/install/getEnv.ts',
    opencv4nodejs: 'src/lib/opencv4nodejs.ts',
  },
  plugins: [
    //
    bin({ include: ['src/bin.ts'], exclude: [] }),
    terser(),
    typescript({ tsconfigOverride: { compilerOptions: { module: 'ESNext', skipLibCheck: true } } }),
  ],
  output: {
    dir: 'lib',
    format: 'cjs',
    exports: 'auto',
  },
})
