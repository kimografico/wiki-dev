import BuscadorRapido, { type ItemBusqueda } from "./BuscadorRapido.tsx";

const entradas: ItemBusqueda[] = [
  {
    slug: "astro",
    coleccion: "tecnologias",
    titulo: "Astro",
    resumen: "Framework para sitios rápidos, orientado al contenido.",
    categoria: "framework",
    tags: ["frontend"],
    url: `${import.meta.env.BASE_URL}tecnologias/astro`,
  },
  {
    slug: "react",
    coleccion: "tecnologias",
    titulo: "React",
    resumen: "Librería para construir interfaces de usuario.",
    categoria: "framework",
    tags: ["frontend"],
    url: `${import.meta.env.BASE_URL}tecnologias/react`,
  },
  {
    slug: "vite",
    coleccion: "paquetes",
    titulo: "Vite",
    resumen: "Herramienta de desarrollo y empaquetado para frontend.",
    categoria: "herramienta",
    tags: ["frontend"],
    url: `${import.meta.env.BASE_URL}paquetes/vite`,
  },
];

export default {
  component: BuscadorRapido,
};

export const Predeterminado = {
  args: { entradas },
};
