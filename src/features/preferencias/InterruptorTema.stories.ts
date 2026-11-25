// Story de Astrobook (solo desarrollo): muestra la isla nativa del tema aislada.
// Astrobook solo añade `client:load` a componentes React; aquí el custom element
// se registra con su propio `<script>`, igual que en la wiki.
import InterruptorTema from "./InterruptorTema.astro";

export default {
  component: InterruptorTema,
};

export const Predeterminado = {};
