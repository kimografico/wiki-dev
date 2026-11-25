import CampoBusqueda from "./CampoBusqueda.astro";

export default {
  component: CampoBusqueda,
};

export const Vacio = {};

export const ConTexto = {
  args: { placeholder: "Astro", ariaLabel: "Buscar tecnologías" },
};
