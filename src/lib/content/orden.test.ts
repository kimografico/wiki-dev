import { describe, expect, it } from "vitest";
import { compararPorFecha, ordenarPorFecha } from "./orden.ts";

const entrada = (
  titulo: string,
  slug: string,
  fecha?: string,
): { titulo: string; slug: string; fecha?: Date } => ({
  titulo,
  slug,
  fecha: fecha ? new Date(`${fecha}T00:00:00Z`) : undefined,
});

describe("compararPorFecha", () => {
  it("coloca primero la fecha más reciente", () => {
    const reciente = entrada("Reciente", "reciente", "2026-11-24");
    const antigua = entrada("Antigua", "antigua", "2026-10-13");

    expect(compararPorFecha(reciente, antigua)).toBeLessThan(0);
    expect(compararPorFecha(antigua, reciente)).toBeGreaterThan(0);
  });

  it("coloca las entradas sin fecha al final", () => {
    const conFecha = entrada("Con fecha", "con-fecha", "2026-10-13");
    const sinFecha = entrada("Sin fecha", "sin-fecha");

    expect(compararPorFecha(conFecha, sinFecha)).toBeLessThan(0);
    expect(compararPorFecha(sinFecha, conFecha)).toBeGreaterThan(0);
  });

  it("desempata por título y, si coincide, por slug", () => {
    expect(
      compararPorFecha(
        entrada("Zorro", "zorro", "2026-11-24"),
        entrada("Árbol", "arbol", "2026-11-24"),
      ),
    ).toBeGreaterThan(0);
    expect(
      compararPorFecha(
        entrada("Igual", "b"),
        entrada("Igual", "a"),
      ),
    ).toBeGreaterThan(0);
  });

  it("devuelve 0 para dos entradas equivalentes", () => {
    expect(
      compararPorFecha(entrada("Igual", "slug"), entrada("Igual", "slug")),
    ).toBe(0);
  });
});

describe("ordenarPorFecha", () => {
  it("ordena de más reciente a más antigua sin mutar el array original", () => {
    const entradas = [
      entrada("Antigua", "antigua", "2026-10-13"),
      entrada("Sin fecha", "sin-fecha"),
      entrada("Reciente", "reciente", "2026-11-24"),
    ];

    const ordenadas = ordenarPorFecha(entradas);

    expect(ordenadas.map((e) => e.slug)).toEqual([
      "reciente",
      "antigua",
      "sin-fecha",
    ]);
    expect(entradas.map((e) => e.slug)).toEqual([
      "antigua",
      "sin-fecha",
      "reciente",
    ]);
  });

  it("devuelve un array vacío si no hay entradas", () => {
    expect(ordenarPorFecha([])).toEqual([]);
  });
});
