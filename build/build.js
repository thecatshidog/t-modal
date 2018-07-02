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
  Promise.all(runRollup({entry}))
    .then(buildSuccess)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
      process.exit(1);
    });
});

function runRollup({entry, outputDir = dist}) {
  const config = createRollupConfig({
    input: entry,
    outputDir: dist,
  });
  return config.map((itemConfig) => {
    return rollup(itemConfig)
    .then((bundle) =>{
      if (Array.isArray(itemConfig.output)) {
        itemConfig.output.map(item => {
          bundle.write({
            name: 't-modal',
            file: item.file,
            format: item.format,
            exports: item.exports,
          });
        });
      } else {
        bundle.write({
          name: 't-modal',
          file: itemConfig.output.file,
          format: itemConfig.output.format,
          globals: itemConfig.output.globals,
          exports: itemConfig.output.exports,
        });
      }
  });
  });
}

function buildSuccess(results) {
  console.log('构建完成');
  // return new Promise((resolve) => console.log('test'));
}