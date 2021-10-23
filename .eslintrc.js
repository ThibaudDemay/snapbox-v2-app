module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "no-unused-vars": "off",
    "vue/script-setup-uses-vars": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "vue/no-unused-properties": [
      "warn",
      {
        groups: ["props", "setup"],
        deepData: true,
      },
    ],
    "vue/max-len": [
      "warn",
      {
        code: 120, 
        ignoreComments: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreHTMLTextContents: true
      }
    ],
    "max-len": [
      "warn",
      {
        code: 120, 
        ignoreUrls: true,
        ignoreTemplateLiterals: true
      }
    ],
  },
};
