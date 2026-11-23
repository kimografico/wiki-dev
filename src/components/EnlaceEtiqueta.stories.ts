import EnlaceEtiqueta from "./EnlaceEtiqueta.astro";

export default {
  component: EnlaceEtiqueta,
};

export const Etiqueta = {
  args: { href: "#frontend", tipo: "tag" },
};

export const CategoriaConConteo = {
  args: { href: "#frontend", tipo: "categoria", conteo: 12 },
};
