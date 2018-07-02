import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript2';
import postcssModules from 'rollup-plugin-postcss-modules2';
import sourcemap from 'rollup-plugin-sourcemaps';
import autoprefixer from 'autoprefixer';

const external = id => !id.startsWith('.') && !id.startsWith('/');
const pkg = require('../../package.json');

const name = pkg.name;

export default function createRollupConfig({ input, outputDir }) {
  const globals = {
    react: 'React',
    classnames: 'cx',
    tslib: 'tslib_1',
    'react-dom': 'ReactDOM',
    'react-transition-group': 'reactTransitionGroup',
  };
  const plugins = [
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
    ];
  return [{
    input,
    // external: Object.keys(pkg.dependencies),
    external,
    output: [{
      file: `${outputDir}/${name}.cjs.js`,
      format: 'cjs',
      name: 't-modal',
      exports: 'named',
      sourcemap: true,
    }, {
      file: `${outputDir}/${name}.esm.js`,
      format: 'es',
      name: 't-modal',
      exports: 'named',
      sourcemap: true,
    }],
    plugins,
  }, {
    input,
    external,
    output: {
      file: `${outputDir}/${name}.min.js`,
      format: 'umd',
      name: 't-modal',
      exports: 'named',
      sourcemap: true,
      globals,
    },
    plugins: [
      ...plugins,
      uglify(),
    ],
  }];
}
