import importPlugin from "eslint-plugin-import";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  ...tseslint.configs.recommended,
  {
    plugins: {
      import: importPlugin
    },
  
    rules: {
      "import/extensions": ["error", "always"]
    },
  },
];
