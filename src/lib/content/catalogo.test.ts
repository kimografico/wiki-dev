import { access } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CATALOGO, LISTA_COLECCIONES } from "./catalogo.ts";
import { COLECCIONES } from "./esquemas.ts";

describe("catálogo único de colecciones", () => {
  it("declara exactamente las colecciones del esquema, en el mismo orden", () => {
    expect(LISTA_COLECCIONES).toEqual([...COLECCIONES]);
  });

  it("tiene nombre, descripción e icono no vacíos", () => {
    for (const coleccion of LISTA_COLECCIONES) {
      const datos = CATALOGO[coleccion];
      expect(datos.nombre.length).toBeGreaterThan(0);
      expect(datos.descripcion.length).toBeGreaterThan(0);
      expect(datos.icono.length).toBeGreaterThan(0);
    }
  });

  it("usa siempre la variante -text de los colores (AA en texto)", () => {
    for (const coleccion of LISTA_COLECCIONES) {
      expect(CATALOGO[coleccion].colorText).toMatch(
        /^var\(--color-[a-z-]+-text\)$/,
      );
    }
  });

  it("apunta a una plantilla que existe en specs/plantillas", async () => {
    for (const coleccion of LISTA_COLECCIONES) {
      const plantilla = join("specs", "plantillas", CATALOGO[coleccion].plantilla);
      await expect(access(plantilla)).resolves.toBeUndefined();
    }
  });
});
