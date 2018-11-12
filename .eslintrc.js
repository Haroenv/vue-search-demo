/* eslint-disable import/no-commonjs */

module.exports = {
  extends: ['algolia/jest', 'algolia/vue'],
  rules: {
    'no-warning-comments': 'warn', // we have many Todo:, this will remind us to deal with them
    'no-use-before-define': 'off',
    'vue/attribute-hyphenation': [
      'error',
      'always',
      {
        ignore: ['createURL'],
      },
    ],
    'no-param-reassign': 'off',
    'no-console': 'off',
  },
};
