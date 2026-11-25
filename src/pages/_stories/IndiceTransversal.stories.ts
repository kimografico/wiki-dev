import IndiceTransversal from "./IndiceTransversal.astro";

// Los índices por categoría y por etiqueta comparten IndiceTransversal.
export default {
  component: IndiceTransversal,
};

export const Categoria = {
  args: { tipo: "categoria", valor: "framework" },
};

export const Etiqueta = {
  args: { tipo: "etiqueta", valor: "frontend" },
};
