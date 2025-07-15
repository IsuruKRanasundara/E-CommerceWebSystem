module.exports = [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {},
    rules: {
      // Add or override rules here
    },
    extends: ["eslint:recommended"],
    env: {
      node: true,
      es2021: true,
    },
  },
]; 