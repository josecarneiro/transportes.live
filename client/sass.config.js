'use strict';

const scssImports = ['~@/style/variables', '~@/style/utilities'];

module.exports = {
  prependData: [...scssImports.map(item => `@import "${item}"`), ''].join(';')
};
