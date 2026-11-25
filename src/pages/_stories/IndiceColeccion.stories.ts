import IndiceColeccion from "./IndiceColeccion.astro";

// Una story por página de colección real; todas comparten IndiceColeccion y
// se diferencian en el cuerpo (alfabético, grupos o lista plana).
export default {
  component: IndiceColeccion,
};

export const Glosario = {
  args: { coleccion: "glosario" },
};

export const Tecnologias = {
  args: { coleccion: "tecnologias" },
};

export const Paquetes = {
  args: { coleccion: "paquetes" },
};

export const Comparativas = {
  args: { coleccion: "comparativas" },
};

export const Patrones = {
  args: { coleccion: "patrones" },
};

export const IA = {
  args: { coleccion: "ia" },
};

export const Testing = {
  args: { coleccion: "testing" },
};
