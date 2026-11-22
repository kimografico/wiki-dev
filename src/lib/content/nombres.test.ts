import { describe, expect, it } from "vitest";
import { nombreCategoria, nombreColeccion, nombreEtiqueta } from "./nombres.ts";

describe("nombreCategoria", () => {
  it("devuelve el nombre visible de una categoría", () => {
    expect(nombreCategoria("datos-api")).toBe("Datos y API");
    expect(nombreCategoria("rendimiento-ux")).toBe("Rendimiento y UX");
  });

  it("muestra el valor tal cual si la categoría no existe", () => {
    expect(nombreCategoria("inventada")).toBe("inventada");
  });
});

describe("nombreEtiqueta", () => {
  it("devuelve el nombre visible de una etiqueta", () => {
    expect(nombreEtiqueta("accesibilidad")).toBe("Accesibilidad");
  });

  it("muestra el valor tal cual si la etiqueta no existe", () => {
    expect(nombreEtiqueta("inventada")).toBe("inventada");
  });
});

describe("nombreColeccion", () => {
  it("devuelve el nombre visible de una colección", () => {
    expect(nombreColeccion("tecnologias")).toBe("Tecnologías");
  });

  it("muestra el valor tal cual si la colección no existe", () => {
    expect(nombreColeccion("inventada")).toBe("inventada");
  });
});
