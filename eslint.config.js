// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import prettier from "eslint-config-prettier";

export default [
  {
    // Archivos de sistema (los edita el autor) y directorios no-código.
    ignores: [
      "dist/",
      ".astro/",
      "node_modules/",
      "coverage/",
      "public/",
      ".opencode/",
      ".github/",
      ".husky/",
      "specs/",
      "content/",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  prettier,
];
