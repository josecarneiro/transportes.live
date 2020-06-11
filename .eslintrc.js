'use strict';

module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2019
  },
  rules: {
    'comma-dangle': ['warn', 'never'],
    'func-call-spacing': ['warn', 'never'],
    'keyword-spacing': [
      'warn',
      {
        before: true,
        after: true
      }
    ],
    strict: ['error', 'global'],
    'no-unused-vars': ['warn'],
    'no-undef': ['error'],
    'no-var': ['warn'],
    'no-param-reassign': ['error'],
    'no-shadow': ['warn'],
    'no-labels': ['error'],
    'prefer-arrow-callback': ['warn'],
    'prefer-const': ['warn'],
    'quote-props': ['off'],
    semi: ['warn', 'always'],
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'space-before-blocks': ['warn', 'always']
  },
  overrides: [
    {
      files: ['**/*.spec.js'],
      env: {
        jest: true
      }
    }
  ]
};
