import BotonPreview from "../stories/BotonPreview.astro";

export default {
  component: BotonPreview,
};

export const Principal = {
  args: { variante: "principal" },
};

export const Secundario = {
  args: { variante: "secundaria" },
};

export const Deshabilitado = {
  args: { variante: "secundaria", disabled: true },
};
