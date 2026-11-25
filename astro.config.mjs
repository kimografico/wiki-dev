// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mermaid from "astro-mermaid";
import astrobook from "astrobook";
import { unified } from "@astrojs/markdown-remark";
import { remarkMenciones } from "./src/lib/markdown/remark-menciones.ts";
import { rehypeTablas } from "./src/lib/markdown/rehype-tablas.ts";

// Sitio de proyecto en GitHub Pages: https://kimografico.github.io/wiki-dev/
// Todo enlace y asset debe construirse con import.meta.env.BASE_URL.
// En desarrollo se usa la raíz para que Astrobook esté en /astrobook; la build
// usa /wiki-dev/. ASTRO_BASE_URL permite simular otra base en local.
const site = "https://kimografico.github.io";
const base =
  process.env.ASTRO_BASE_URL ||
  (process.env.NODE_ENV === "development" ? "/" : "/wiki-dev/");

// https://astro.build/config
export default defineConfig({
  site,
  base,

  integrations: [
    mermaid({ autoTheme: true, enableLog: false }),
    // Astrobook es el visor de componentes; solo en desarrollo, nunca en el build
    ...(process.env.NODE_ENV === "development"
      ? [
          astrobook({
            subpath: "/astrobook",
            // Se escanea `src` para que el sidebar agrupe por carpeta real
            // (pages/, components/, ...) en vez de colgar todo de stories/.
            directory: "src",
            css: ["./src/styles/global.css"],
            title: "Componentes de wiki-dev",
          }),
        ]
      : []),
  ],

  markdown: {
    // ASTRO 7: el procesador por defecto (Sätteri) NO ejecuta plugins de remark.
    //   Fijar `unified()` hace que sí se ejecuten y mantiene el plugin portable.
    // REACT+VITE: usarías unified/remark directamente en tu pipeline.
    processor: unified({
      // unified recibe aquí el par [plugin, opciones] (forma de unified `.use`).
      remarkPlugins: [[remarkMenciones, { base }]],
      // ASTRO: rehype actúa sobre el HTML ya generado; aquí envuelve cada tabla
      // en un contenedor con scroll propio (RNF-08). El plugin es unified puro.
      // REACT+VITE: sería un plugin de rehype en el pipeline de MDX.
      rehypePlugins: [rehypeTablas],
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
