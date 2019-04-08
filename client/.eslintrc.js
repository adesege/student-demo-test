const { resolve } = require("path");

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ["airbnb-base", "plugin:nuxt/recommended"],
  // required to lint *.vue files
  plugins: ["vue"],
  settings: {
    "import/resolver": {
      webpack: {
        config: {
          resolve: {
            alias: {
              "~": resolve(__dirname, "./")
            }
          }
        }
      }
    }
  },
  // add your custom rules here
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "class-methods-use-this": "off",
    indent: ["error", 2],
    "prefer-reflect": 0,
    "max-len": [1, 120, 2],
    "one-var": 0,
    "one-var-declaration-per-line": 0,
    "new-cap": 0,
    "consistent-return": 0,
    "no-param-reassign": 0,
    "comma-dangle": 1,
    curly: ["error", "multi-line"],
    "import/no-unresolved": [2, { commonjs: true }],
    "no-shadow": ["error", { allow: ["req", "res", "err"] }],
    "no-multi-str": 0
  }
}
