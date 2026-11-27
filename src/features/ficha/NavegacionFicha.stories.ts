import NavegacionFicha from "./NavegacionFicha.astro";

// ASTRO: Astrobook lee stories CSF3 desde `src` y monta el componente con los
// args; aquí se ve el par de botones sin las preferencias del lector (RF-14).
// REACT+VITE: serían las mismas stories en Storybook.
export default {
  component: NavegacionFicha,
};

export const ConAmbosVecinos = {
  args: { slug: "react", coleccion: "tecnologias" },
};

export const SoloPrimeraFicha = {
  args: { slug: "angular", coleccion: "tecnologias" },
};

export const SoloUltimaFicha = {
  args: { slug: "zustand", coleccion: "tecnologias" },
};
