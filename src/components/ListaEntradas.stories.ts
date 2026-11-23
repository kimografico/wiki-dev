import ListaEntradas from "./ListaEntradas.astro";
import { entradasDemo } from "../stories/entradas-demo.ts";

export default {
  component: ListaEntradas,
};

export const ConEntradas = {
  args: { entradas: entradasDemo },
};

export const Compacta = {
  args: { entradas: entradasDemo, compacto: true },
};

export const Vacia = {
  args: { entradas: [], vacio: "No hay entradas en esta colección." },
};
