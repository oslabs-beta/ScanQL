module.exports = {
  root: true,
  env: {  "node": true, browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "indent": ["warn", 2],
    "no-unused-vars": ["off", { "vars": "local" }],
    "prefer-const": "warn",
    "quotes": ["warn", "single"],
    "react/prop-types": "off",
    "semi": ["warn", "always"],
    "space-infix-ops": "warn"
  },
  "settings": {
    "react": { "version": "detect"}
  }
}
