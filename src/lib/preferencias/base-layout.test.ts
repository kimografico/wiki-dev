// El <script is:inline> de <head> no puede importar módulos, así que lleva una
// copia mínima de las reglas de preferencias. Este test la ejecuta sobre un DOM
// falso y compara su resultado con la implementación real (RF-14).
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import {
  CLAVE_APRENDIDAS,
  CLAVE_SOLO_PENDIENTES,
  cssPreferencias,
} from "./aprendidas.ts";
import { CLAVE_TEMA } from "./tema.ts";

const LAYOUT = new URL("../../layouts/BaseLayout.astro", import.meta.url);

async function codigoPreferencias(): Promise<string> {
  const fuente = await readFile(LAYOUT, "utf8");
  const coincidencia = /<script is:inline>([\s\S]*?)<\/script>/.exec(fuente);
  if (!coincidencia) {
    throw new Error(
      "No se encontró el script inline de preferencias en BaseLayout",
    );
  }
  return coincidencia[1]!;
}

function ejecutar(
  codigo: string,
  datos: Record<string, string>,
  sistemaOscuro = false,
) {
  const dataset: Record<string, string> = {};
  const style = { id: "", textContent: "" };
  runInNewContext(codigo, {
    document: {
      documentElement: { dataset },
      head: { appendChild: () => undefined },
      getElementById: () => null,
      createElement: () => style,
    },
    localStorage: {
      getItem: (clave: string) => (clave in datos ? datos[clave]! : null),
    },
    matchMedia: () => ({ matches: sistemaOscuro }),
  });
  return { dataset, css: style.textContent };
}

interface Caso {
  nombre: string;
  datos: Record<string, string>;
  aprendidas: string[];
  solo: boolean;
}

const casos: Caso[] = [
  {
    nombre: "sin aprendidas y filtro todo",
    datos: {},
    aprendidas: [] as string[],
    solo: false,
  },
  {
    nombre: "con aprendidas y filtro todo",
    datos: { [CLAVE_APRENDIDAS]: '["closure","astro-islas"]' },
    aprendidas: ["closure", "astro-islas"],
    solo: false,
  },
  {
    nombre: "con aprendidas y solo pendientes",
    datos: {
      [CLAVE_APRENDIDAS]: '["closure","astro-islas"]',
      [CLAVE_SOLO_PENDIENTES]: "true",
    },
    aprendidas: ["closure", "astro-islas"],
    solo: true,
  },
  {
    nombre: "sin aprendidas y solo pendientes",
    datos: { [CLAVE_SOLO_PENDIENTES]: "true" },
    aprendidas: [] as string[],
    solo: true,
  },
];

describe("coherencia del script inline de BaseLayout", () => {
  it.each(casos)(
    "genera el mismo CSS que cssPreferencias ($nombre)",
    async ({ datos, aprendidas, solo }) => {
      const codigo = await codigoPreferencias();
      const { dataset, css } = ejecutar(codigo, datos);
      expect(css).toBe(cssPreferencias(aprendidas, solo));
      expect(dataset.filtro).toBe(solo ? "solo-pendientes" : "todo");
    },
  );

  it("aplica el mismo tema que temaInicial", async () => {
    const codigo = await codigoPreferencias();
    expect(ejecutar(codigo, { [CLAVE_TEMA]: "dark" }).dataset.theme).toBe(
      "dark",
    );
    expect(ejecutar(codigo, {}, true).dataset.theme).toBe("dark");
    expect(ejecutar(codigo, {}, false).dataset.theme).toBe("light");
  });
});
