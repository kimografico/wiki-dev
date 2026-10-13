// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Sitio de proyecto en GitHub Pages: https://kimografico.github.io/wiki-dev/
  // Todo enlace y asset debe construirse con import.meta.env.BASE_URL.
  site: "https://kimografico.github.io",
  base: "/wiki-dev/",

  // La integración @astrojs/react (islas interactivas: buscador y preferencias) se
  // activa en F1, cuando exista el primer componente. Está instalada desde F0
  // (§8.1); registrarla sin islas solo emite un chunk de cliente sin usar.

  // Tailwind v4 entra por el plugin de Vite; los tokens de tema (data-theme) se
  // definen en src/styles/global.css en F1 (RF-13).
  vite: {
    plugins: [tailwindcss()],
  },
});
