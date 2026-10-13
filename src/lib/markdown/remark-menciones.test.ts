import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { TerminoMencion } from "./indice-menciones.ts";
import { remarkMenciones, type OpcionesMenciones } from "./remark-menciones.ts";

interface Nodo {
  type: string;
  value?: string;
  url?: string;
  depth?: number;
  children?: Nodo[];
}

const terminos: TerminoMencion[] = [
  { termino: "React Router", slug: "react-router", coleccion: "paquetes" },
  { termino: "React", slug: "react", coleccion: "tecnologias" },
  { termino: "astro", slug: "astro", coleccion: "tecnologias" },
];

function opciones(): OpcionesMenciones {
  return { base: "/wiki-dev/", indice: { terminos } };
}

function root(children: Nodo[]): Nodo {
  return { type: "root", children };
}

function parrafo(...children: Nodo[]): Nodo {
  return { type: "paragraph", children };
}

function texto(value: string): Nodo {
  return { type: "text", value };
}

function encabezado(depth: number, value: string): Nodo {
  return { type: "heading", depth, children: [texto(value)] };
}

function enlaces(nodo: Nodo, acc: string[] = []): string[] {
  if (nodo.type === "link" && nodo.url) acc.push(nodo.url);
  for (const hijo of nodo.children ?? []) enlaces(hijo, acc);
  return acc;
}

const raices: string[] = [];
afterEach(async () => {
  await Promise.all(
    raices.map((raiz) => rm(raiz, { recursive: true, force: true })),
  );
  raices.length = 0;
});

describe("remarkMenciones", () => {
  it("enlaza solo la primera mención de cada término", async () => {
    const arbol = root([
      parrafo(texto("Uso React a diario. React es genial.")),
    ]);
    await remarkMenciones(opciones())(arbol);
    expect(enlaces(arbol)).toEqual(["/wiki-dev/tecnologias/react"]);
  });

  it("prefiere la coincidencia más larga", async () => {
    const arbol = root([parrafo(texto("React Router ayuda"))]);
    await remarkMenciones(opciones())(arbol);
    expect(enlaces(arbol)).toEqual(["/wiki-dev/paquetes/react-router"]);
  });

  it("ignora mayúsculas/minúsculas y respeta los límites de palabra", async () => {
    const arbol = root([parrafo(texto("react y Reactive"))]);
    await remarkMenciones(opciones())(arbol);
    expect(enlaces(arbol)).toEqual(["/wiki-dev/tecnologias/react"]);
  });

  it("reinicia las primeras menciones en cada sección '##'", async () => {
    const arbol = root([
      encabezado(2, "Uno"),
      parrafo(texto("React")),
      parrafo(texto("React")),
      encabezado(2, "Dos"),
      parrafo(texto("React")),
    ]);
    await remarkMenciones(opciones())(arbol);
    expect(enlaces(arbol)).toEqual([
      "/wiki-dev/tecnologias/react",
      "/wiki-dev/tecnologias/react",
    ]);
  });

  it("no reinicia en encabezados '###'", async () => {
    const arbol = root([
      encabezado(3, "A"),
      parrafo(texto("React")),
      encabezado(3, "B"),
      parrafo(texto("React")),
    ]);
    await remarkMenciones(opciones())(arbol);
    expect(enlaces(arbol)).toHaveLength(1);
  });

  it("no enlaza dentro de código, encabezados, enlaces, html ni yaml", async () => {
    const arbol = root([
      encabezado(1, "React"),
      { type: "code", value: "React" },
      { type: "inlineCode", value: "React" },
      { type: "link", url: "https://x.dev", children: [texto("React")] },
      { type: "html", value: "<b>React</b>" },
      { type: "yaml", value: "React" },
      { type: "definition", url: "/x", value: "React" },
      { type: "image", url: "react.png" },
    ]);
    await remarkMenciones(opciones())(arbol);
    expect(enlaces(arbol)).toEqual(["https://x.dev"]);
  });

  it("no enlaza la entrada sobre la que se está escribiendo", async () => {
    const arbol = root([parrafo(texto("React"))]);
    await remarkMenciones(opciones())(arbol, {
      path: "/content/tecnologias/react.md",
    });
    expect(enlaces(arbol)).toEqual([]);
  });

  it("no falla con un árbol sin hijos", async () => {
    const arbol: Nodo = { type: "root" };
    await expect(remarkMenciones(opciones())(arbol)).resolves.toBeUndefined();
  });

  it("usa el historial del archivo si no hay ruta", async () => {
    const arbol = root([parrafo(texto("React"))]);
    await remarkMenciones(opciones())(arbol, { history: ["/x/react.md"] });
    expect(enlaces(arbol)).toEqual([]);
  });

  it("normaliza un base sin barra final", async () => {
    const arbol = root([parrafo(texto("astro"))]);
    await remarkMenciones({ base: "/wiki-dev", indice: { terminos } })(arbol);
    expect(enlaces(arbol)).toEqual(["/wiki-dev/tecnologias/astro"]);
  });

  it("no cambia nada si no hay términos", async () => {
    const arbol = root([parrafo(texto("React"))]);
    await remarkMenciones({ base: "/", indice: { terminos: [] } })(arbol);
    expect(enlaces(arbol)).toEqual([]);
  });

  it("construye el índice desde el contenido si no se le pasa uno", async () => {
    const raiz = await mkdtemp(join(tmpdir(), "wiki-remark-"));
    raices.push(raiz);
    await mkdir(join(raiz, "tecnologias"), { recursive: true });
    await writeFile(
      join(raiz, "tecnologias", "astro.md"),
      "---\ntitulo: Astro\n---\n\ncuerpo\n",
    );
    const arbol = root([parrafo(texto("Astro"))]);
    await remarkMenciones({ base: "/b", raizContenido: raiz })(arbol);
    expect(enlaces(arbol)).toEqual(["/b/tecnologias/astro"]);
  });
});
