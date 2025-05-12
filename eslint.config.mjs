import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.node } }
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" }
  },
  {
    files: ["./humanize-duration.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 3,
      globals: { define: "readonly" }
    },
    rules: {
      "no-inner-declarations": ["error", "functions"],
      "no-self-compare": ["error"],
      "no-unmodified-loop-condition": ["error"],
      "no-unreachable-loop": ["error"],
      "no-useless-assignment": ["error"]
    }
  }
]);
