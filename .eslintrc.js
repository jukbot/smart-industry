module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['plugin:polymer/polymer-2', 'eslint:recommended', 'google'],
  parserOptions: {
    ecmaVersion: 6,
  },
  env: {
    browser: true,
  },
  plugins: ['polymer'],
  globals: {
    Polymer: true,
  },
  // add your custom rules here
  rules: {
    'no-console': 'off',
  },
};
