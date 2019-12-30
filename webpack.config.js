const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { createDefaultConfig } = require('@open-wc/building-webpack');

const config = createDefaultConfig({
  input: path.resolve(__dirname, 'index.html'),
});

module.exports = merge(config, {
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [new CopyWebpackPlugin(['app.css'])],
});
