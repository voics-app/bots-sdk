import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/", "coverage/", "docs/api/", "node_modules/", "**/node_modules/"] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-restricted-imports": "off",
    },
  },
  {
    files: ["src/domain/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["**/application/**", "**/infrastructure/**", "**/interface/**"], message: "domain must not depend on outer layers" },
            { group: ["node:*", "ws"], message: "domain must stay free of IO" },
          ],
        },
      ],
    },
  },
  {
    files: ["src/application/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["**/infrastructure/**", "**/interface/**"], message: "application depends only on domain and its own ports" },
          ],
        },
      ],
    },
  },
);
