/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  'src/**/*.{js,ts,cjs,mjs,json,md,css}': 'prettier --write --ignore-unknown',
  'src/**/*.{js,ts,cjs,mjs}': 'eslint --fix --max-warnings 0 --no-warn-ignored',
  'src/**/*.css': 'stylelint --fix',
};
