import type { Entrada } from "../lib/content/entradas.ts";

type EntradaDemo = Omit<Entrada, "entry">;

export const astroDemo: EntradaDemo = {
  slug: "astro",
  coleccion: "tecnologias",
  titulo: "Astro",
  resumen: "Framework para sitios rápidos, orientado al contenido.",
  categoria: "framework",
  tags: ["frontend"],
  alias: [],
  relacionados: ["react"],
  autoenlace: true,
  alternativas: [],
  entidades: [],
};

export const entradasDemo: EntradaDemo[] = [
  astroDemo,
  {
    slug: "react",
    coleccion: "tecnologias",
    titulo: "React",
    resumen: "Librería para construir interfaces de usuario.",
    categoria: "framework",
    tags: ["frontend"],
    alias: [],
    relacionados: ["astro"],
    autoenlace: true,
    alternativas: [],
    entidades: [],
  },
];
