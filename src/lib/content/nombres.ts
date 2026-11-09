// Nombres visibles de categorías y etiquetas (§7.2 y §7.5).
// El slug/valor del enum es la clave de URL; aquí está cómo se escribe para el
// lector. TypeScript comprueba que no falte ninguno de los enums de esquemas.ts.
import { CATEGORIAS, ETIQUETAS, type Coleccion } from "./esquemas.ts";

const NOMBRES_CATEGORIA: Record<(typeof CATEGORIAS)[number], string> = {
  lenguaje: "Lenguaje",
  framework: "Framework",
  estilos: "Estilos",
  estado: "Estado",
  "datos-api": "Datos y API",
  "rendimiento-ux": "Rendimiento y UX",
  herramienta: "Herramienta",
  despliegue: "Despliegue",
  concepto: "Concepto",
};

const NOMBRES_ETIQUETA: Record<(typeof ETIQUETAS)[number], string> = {
  frontend: "Frontend",
  backend: "Backend",
  tests: "Tests",
  terminal: "Terminal",
  accesibilidad: "Accesibilidad",
  rendimiento: "Rendimiento",
  seguridad: "Seguridad",
};

const NOMBRES_COLECCION: Record<Coleccion, string> = {
  glosario: "Glosario",
  tecnologias: "Tecnologías",
  paquetes: "Paquetes",
  comparativas: "Comparativas",
};

/** Nombre visible de una categoría; si el valor no existe, se muestra tal cual. */
export function nombreCategoria(valor: string): string {
  return (
    NOMBRES_CATEGORIA[valor as keyof typeof NOMBRES_CATEGORIA] ?? valor
  );
}

/** Nombre visible de una etiqueta; si el valor no existe, se muestra tal cual. */
export function nombreEtiqueta(valor: string): string {
  return NOMBRES_ETIQUETA[valor as keyof typeof NOMBRES_ETIQUETA] ?? valor;
}

/** Nombre visible de una colección. */
export function nombreColeccion(valor: string): string {
  return NOMBRES_COLECCION[valor as keyof typeof NOMBRES_COLECCION] ?? valor;
}
