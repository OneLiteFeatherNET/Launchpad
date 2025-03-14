module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "google", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint", "sort-keys-fix"],
  rules: {
    "sort-keys-fix/sort-keys-fix": "warn",
    "valid-jsdoc": "off",
    "vue/multi-word-component-names": "off",
  },
};
