import PaginaTelegramBot from "../../features/telegrambot/PaginaTelegramBot.astro";

// Las páginas `/telegrambot` y `/telegrambot/tecnico` comparten
// PaginaTelegramBot y solo cambian la variante del contenido.
export default {
  component: PaginaTelegramBot,
};

export const Funcional = {
  args: { variante: "funcional" },
};

export const Tecnico = {
  args: { variante: "tecnico" },
};
