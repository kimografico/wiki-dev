import { describe, expect, it } from "vitest";
import {
  CAMPOS_RELACION,
  COLECCIONES,
  SECCIONES_GENERADAS,
  SECCIONES_OBLIGATORIAS,
  esquemaComparativas,
  esquemaGlosario,
  esquemaPaquetes,
  esquemaPatrones,
  esquemaTecnologias,
  esquemasPorColeccion,
} from "./esquemas.ts";

const comunes = {
  titulo: "Ejemplo",
  resumen: "Un resumen",
  categoria: "concepto",
} as const;

describe("catálogo de colecciones y enums", () => {
  it("declara las cuatro colecciones en orden", () => {
    expect(COLECCIONES).toEqual([
      "glosario",
      "tecnologias",
      "paquetes",
      "comparativas",
    ]);
  });

  it("indexa un esquema por colección", () => {
    expect(Object.keys(esquemasPorColeccion).sort()).toEqual(
      [...COLECCIONES].sort(),
    );
  });
});

describe("esquema común", () => {
  it("aplica los valores por defecto", () => {
    const r = esquemaGlosario.parse(comunes);
    expect(r.tags).toEqual([]);
    expect(r.alias).toEqual([]);
    expect(r.relacionados).toEqual([]);
    expect(r.fuentes).toEqual([]);
    expect(r.autoenlace).toBe(true);
  });

  it("exige un título no vacío", () => {
    expect(esquemaGlosario.safeParse({ ...comunes, titulo: "" }).success).toBe(
      false,
    );
    const { titulo, ...sinTitulo } = comunes;
    void titulo;
    const r = esquemaGlosario.safeParse(sinTitulo);
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.some((i) => i.path.includes("titulo"))).toBe(true);
    }
  });

  it("rechaza categorías y etiquetas fuera del catálogo", () => {
    expect(
      esquemaGlosario.safeParse({ ...comunes, categoria: "inventada" }).success,
    ).toBe(false);
    expect(
      esquemaGlosario.safeParse({ ...comunes, tags: ["inventada"] }).success,
    ).toBe(false);
  });

  it("limita el resumen a 200 caracteres", () => {
    expect(
      esquemaGlosario.safeParse({ ...comunes, resumen: "x".repeat(201) })
        .success,
    ).toBe(false);
  });

  it("valida las fuentes como URLs", () => {
    expect(
      esquemaGlosario.safeParse({ ...comunes, fuentes: ["no-es-url"] }).success,
    ).toBe(false);
    expect(
      esquemaGlosario.safeParse({
        ...comunes,
        fuentes: ["https://ejemplo.com"],
      }).success,
    ).toBe(true);
  });
});

describe("esquemas por colección", () => {
  it("glosario acepta terminoEn opcional", () => {
    expect(esquemaGlosario.parse({ ...comunes, terminoEn: "example" })).toMatchObject(
      { terminoEn: "example" },
    );
    expect(esquemaGlosario.parse(comunes).terminoEn).toBeUndefined();
  });

  it("tecnologías y paquetes añaden alternativas, web y npm", () => {
    expect(esquemaTecnologias.parse(comunes).alternativas).toEqual([]);
    expect(
      esquemaTecnologias.parse({ ...comunes, web: "https://x.dev" }).web,
    ).toBe("https://x.dev");
    expect(
      esquemaPaquetes.parse({ ...comunes, npm: "@scope/pkg" }).npm,
    ).toBe("@scope/pkg");
    expect(
      esquemaTecnologias.safeParse({ ...comunes, web: "no-url" }).success,
    ).toBe(false);
  });

  it("comparativas exige al menos dos entidades y contexto", () => {
    expect(
      esquemaComparativas.safeParse({
        ...comunes,
        entidades: ["a"],
        contexto: "ctx",
      }).success,
    ).toBe(false);
    expect(
      esquemaComparativas.safeParse({
        ...comunes,
        entidades: ["a", "b"],
        contexto: "",
      }).success,
    ).toBe(false);
    expect(
      esquemaComparativas.safeParse({
        ...comunes,
        entidades: ["a", "b"],
        contexto: "ctx",
      }).success,
    ).toBe(true);
  });

  it("patrones exige una familia válida", () => {
    expect(esquemaPatrones.parse({ ...comunes, familia: "creacional" })).toMatchObject(
      { familia: "creacional" },
    );
    expect(
      esquemaPatrones.safeParse({ ...comunes, familia: "otra" }).success,
    ).toBe(false);
  });
});

describe("secciones y relaciones", () => {
  it("declara secciones obligatorias para cada colección", () => {
    for (const coleccion of COLECCIONES) {
      expect(SECCIONES_OBLIGATORIAS[coleccion].length).toBeGreaterThan(0);
    }
  });

  it("declara campos de relación por colección", () => {
    for (const coleccion of COLECCIONES) {
      expect(Array.isArray(CAMPOS_RELACION[coleccion])).toBe(true);
    }
    expect(CAMPOS_RELACION.glosario).toEqual([]);
    expect(CAMPOS_RELACION.comparativas).toContain("entidades");
  });

  it("reserva Relacionados y Mencionado en", () => {
    expect(SECCIONES_GENERADAS).toEqual(["Relacionados", "Mencionado en"]);
  });
});
