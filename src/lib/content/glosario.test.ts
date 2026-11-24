import { describe, expect, it, vi } from "vitest";

const { getCollection } = vi.hoisted(() => ({ getCollection: vi.fn() }));

vi.mock("astro:content", () => ({ getCollection }));

import { getGlosarioPorLetra, getTodosLosTerminos } from "./glosario.ts";

function termino(id: string, titulo: string) {
  return {
    id,
    data: {
      titulo,
      resumen: "r",
      categoria: "concepto",
      tags: [],
      alias: [],
      relacionados: [],
      autoenlace: true,
    },
  };
}

const glosarioPorDefecto = [
  termino("zod", "Zod"),
  termino("astro", "Astro"),
  termino("indice", "Índice"),
  termino("nandu", "Ñandú"),
  termino("capas", "3 capas"),
];

function implPorDefecto(coleccion: string) {
  return Promise.resolve(coleccion === "glosario" ? glosarioPorDefecto : []);
}

getCollection.mockImplementation(implPorDefecto);

describe("getTodosLosTerminos", () => {
  it("ordena alfabéticamente en español", async () => {
    const terminos = await getTodosLosTerminos();
    const titulos = terminos.map((t) => t.titulo);
    expect(titulos).toHaveLength(5);
    expect(titulos.indexOf("Astro")).toBeLessThan(titulos.indexOf("Índice"));
    expect(titulos.indexOf("Índice")).toBeLessThan(titulos.indexOf("Ñandú"));
    expect(titulos.indexOf("Ñandú")).toBeLessThan(titulos.indexOf("Zod"));
  });
});

describe("getGlosarioPorLetra", () => {
  it("agrupa por letra inicial, sin acentos y con '#' al final", async () => {
    const grupos = await getGlosarioPorLetra();
    expect(grupos.map((g) => g.letra)).toEqual(["A", "I", "N", "Z", "#"]);
    expect(grupos.find((g) => g.letra === "A")?.entradas.map((e) => e.slug)).toEqual([
      "astro",
    ]);
    expect(grupos.at(-1)?.entradas.map((e) => e.slug)).toEqual(["capas"]);
  });

  it("deja el grupo '#' al final aunque se inserte antes que otros", async () => {
    getCollection.mockImplementation(async (coleccion: string) =>
      coleccion === "glosario"
        ? [
            termino("omega", "Ωmega"),
            termino("astro", "Astro"),
            termino("nandu", "Ñandú"),
          ]
        : [],
    );
    try {
      const grupos = await getGlosarioPorLetra();
      expect(grupos.map((g) => g.letra)).toEqual(["A", "N", "#"]);
      expect(grupos.at(-1)?.entradas.map((e) => e.slug)).toEqual(["omega"]);
    } finally {
      getCollection.mockImplementation(implPorDefecto);
    }
  });
});
