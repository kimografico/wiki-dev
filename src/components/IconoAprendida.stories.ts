import IconoAprendida from "./IconoAprendida.astro";

export default {
  component: IconoAprendida,
};

export const Predeterminado = {
  args: { class: "w-8 h-8 text-[var(--color-dev-text)]" },
};

export const Pequeno = {
  args: { class: "w-4 h-4 text-[var(--color-muted-text)]" },
};
