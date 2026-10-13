import { beforeEach, describe, expect, it, vi } from "vitest";

const { getCollection, render } = vi.hoisted(() => ({
  getCollection: vi.fn(),
  render: vi.fn(),
}));

vi.mock("astro:content", () => ({ getCollection, render }));

import {
  getBacklinks,
  getEntrada,
  getPaginaEntrada,
  getPorColeccion,
  getRelacionados,
  getTodasLasEntradas,
  urlEntrada,
} from "./entradas.ts";

function entrada(id: string, extra: Record<string, unknown> = {}) {
  return {
    id,
    data: {
      titulo: id,
      resumen: "resumen",
      categoria: "concepto",
      tags: [],
      alias: [],
      relacionados: [],
      autoenlace: true,
      ...extra,
    },
  };
}

const datos: Record<string, ReturnType<typeof entrada>[]> = {
  glosario: [entrada("hidratacion"), entrada("slug")],
  tecnologias: [
    entrada("astro", { relacionados: ["hidratacion", "react", "fantasma"] }),
    entrada("react"),
    entrada("nextjs"),
  ],
  paquetes: [entrada("vitest", { relacionados: ["astro"] })],
  comparativas: [entrada("frameworks", { entidades: ["astro", "nextjs"] })],
};

beforeEach(() => {
  getCollection.mockReset();
  getCollection.mockImplementation(async (coleccion: string) => datos[coleccion] ?? []);
  render.mockReset();
});

describe("getTodasLasEntradas / getPorColeccion", () => {
  it("normaliza todas las entradas con su colección", async () => {
    const todas = await getTodasLasEntradas();
    expect(todas).toHaveLength(7);
    expect(todas.find((e) => e.slug === "astro")?.coleccion).toBe("tecnologias");
  });

  it("devuelve solo las entradas de una colección", async () => {
    const tecnologias = await getPorColeccion("tecnologias");
    expect(tecnologias.map((e) => e.slug)).toEqual(["astro", "react", "nextjs"]);
  });

  it("rellena alternativas y entidades ausentes con listas vacías", async () => {
    const [astro] = await getPorColeccion("tecnologias");
    expect(astro?.alternativas).toEqual([]);
    expect(astro?.entidades).toEqual([]);
  });
});

describe("getEntrada", () => {
  it("encuentra una entrada por slug", async () => {
    const astro = await getEntrada("astro");
    expect(astro?.titulo).toBe("astro");
    expect(astro?.coleccion).toBe("tecnologias");
  });

  it("devuelve undefined si no existe", async () => {
    await expect(getEntrada("no-existe")).resolves.toBeUndefined();
  });
});

describe("getRelacionados", () => {
  it("resuelve solo los slugs existentes", async () => {
    const relacionados = await getRelacionados("astro");
    expect(relacionados.map((e) => e.slug).sort()).toEqual([
      "hidratacion",
      "react",
    ]);
  });

  it("devuelve vacío para una entrada inexistente", async () => {
    await expect(getRelacionados("no-existe")).resolves.toEqual([]);
  });
});

describe("getBacklinks", () => {
  it("lista las entradas que referencian el slug", async () => {
    const backlinks = await getBacklinks("hidratacion");
    expect(backlinks.map((e) => e.slug)).toEqual(["astro"]);
  });
});

describe("getPaginaEntrada", () => {
  it("devuelve la entrada con su contenido renderizado", async () => {
    const headings = [{ depth: 2, slug: "que-es", text: "Qué es" }];
    render.mockResolvedValue({ Content: "contenido", headings });
    const pagina = await getPaginaEntrada("astro");
    expect(pagina?.entrada.slug).toBe("astro");
    expect(pagina?.Content).toBe("contenido");
    expect(pagina?.headings).toBe(headings);
  });

  it("devuelve undefined y no renderiza si no existe", async () => {
    await expect(getPaginaEntrada("no-existe")).resolves.toBeUndefined();
    expect(render).not.toHaveBeenCalled();
  });
});

describe("urlEntrada", () => {
  it("compone la URL respetando base, colección y slug", () => {
    expect(urlEntrada("tecnologias", "astro", "/wiki-dev/")).toBe(
      "/wiki-dev/tecnologias/astro",
    );
  });
});
