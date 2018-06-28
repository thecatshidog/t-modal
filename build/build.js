import { resolve } from 'path';
import { rollup } from 'rollup';
import createRollupConfig from '../config/rollup/rollup.config';
import rf from 'rimraf';

// __dirname 是当前文件运行的目录
const rootPath = resolve(__dirname, '..');
const dist = resolve(rootPath, 'dist');
const types = resolve(rootPath, 'types');
const entry = resolve(rootPath, './src/index.ts');

rf(dist, () => {});
// umd是AMD，COMMONJS，iife的通用模式
rf(types, () => {
  Promise.all([
    runRollup({entry, output: 't-modal.es.js', format: 'es'}),
    runRollup({entry, output: 't-modal.cjs.js', format: 'cjs'}),
    runRollup({entry, output: 't-modal.min.js', format: 'umd', minify: true}),
  ])
    .then(buildSuccess)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
      process.exit(1);
    });
});

function runRollup({entry, output, format, minify = false, outputDir = dist}) {
  const config = createRollupConfig({
    input: entry,
    output,
    format,
    minify,
  });
  return rollup(config)
    .then((bundle) => bundle.write({
      format,
      name: 't-modal',
      file: resolve(outputDir, output),
    }));
}

function buildSuccess(results) {
  console.log('构建完成');
  // return new Promise((resolve) => console.log('test'));
}