// ESLint v9+ config migrated from .eslintrc.json
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        Swal: "readonly",
      },
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
      },
    },
    // Ambiente já definido em languageOptions.globals
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];
