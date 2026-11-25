import PaginaFicha from "./PaginaFicha.astro";

// Las páginas `/glosario/<slug>`, `/tecnologias/<slug>`, etc. comparten
// PaginaFicha; cada story enseña una ficha real de una colección.
export default {
  component: PaginaFicha,
};

export const Glosario = {
  args: { slug: "accesibilidad-web" },
};

export const Tecnologia = {
  args: { slug: "astro" },
};

export const Paquete = {
  args: { slug: "zod" },
};

export const Comparativa = {
  args: { slug: "frameworks-frontend" },
};

export const Patron = {
  args: { slug: "observer" },
};

export const IA = {
  args: { slug: "agente" },
};

export const Testing = {
  args: { slug: "vitest" },
};
