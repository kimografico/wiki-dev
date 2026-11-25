import { describe, expect, it } from "vitest";
import { rehypeTablas } from "./rehype-tablas.ts";

interface Nodo {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: Nodo[];
}

function raiz(children: Nodo[]): Nodo {
  return { type: "root", children };
}

function texto(value: string): Nodo {
  return { type: "text", value };
}

function elemento(
  tagName: string,
  children: Nodo[] = [],
  properties: Record<string, unknown> = {},
): Nodo {
  return { type: "element", tagName, properties, children };
}

function encabezado(profundidad: number, contenido: string): Nodo {
  return elemento(`h${profundidad}`, [texto(contenido)]);
}

function tablaConCabecera(): Nodo {
  return elemento("table", [
    elemento("thead", [
      elemento("tr", [
        elemento("th", [texto("Situación")]),
        elemento("th", [texto("Respuesta")]),
      ]),
    ]),
    elemento("tbody", [
      elemento("tr", [
        elemento("td", [texto("Falta el secreto")]),
        elemento("td", [texto("401")]),
      ]),
    ]),
  ]);
}

function contenedores(nodo: Nodo, acc: Nodo[] = []): Nodo[] {
  const clases = nodo.properties?.className;
  if (Array.isArray(clases) && clases.includes("tabla-scroll")) acc.push(nodo);
  for (const hijo of nodo.children ?? []) contenedores(hijo, acc);
  return acc;
}

describe("rehypeTablas", () => {
  it("envuelve la tabla en un contenedor con nombre tomado de la sección", () => {
    const tabla = tablaConCabecera();
    const arbol = raiz([
      encabezado(2, "Qué responde el webhook"),
      elemento("p", [texto("Introducción")]),
      tabla,
    ]);

    rehypeTablas()(arbol);

    const contenedor = arbol.children?.[2];
    expect(contenedor?.tagName).toBe("div");
    expect(contenedor?.properties).toEqual({
      className: ["tabla-scroll"],
      role: "region",
      tabIndex: 0,
      ariaLabel: "Qué responde el webhook",
    });
    expect(contenedor?.children).toEqual([tabla]);
    // El contenido anterior conserva su sitio.
    expect(arbol.children?.[0]?.tagName).toBe("h2");
    expect(arbol.children?.[1]?.tagName).toBe("p");
  });

  it("usa una etiqueta genérica si la tabla no tiene encabezado", () => {
    const arbol = raiz([elemento("p", [texto("Antes")]), tablaConCabecera()]);

    rehypeTablas()(arbol);

    expect(arbol.children?.[1]?.properties?.ariaLabel).toBe(
      "Tabla con desplazamiento horizontal",
    );
  });

  it("ignora un encabezado vacío y conserva el último título válido", () => {
    const arbol = raiz([
      encabezado(2, "Credenciales"),
      encabezado(3, ""),
      tablaConCabecera(),
    ]);

    rehypeTablas()(arbol);

    expect(arbol.children?.[2]?.properties?.ariaLabel).toBe("Credenciales");
  });

  it("marca con scope las cabeceras de columna y solo esas", () => {
    const tabla = tablaConCabecera();
    const cabeceraSuelta = elemento("th", [texto("Fila")]);
    tabla.children?.[1]?.children?.[0]?.children?.unshift(cabeceraSuelta);
    const arbol = raiz([tabla]);

    rehypeTablas()(arbol);

    const thead = tabla.children?.[0];
    for (const th of thead?.children?.[0]?.children ?? []) {
      expect(th.properties?.scope).toBe("col");
    }
    expect(cabeceraSuelta.properties?.scope).toBeUndefined();
    expect(
      tabla.children?.[1]?.children?.[0]?.children?.[1]?.properties,
    ).toEqual({});
  });

  it("no envuelve dos veces la misma tabla", () => {
    const arbol = raiz([encabezado(2, "Sección"), tablaConCabecera()]);
    const plugin = rehypeTablas();

    plugin(arbol);
    plugin(arbol);

    expect(contenedores(arbol)).toHaveLength(1);
    expect(arbol.children?.[1]?.children?.[0]?.tagName).toBe("table");
  });

  it("envuelve tablas anidadas aunque no haya encabezado en su nivel", () => {
    const arbol = raiz([
      elemento("blockquote", [tablaConCabecera()]),
      elemento("p", [texto("Sin hijos problemáticos")]),
    ]);

    rehypeTablas()(arbol);

    expect(contenedores(arbol)).toHaveLength(1);
    expect(contenedores(arbol)[0]?.properties?.ariaLabel).toBe(
      "Tabla con desplazamiento horizontal",
    );
  });

  it("tolera elementos sin etiqueta ni hijos", () => {
    const arbol = raiz([
      { type: "element" },
      elemento("h2", [
        { type: "element", tagName: "span" },
        texto("Credenciales"),
      ]),
      tablaConCabecera(),
    ]);

    rehypeTablas()(arbol);

    expect(arbol.children?.[0]).toEqual({ type: "element" });
    expect(contenedores(arbol)[0]?.properties?.ariaLabel).toBe("Credenciales");
  });
});
