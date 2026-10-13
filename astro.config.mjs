// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import astrobook from "astrobook";
import { unified } from "@astrojs/markdown-remark";
import { remarkMenciones } from "./src/lib/markdown/remark-menciones.ts";

// Sitio de proyecto en GitHub Pages: https://kimografico.github.io/wiki-dev/
// Todo enlace y asset debe construirse con import.meta.env.BASE_URL.
const site = "https://kimografico.github.io";
const base = "/wiki-dev/";

// https://astro.build/config
export default defineConfig({
  site,
  base,

  integrations: [
    // ASTRO: la integración de React permite las islas interactivas (RF-13, RF-14).
    // REACT+VITE: React ya está en todas partes; aquí solo hidrata las islas.
    react(),
    // Astrobook es el visor de componentes; solo en desarrollo, nunca en el build
    // (RF: §11). Reutiliza los tokens del sitio.
    process.env.NODE_ENV === "development"
      ? astrobook({
          subpath: "/astrobook",
          css: ["./src/styles/global.css"],
          title: "Componentes de wiki-dev",
        })
      : null,
  ],

  markdown: {
    // ASTRO 7: el procesador por defecto (Sätteri) NO ejecuta plugins de remark.
    //   Fijar `unified()` hace que sí se ejecuten y mantiene el plugin portable.
    // REACT+VITE: usarías unified/remark directamente en tu pipeline.
    processor: unified({
      // unified recibe aquí el par [plugin, opciones] (forma de unified `.use`).
      remarkPlugins: [[remarkMenciones, { base }]],
    }),
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
