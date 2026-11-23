import EntradaItem from "./EntradaItem.astro";
import { astroDemo } from "../stories/entradas-demo.ts";

export default {
  component: EntradaItem,
};

export const Normal = {
  args: { entrada: astroDemo },
};

export const Compacta = {
  args: { entrada: astroDemo, compacto: true },
};
