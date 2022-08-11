const RULES = {
  OFF: "off",
  WARN: "warn",
  ERROR: "error",
};
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["standard", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    /* propTypes para desactivarlo */
    "react/prop-types": RULES.OFF,
    "react/react-in-jsx-scope": RULES.OFF,
    "no-tabs": "error",
    indent: ["error", 2],
  },
};
