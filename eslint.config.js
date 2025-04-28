import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginImport from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  perfectionist.configs['recommended-natural'],
  eslintPluginUnicorn.configs.recommended,
  eslintPluginImport.flatConfigs.recommended,
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
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
  {
    rules: {
      'import/no-cycle': 'error',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': ['error', { allowList: { env: true } }],
    },
  },
  eslintConfigPrettier,
);
