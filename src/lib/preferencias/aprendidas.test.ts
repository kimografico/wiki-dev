import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CLAVE_APRENDIDAS,
  CLAVE_SOLO_PENDIENTES,
  EVENTO_PREFERENCIAS,
  alternarAprendida,
  aplicarEstilos,
  cssPreferencias,
  esAprendida,
  guardarSoloPendientes,
  hayAlmacenamiento,
  leerAprendidas,
  leerSoloPendientes,
} from "./aprendidas.ts";

/** Almacén falso con contenido inicial; `datos` refleja lo que se guarda. */
function almacen(inicial: Record<string, string> = {}) {
  const datos: Record<string, string> = { ...inicial };
  return {
    datos,
    getItem: vi.fn((clave: string) => (clave in datos ? datos[clave]! : null)),
    setItem: vi.fn((clave: string, valor: string) => {
      datos[clave] = valor;
    }),
  };
}

function documentoFalso() {
  const dataset: Record<string, string> = {};
  const style = { id: "", textContent: "" };
  const createElement = vi.fn(() => style);
  const getElementById = vi.fn(
    () => null as { id: string; textContent: string } | null,
  );
  const appendChild = vi.fn();
  const dispatchEvent = vi.fn();
  vi.stubGlobal("document", {
    documentElement: { dataset },
    head: { appendChild },
    getElementById,
    createElement,
  });
  vi.stubGlobal("window", { dispatchEvent });
  return {
    dataset,
    style,
    createElement,
    getElementById,
    appendChild,
    dispatchEvent,
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("hayAlmacenamiento", () => {
  it("devuelve false sin almacenamiento", () => {
    expect(hayAlmacenamiento()).toBe(false);
  });

  it("devuelve true cuando el navegador permite almacenar", () => {
    vi.stubGlobal("localStorage", almacen());
    expect(hayAlmacenamiento()).toBe(true);
  });

  it("devuelve false si el acceso a localStorage lanza", () => {
    const descriptor = Object.getOwnPropertyDescriptor(
      globalThis,
      "localStorage",
    );
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get() {
        throw new Error("bloqueado");
      },
    });
    try {
      expect(hayAlmacenamiento()).toBe(false);
    } finally {
      if (descriptor) {
        Object.defineProperty(globalThis, "localStorage", descriptor);
      } else {
        Reflect.deleteProperty(globalThis, "localStorage");
      }
    }
  });
});

describe("leerAprendidas", () => {
  it("devuelve una lista vacía sin almacenamiento", () => {
    expect(leerAprendidas()).toEqual([]);
  });

  it("devuelve una lista vacía si no hay clave guardada", () => {
    vi.stubGlobal("localStorage", almacen());
    expect(leerAprendidas()).toEqual([]);
  });

  it("lee los slugs aprendidos", () => {
    vi.stubGlobal(
      "localStorage",
      almacen({ [CLAVE_APRENDIDAS]: '["closure","astro-islas"]' }),
    );
    expect(leerAprendidas()).toEqual(["closure", "astro-islas"]);
  });

  it("descarta valores que no sean slugs válidos", () => {
    vi.stubGlobal(
      "localStorage",
      almacen({ [CLAVE_APRENDIDAS]: '["closure","Mi Slug",42,null]' }),
    );
    expect(leerAprendidas()).toEqual(["closure"]);
  });

  it("devuelve una lista vacía con JSON corrupto", () => {
    vi.stubGlobal("localStorage", almacen({ [CLAVE_APRENDIDAS]: "no-json" }));
    expect(leerAprendidas()).toEqual([]);
  });

  it("devuelve una lista vacía si el dato no es un array", () => {
    vi.stubGlobal(
      "localStorage",
      almacen({ [CLAVE_APRENDIDAS]: '{"closure":true}' }),
    );
    expect(leerAprendidas()).toEqual([]);
  });

  it("devuelve una lista vacía si getItem lanza", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("bloqueado");
      },
      setItem: vi.fn(),
    });
    expect(leerAprendidas()).toEqual([]);
  });
});

describe("esAprendida", () => {
  it("detecta una entrada aprendida", () => {
    vi.stubGlobal(
      "localStorage",
      almacen({ [CLAVE_APRENDIDAS]: '["closure"]' }),
    );
    expect(esAprendida("closure")).toBe(true);
    expect(esAprendida("otra")).toBe(false);
  });
});

describe("alternarAprendida", () => {
  it("añade una aprendida nueva y la persiste", () => {
    const store = almacen({ [CLAVE_APRENDIDAS]: '["closure"]' });
    vi.stubGlobal("localStorage", store);
    expect(alternarAprendida("middleware")).toEqual(["closure", "middleware"]);
    expect(store.setItem).toHaveBeenCalledWith(
      CLAVE_APRENDIDAS,
      JSON.stringify(["closure", "middleware"]),
    );
  });

  it("quita una aprendida ya marcada", () => {
    const store = almacen({ [CLAVE_APRENDIDAS]: '["closure","middleware"]' });
    vi.stubGlobal("localStorage", store);
    expect(alternarAprendida("closure")).toEqual(["middleware"]);
    expect(store.setItem).toHaveBeenCalledWith(
      CLAVE_APRENDIDAS,
      JSON.stringify(["middleware"]),
    );
  });

  it("devuelve la lista calculada sin almacenamiento", () => {
    expect(alternarAprendida("closure")).toEqual(["closure"]);
  });

  it("no falla si guardar lanza", () => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(),
      setItem: () => {
        throw new Error("lleno");
      },
    });
    expect(alternarAprendida("closure")).toEqual(["closure"]);
  });
});

