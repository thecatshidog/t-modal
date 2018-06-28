const path = require('path');

module.exports = {
  type: 'react-app',
  polyfill: false,
  webpack: {
    extra: {
      resolve: {
        extensions: ['.ts', '.tsx', 'css'],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
          },
        ],
      },
    },
    styles: {
      css: [
        {
          include: path.resolve('src/'),
          css: {
            modules: true,
          }
        },
        {
          exclude: path.resolve('src/')
        }
      ]
    },
    extractText: {
      allChunks: true,
    },
  },
};
