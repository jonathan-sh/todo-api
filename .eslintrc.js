module.exports = {
    env: {
      es6: true,
      node: true,
      jest: true
    },
    extends: [
      'standard',
      'plugin:@typescript-eslint/recommended'
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module'
    },
    plugins: [
      '@typescript-eslint',
    ],
    rules: {
      '@typescript-eslint/camelcase': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/explicit-member-accessibility': 1,
      '@typescript-eslint/no-use-before-define': 1,
      'no-unused-expressions': 1,
      "indent": ["error", 4],
      'no-throw-literal':0,
      "@typescript-eslint/explicit-function-return-type": 0
    }
  }