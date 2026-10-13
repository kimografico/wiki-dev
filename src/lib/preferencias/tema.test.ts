import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CLAVE_TEMA,
  alternarTema,
  aplicarTema,
  guardarTema,
  leerTemaAlmacenado,
  temaDelSistema,
  temaInicial,
} from "./tema.ts";

function almacen(valor: string | null) {
  return { getItem: vi.fn(() => valor), setItem: vi.fn() };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("temaDelSistema", () => {
  it("devuelve light si no hay matchMedia", () => {
    expect(temaDelSistema()).toBe("light");
  });

  it("lee la preferencia oscura del sistema", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true })),
    );
    expect(temaDelSistema()).toBe("dark");
  });

  it("devuelve light si el sistema no prefiere oscuro", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: false })),
    );
    expect(temaDelSistema()).toBe("light");
  });

  it("devuelve light si matchMedia lanza", () => {
    vi.stubGlobal("matchMedia", () => {
      throw new Error("no disponible");
    });
    expect(temaDelSistema()).toBe("light");
  });
});

describe("leerTemaAlmacenado", () => {
  it("devuelve null sin almacenamiento", () => {
    expect(leerTemaAlmacenado()).toBeNull();
  });

  it("lee un tema guardado válido", () => {
    vi.stubGlobal("localStorage", almacen("dark"));
    expect(leerTemaAlmacenado()).toBe("dark");
  });

  it("devuelve null con un valor desconocido", () => {
    vi.stubGlobal("localStorage", almacen("azul"));
    expect(leerTemaAlmacenado()).toBeNull();
  });

  it("devuelve null si getItem lanza", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("bloqueado");
      },
      setItem: vi.fn(),
    });
    expect(leerTemaAlmacenado()).toBeNull();
  });

  it("devuelve null si el acceso a localStorage lanza", () => {
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
      expect(leerTemaAlmacenado()).toBeNull();
    } finally {
      if (descriptor) {
        Object.defineProperty(globalThis, "localStorage", descriptor);
      } else {
        Reflect.deleteProperty(globalThis, "localStorage");
      }
    }
  });
});

describe("temaInicial", () => {
  it("prioriza el tema guardado sobre el sistema", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true })),
    );
    vi.stubGlobal("localStorage", almacen("light"));
    expect(temaInicial()).toBe("light");
  });

  it("usa el sistema cuando no hay tema guardado", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true })),
    );
    expect(temaInicial()).toBe("dark");
  });
});

describe("guardarTema", () => {
  it("no falla sin almacenamiento", () => {
    expect(() => guardarTema("dark")).not.toThrow();
  });

  it("guarda la elección", () => {
    const store = almacen(null);
    vi.stubGlobal("localStorage", store);
    guardarTema("dark");
    expect(store.setItem).toHaveBeenCalledWith(CLAVE_TEMA, "dark");
  });

  it("ignora errores al guardar", () => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(),
      setItem: () => {
        throw new Error("lleno");
      },
    });
    expect(() => guardarTema("light")).not.toThrow();
  });
});

describe("aplicarTema", () => {
  it("no falla sin document", () => {
    expect(() => aplicarTema("dark")).not.toThrow();
  });

  it("escribe data-theme en el documento", () => {
    const dataset: Record<string, string> = {};
    vi.stubGlobal("document", { documentElement: { dataset } });
    aplicarTema("dark");
    expect(dataset.theme).toBe("dark");
  });
});

describe("alternarTema", () => {
  it("alterna, aplica y guarda", () => {
    const store = almacen(null);
    const dataset: Record<string, string> = {};
    vi.stubGlobal("localStorage", store);
    vi.stubGlobal("document", { documentElement: { dataset } });
    expect(alternarTema("dark")).toBe("light");
    expect(alternarTema("light")).toBe("dark");
    expect(store.setItem).toHaveBeenLastCalledWith(CLAVE_TEMA, "dark");
    expect(dataset.theme).toBe("dark");
  });
});