describe("leerSoloPendientes", () => {
  it("devuelve false sin almacenamiento", () => {
    expect(leerSoloPendientes()).toBe(false);
  });

  it("lee el filtro activado", () => {
    vi.stubGlobal("localStorage", almacen({ [CLAVE_SOLO_PENDIENTES]: "true" }));
    expect(leerSoloPendientes()).toBe(true);
  });

  it("devuelve false si el filtro está guardado como apagado", () => {
    vi.stubGlobal(
      "localStorage",
      almacen({ [CLAVE_SOLO_PENDIENTES]: "false" }),
    );
    expect(leerSoloPendientes()).toBe(false);
  });

  it("devuelve false si getItem lanza", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("bloqueado");
      },
      setItem: vi.fn(),
    });
    expect(leerSoloPendientes()).toBe(false);
  });
});

describe("guardarSoloPendientes", () => {
  it("no falla sin almacenamiento", () => {
    expect(() => guardarSoloPendientes(true)).not.toThrow();
  });

  it("guarda el filtro activado", () => {
    const store = almacen();
    vi.stubGlobal("localStorage", store);
    guardarSoloPendientes(true);
    expect(store.setItem).toHaveBeenCalledWith(CLAVE_SOLO_PENDIENTES, "true");
  });

  it("guarda el filtro desactivado", () => {
    const store = almacen();
    vi.stubGlobal("localStorage", store);
    guardarSoloPendientes(false);
    expect(store.setItem).toHaveBeenCalledWith(CLAVE_SOLO_PENDIENTES, "false");
  });

  it("no falla si guardar lanza", () => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(),
      setItem: () => {
        throw new Error("lleno");
      },
    });
    expect(() => guardarSoloPendientes(true)).not.toThrow();
  });
});

describe("cssPreferencias", () => {
  it("en el filtro «todo» muestra el icono y atenúa la tarjeta", () => {
    const css = cssPreferencias(["closure"], false);
    expect(css).toContain(
      '[data-slug="closure"] .icono-aprendida{display:inline-flex}',
    );
    expect(css).toContain(
      '.entrada-item[data-slug="closure"]>a{background:var(--surface-soft)}',
    );
  });

  it("en el filtro «todo» ignora los slugs inválidos", () => {
    expect(cssPreferencias(["Mi Slug"], false)).toBe("");
  });

  it("en «solo pendientes» sin aprendidas no genera reglas", () => {
    expect(cssPreferencias([], true)).toBe("");
  });

  it("en «solo pendientes» oculta las aprendidas y avisa si no queda nada", () => {
    const css = cssPreferencias(["closure"], true);
    expect(css).toContain('[data-slug="closure"]{display:none}');
    expect(css).toContain(".vacio-filtro{display:block}");
  });
});

describe("aplicarEstilos", () => {
  it("no falla sin document", () => {
    expect(() => aplicarEstilos()).not.toThrow();
  });

  it("crea el style, aplica el CSS, marca el filtro y avisa a las islas", () => {
    vi.stubGlobal(
      "localStorage",
      almacen({ [CLAVE_APRENDIDAS]: '["closure"]' }),
    );
    const entorno = documentoFalso();

    aplicarEstilos();

    expect(entorno.createElement).toHaveBeenCalledTimes(1);
    expect(entorno.appendChild).toHaveBeenCalledWith(entorno.style);
    expect(entorno.style.id).toBe("wiki-estilos-pref");
    expect(entorno.style.textContent).toContain('[data-slug="closure"]');
    expect(entorno.dataset.filtro).toBe("todo");
    expect(entorno.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: EVENTO_PREFERENCIAS }),
    );
  });

  it("reutiliza el style ya inyectado", () => {
    const entorno = documentoFalso();
    const stylePrevio = { id: "wiki-estilos-pref", textContent: "previo" };
    entorno.getElementById.mockReturnValue(stylePrevio);

    aplicarEstilos();

    expect(entorno.createElement).not.toHaveBeenCalled();
    expect(entorno.appendChild).not.toHaveBeenCalled();
    expect(stylePrevio.textContent).toBe("");
  });

  it("marca «solo-pendientes» cuando el filtro está activo", () => {
    vi.stubGlobal(
      "localStorage",
      almacen({
        [CLAVE_APRENDIDAS]: '["closure"]',
        [CLAVE_SOLO_PENDIENTES]: "true",
      }),
    );
    const entorno = documentoFalso();

    aplicarEstilos();

    expect(entorno.dataset.filtro).toBe("solo-pendientes");
    expect(entorno.style.textContent).toContain(
      '[data-slug="closure"]{display:none}',
    );
  });
});
