import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript2';
import postcssModules from 'rollup-plugin-postcss-modules2';
import sourcemap from 'rollup-plugin-sourcemaps';
import autoprefixer from 'autoprefixer';

const external = id => !id.startsWith('.') && !id.startsWith('/');
// const pkg = require('../../package.json');

export default function createRollupConfig({ input, output, format, minify }) {
  const exports = format === 'es' ? 'default' : 'named';
  const globals = format === 'umd' ? {
    react: 'React',
    classnames: 'cx',
    tslib: 'tslib_1',
    'react-dom': 'ReactDOM',
    'react-transition-group': 'reactTransitionGroup',
  } : null;
  return {
    input,
    // external: Object.keys(pkg.dependencies),
    external,
    output: [{
      file: output,
      format,
      name: 't-modal',
      sourcemap: true,
      exports,
      globals,
    }],
    plugins: [
      postcssModules({
        inject: {
          insertAt: 'top',
        },
        modules: {
          generateScopedName: (name) => {
            return name;
          }
        },
        plugins: [autoprefixer()],
        writeDefinitions: true,
      }),
      nodeResolve({
        module: true,
        jsnext: true,
        main: true,
      }),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/react/react.js': ['Children', 'Component', 'createRef', 'createElement'],
          'node_modules/react-dom/index.js': ['render', 'createPortal'],
        }
      }),
      typescript({
        clean: true,
        tsconfig: 'tsconfig.json',
        useTsconfigDeclarationDir: true,
      }),
      sourcemap(),
      minify ? uglify() : '',
    ],
  };
}
