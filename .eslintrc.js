module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-dupe-keys": "warn",
    "vue/no-duplicate-attributes": "warn",
    "vue/no-side-effects-in-computed-properties": "warn",
    "vue/no-use-v-if-with-v-for": "warn",
    "vue/attributes-order": "warn",
    "vue/order-in-components": "warn",
  },
};
