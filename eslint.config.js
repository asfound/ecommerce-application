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
  { ignores: ['dist', 'node_modules', '**/*config.js', '**/*.spec.ts', '**/global.d.ts'] },
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
      'import/named': 'off',
      'unicorn/no-null': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'unicorn/prevent-abbreviations': ['error', { allowList: { env: true } }],
      'lines-between-class-members': ['error', 'always'],
      'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/method-signature-style': ['error', 'method'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          arrayLiteralTypeAssertions: 'never',
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'never',
        },
      ],
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      'default-param-last': 'off',
      '@typescript-eslint/default-param-last': 'error',
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': [
        'error',
        { ignore: [0, -1], ignoreArrayIndexes: true, ignoreClassFieldInitialValues: true },
      ],
    },
  },
  eslintConfigPrettier,
);
