/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.ts': 'npm run lint',
  '*': 'npm run format',
  '*.css': 'npm run stylelint',
};
