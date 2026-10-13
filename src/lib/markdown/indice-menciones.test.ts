import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { construirIndiceMenciones } from "./indice-menciones.ts";

const raices: string[] = [];

afterEach(async () => {
  await Promise.all(
    raices.map((raiz) => rm(raiz, { recursive: true, force: true })),
  );
  raices.length = 0;
});

async function raizContenido(): Promise<string> {
  const raiz = await mkdtemp(join(tmpdir(), "wiki-indice-"));
  raices.push(raiz);
  for (const coleccion of [
    "glosario",
    "tecnologias",
    "paquetes",
    "comparativas",
  ]) {
    await mkdir(join(raiz, coleccion), { recursive: true });
  }
  return raiz;
}

async function escribir(
  raiz: string,
  coleccion: string,
  slug: string,
  frontmatter: string,
): Promise<void> {
  await writeFile(
    join(raiz, coleccion, `${slug}.md`),
    `---\n${frontmatter}\n---\n\ncuerpo\n`,
  );
}

describe("construirIndiceMenciones", () => {
  it("recoge títulos y alias, ordenados de más largo a más corto", async () => {
    const raiz = await raizContenido();
    await escribir(raiz, "tecnologias", "react", "titulo: React");
    await escribir(
      raiz,
      "glosario",
      "arquitectura-de-islas",
      "titulo: Arquitectura de islas\nalias:\n  - islas",
    );
    await escribir(raiz, "paquetes", "vite", "titulo: Vite");

    const { terminos } = await construirIndiceMenciones(raiz);
    const textos = terminos.map((t) => t.termino);
    expect(textos).toContain("React");
    expect(textos).toContain("islas");
    expect(terminos.find((t) => t.termino === "islas")?.slug).toBe(
      "arquitectura-de-islas",
    );
    const longitudes = terminos.map((t) => t.termino.length);
    expect([...longitudes].sort((a, b) => b - a)).toEqual(longitudes);
  });

  it("excluye las entradas con autoenlace: false", async () => {
    const raiz = await raizContenido();
    await escribir(
      raiz,
      "glosario",
      "comun",
      "titulo: Común\nautoenlace: false",
    );
    const { terminos } = await construirIndiceMenciones(raiz);
    expect(terminos).toEqual([]);
  });

  it("conserva solo la primera aparición de un término duplicado", async () => {
    const raiz = await raizContenido();
    await escribir(raiz, "glosario", "a", "titulo: React");
    await escribir(raiz, "tecnologias", "react", "titulo: React");
    const { terminos } = await construirIndiceMenciones(raiz);
    const react = terminos.filter((t) => t.termino === "React");
    expect(react).toHaveLength(1);
    expect(react[0]?.slug).toBe("a");
  });

  it("recorre subdirectorios", async () => {
    const raiz = await raizContenido();
    await mkdir(join(raiz, "tecnologias", "sub"), { recursive: true });
    await writeFile(
      join(raiz, "tecnologias", "sub", "anidado.md"),
      "---\ntitulo: Anidado\n---\n\ncuerpo\n",
    );
    const { terminos } = await construirIndiceMenciones(raiz);
    expect(terminos.map((t) => t.slug)).toContain("anidado");
  });

  it("devuelve un índice vacío si no hay contenido", async () => {
    const { terminos } = await construirIndiceMenciones("ruta/que-no-existe");
    expect(terminos).toEqual([]);
  });
});

describe("indiceMenciones", () => {
  it("memoiza el índice aunque cambie la raíz", async () => {
    vi.resetModules();
    const mod = await import("./indice-menciones.ts");
    const raiz = await raizContenido();
    await escribir(raiz, "paquetes", "vite", "titulo: Vite");

    const primera = mod.indiceMenciones(raiz);
    const segunda = mod.indiceMenciones("otra/raiz");
    expect(segunda).toBe(primera);
    await expect(primera).resolves.toMatchObject({
      terminos: [{ termino: "Vite", slug: "vite", coleccion: "paquetes" }],
    });
  });
});
