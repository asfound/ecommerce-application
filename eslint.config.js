import eslint from '@eslint/js';
import eslintConfigPrettier from "eslint-config-prettier/flat";
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist'

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  perfectionist.configs['recommended-natural'],
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
  eslintConfigPrettier
);
