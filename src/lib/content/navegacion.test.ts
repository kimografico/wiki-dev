import { describe, expect, it } from "vitest";
import { vecinas, type FichaNav } from "./navegacion.ts";

function ficha(slug: string): FichaNav {
  return { slug, titulo: slug, url: `/glosario/${slug}/` };
}

const secuencia = ["a", "b", "c", "d"].map(ficha);

describe("vecinas", () => {
  it("devuelve la vecina inmediata a cada lado", () => {
    expect(vecinas(secuencia, "b")).toEqual({
      anterior: ficha("a"),
      siguiente: ficha("c"),
    });
  });

  it("no rodea al llegar al principio o al final", () => {
    expect(vecinas(secuencia, "a")).toEqual({ siguiente: ficha("b") });
    expect(vecinas(secuencia, "d")).toEqual({ anterior: ficha("c") });
  });

  it("devuelve nada si la ficha actual no está en la secuencia o está vacía", () => {
    expect(vecinas(secuencia, "desconocida")).toEqual({});
    expect(vecinas([], "a")).toEqual({});
  });

  it("con el filtro en todo muestra las aprendidas igual", () => {
    expect(vecinas(secuencia, "c", ["b", "d"], false)).toEqual({
      anterior: ficha("b"),
      siguiente: ficha("d"),
    });
  });

  it("con solo pendientes salta las aprendidas hacia ambos lados", () => {
    expect(vecinas(secuencia, "c", ["a", "b"], true)).toEqual({
      siguiente: ficha("d"),
    });
    expect(vecinas(secuencia, "d", ["b", "c"], true)).toEqual({
      anterior: ficha("a"),
    });
  });

  it("funciona aunque la ficha actual esté aprendida", () => {
    expect(vecinas(secuencia, "c", ["b", "c"], true)).toEqual({
      anterior: ficha("a"),
      siguiente: ficha("d"),
    });
  });

  it("no devuelve enlaces si no queda ninguna pendiente", () => {
    expect(vecinas(secuencia, "c", ["a", "b", "d"], true)).toEqual({});
  });
});
