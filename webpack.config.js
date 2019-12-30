const path = require('path');
const { createDefaultConfig } = require('@open-wc/building-webpack');

module.exports = createDefaultConfig({
  input: path.resolve(__dirname, 'index.html'),
});
