import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [ js.configs.recommended, ...tseslint.configs.recommended, "prettier" ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // предупреждение для комментариев TODO/FIXME
      "no-warning-comments": [
        "warn",
        {
          "terms": [ "todo", "fixme" ],
          "location": "anywhere"
        }
      ],
      "quotes": [ "error", "single" ], // Одинарные кавычки
      "semi": [ "error", "never" ],     // Без ;
      "max-len": [                    // Новое правило для 80 символов
        "error",
        {
          "code": 80,                 // Максимальная длина строки
          "ignoreUrls": true,         // Игнорировать URL
          "ignoreStrings": true,      // Игнорировать строки в кавычках
          "ignoreTemplateLiterals": true, // Игнорировать `шаблонные строки`
          "ignoreRegExpLiterals": true,  // Игнорировать /регулярки/
          "ignoreComments": true      // Игнорировать комментарии
        }
      ]
    },
  },
)
