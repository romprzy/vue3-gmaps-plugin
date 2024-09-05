/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

/* eslint-env node */
module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      // '@vue/eslint-config-typescript',
    ],
    rules: {
      // General
      'no-multiple-empty-lines': ['error'],
      'max-len': [2, {
        code: 160,
        ignoreComments: true,
        ignoreUrls: true,
        ignorePattern: 'd="([\\s\\S]*?)"',
      }],
      'comma-dangle': ['error', 'always-multiline'],
      'semi': ['error', 'never'],

      // Typescript
      // '@typescript-eslint/quotes': ['error', 'single',
      //   {
      //     'avoidEscape': true,
      //     'allowTemplateLiterals': true,
      //   },
      // ],
      // '@typescript-eslint/no-unused-vars': ['error', { 'ignoreRestSiblings': true }],

      // Vue
      'vue/valid-v-slot': ['error', {
        allowModifiers: true,
      }],
      'vue/attributes-order': ['error', { alphabetical: true }],
      'vue/html-indent': ['error'],
      'vue/html-closing-bracket-newline': ['error', {
        'singleline': 'never',
        'multiline': 'always',
      }],
      'vue/html-closing-bracket-spacing': ['error'],
      'vue/html-self-closing': ['error'],
      'vue/html-end-tags': ['error'],
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 2 },
        multiline: { max: 1 },
      }],
      'vue/singleline-html-element-content-newline': 0,
    },
    overrides: [
      {
        files: ['src/views/**/*.vue'],
        rules: {
          'vue/multi-word-component-names': 0,
        }
      },
    ],
  }
