'use strict';

module.exports = {
  // root: true,
  env: {
    node: true
  },
  // extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    },
    {
      files: ['**/src/**/*'],
      extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: 'babel-eslint'
      },
      globals: {
        process: true
      },
      rules: {
        'no-unused-vars': 'warn'
      }
    }
  ]
};
