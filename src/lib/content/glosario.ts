// Lógica de dominio del glosario (feature glosario).
// Orden alfabético en español y agrupación por letra para el índice (RF-01).
import { getPorColeccion, type Entrada } from "./entradas.ts";

const colador = new Intl.Collator("es", { sensitivity: "base" });

/** Términos del glosario ordenados alfabéticamente (locale `es`). */
export async function getTodosLosTerminos(): Promise<Entrada[]> {
  const entradas = await getPorColeccion("glosario");
  return entradas.sort((a, b) => colador.compare(a.titulo, b.titulo));
}

export interface GrupoLetra {
  letra: string;
  entradas: Entrada[];
}

/** Letra inicial de agrupación, sin acentos y en mayúscula. */
function letraDe(titulo: string): string {
  const normalizado = titulo
    .trim()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
  const letra = normalizado.charAt(0).toLocaleUpperCase("es");
  return /[A-ZÑ]/.test(letra) ? letra : "#";
}

/** Los términos agrupados por letra inicial, con la lista de letras usadas. */
export async function getGlosarioPorLetra(): Promise<GrupoLetra[]> {
  const terminos = await getTodosLosTerminos();
  const grupos = new Map<string, Entrada[]>();
  for (const termino of terminos) {
    const letra = letraDe(termino.titulo);
    const lista = grupos.get(letra) ?? [];
    lista.push(termino);
    grupos.set(letra, lista);
  }
  return [...grupos.entries()]
    .sort(([a], [b]) => (a === "#" ? 1 : b === "#" ? -1 : a.localeCompare(b, "es")))
    .map(([letra, entradas]) => ({ letra, entradas }));
}
