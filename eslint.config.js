import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  perfectionist.configs['recommended-natural'],
  eslintPluginUnicorn.configs.recommended,
  { ignores: ['dist', 'node_modules', '**/*config.js', '**/*.spec.ts'] },
  { linterOptions: { noInlineConfig: true, reportUnusedDisableDirectives: true } },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': ['error', { allowList: { env: true } }],
    },
  },
  eslintConfigPrettier,
);
