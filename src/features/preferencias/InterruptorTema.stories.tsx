// Story de Astrobook (solo desarrollo): muestra la isla del interruptor de tema
// aislada. Astrobook añade `client:load` a los componentes que no son Astro, así
// que aquí el botón hidrata y funciona. Se explora en http://localhost:4321/astrobook.
import InterruptorTema from "./InterruptorTema.tsx";

export default {
  component: InterruptorTema,
};

export const Predeterminado = {};
