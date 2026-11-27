// Islas nativas del lector: tema, aprendidas, filtro, buscador y navegación.
// ASTRO: un `<script>` de componente se empaqueta y Astro lo incluye una sola
// vez por página, aunque varios componentes lo importen; aquí solo registra
// custom elements que mejoran HTML ya renderizado en servidor (RF-12).
// REACT+VITE: cada isla llamaría a `hydrateRoot` sobre su propio contenedor.

import { CATALOGO } from "../lib/content/catalogo.ts";
import type { Coleccion } from "../lib/content/esquemas.ts";
import { vecinas, type FichaNav } from "../lib/content/navegacion.ts";
import {
  EVENTO_PREFERENCIAS,
  alternarAprendida,
  aplicarEstilos,
  esAprendida,
  guardarSoloPendientes,
  hayAlmacenamiento,
  leerAprendidas,
  leerSoloPendientes,
} from "../lib/preferencias/aprendidas.ts";
import { alternarTema } from "../lib/preferencias/tema.ts";

interface Resultado {
  slug: string;
  coleccion: Coleccion;
  titulo: string;
  resumen: string;
  categoria: string;
  tags: string[];
  alias: string[];
  url: string;
}

let registrado = false;

function temaActual(): "light" | "dark" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

class WikiTema extends HTMLElement {
  private control?: AbortController;

  connectedCallback() {
    const boton = this.querySelector("button");
    if (!boton) return;

    this.control = new AbortController();
    const { signal } = this.control;
    boton.addEventListener("click", this.alternar, { signal });
    this.sincronizar();
  }

  disconnectedCallback() {
    this.control?.abort();
  }

  private alternar = () => {
    alternarTema(temaActual());
    this.sincronizar();
  };

  private sincronizar() {
    const boton = this.querySelector("button");
    if (!boton) return;
    const oscuro = temaActual() === "dark";
    boton.setAttribute("aria-pressed", String(oscuro));
    boton.title = oscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro";
    const texto = boton.querySelector<HTMLElement>("[data-texto]");
    if (texto) texto.textContent = oscuro ? "Oscuro" : "Claro";
  }
}

class WikiFiltro extends HTMLElement {
  private control?: AbortController;

  connectedCallback() {
    const boton = this.querySelector("button");
    if (!boton) return;

    this.control = new AbortController();
    const { signal } = this.control;
    boton.addEventListener("click", this.alternar, { signal });
    window.addEventListener(EVENTO_PREFERENCIAS, this.sincronizar, { signal });
    window.addEventListener("pageshow", this.alCambioPagina, { signal });
    this.sincronizar();
  }

  disconnectedCallback() {
    this.control?.abort();
  }

  private alternar = () => {
    if (!hayAlmacenamiento()) return;
    guardarSoloPendientes(!leerSoloPendientes());
    aplicarEstilos();
    this.sincronizar();
  };

  private alCambioPagina = (evento: PageTransitionEvent) => {
    if (evento.persisted) aplicarEstilos();
  };

  private sincronizar = () => {
    const boton = this.querySelector("button");
    if (!boton) return;
    const solo = leerSoloPendientes();
    boton.setAttribute("aria-pressed", String(solo));
    boton.disabled = !hayAlmacenamiento();
    boton.title = !hayAlmacenamiento()
      ? "Este navegador no permite guardar preferencias"
      : solo
        ? "Mostrar también las entradas aprendidas"
        : "Mostrar solo lo que queda por aprender";
    boton.setAttribute(
      "aria-label",
      solo ? "Mostrar: solo pendientes" : "Mostrar: todo",
    );
  };
}

class WikiAprendida extends HTMLElement {
  private control?: AbortController;

  connectedCallback() {
    const boton = this.querySelector("button");
    if (!boton) return;

    this.control = new AbortController();
    const { signal } = this.control;
    boton.addEventListener("click", this.alternar, { signal });
    window.addEventListener(EVENTO_PREFERENCIAS, this.sincronizar, { signal });
    this.sincronizar();
  }

  disconnectedCallback() {
    this.control?.abort();
  }

  private alternar = () => {
    if (!hayAlmacenamiento()) return;
    alternarAprendida(this.getAttribute("slug") ?? "");
    aplicarEstilos();
    this.sincronizar();
  };

  private sincronizar = () => {
    const boton = this.querySelector("button");
    if (!boton) return;
    const aprendida = esAprendida(this.getAttribute("slug") ?? "");
    const disponible = hayAlmacenamiento();

    this.dataset.aprendida = String(aprendida);
    boton.setAttribute("aria-pressed", String(aprendida));
    boton.setAttribute(
      "aria-label",
      aprendida ? "Aprendida" : "Marcar como aprendida",
    );
    boton.disabled = !disponible;
    boton.title = !disponible
      ? "Este navegador no permite guardar preferencias"
      : aprendida
        ? "Aprendida: pulsa para desmarcarla"
        : "Marcar como aprendida";
  };
}

/**
 * Par de botones de navegación entre fichas. El HTML de partida ya trae los
 * vecinos inmediatos; esta isla solo los sustituye cuando las preferencias
 * (aprendidas / solo pendientes) cambian, sin recargar la página (RF-14).
 */
class WikiNavegacion extends HTMLElement {
  private control?: AbortController;
  private secuencia: FichaNav[] = [];

  connectedCallback() {
    const crudo =
      this.querySelector<HTMLScriptElement>("[data-secuencia]")?.textContent;
    if (!crudo) return;
    try {
      const parseado: unknown = JSON.parse(crudo);
      if (!Array.isArray(parseado)) return;
      this.secuencia = parseado as FichaNav[];
    } catch {
      // Sin datos válidos se conserva el HTML renderizado en el build.
      return;
    }

    this.control = new AbortController();
    const { signal } = this.control;
    window.addEventListener(EVENTO_PREFERENCIAS, this.sincronizar, { signal });
    window.addEventListener("pageshow", this.alCambioPagina, { signal });
    this.sincronizar();
  }

  disconnectedCallback() {
    this.control?.abort();
  }

  private alCambioPagina = (evento: PageTransitionEvent) => {
    if (evento.persisted) this.sincronizar();
  };

  private sincronizar = () => {
    const nav = this.querySelector<HTMLElement>("[data-nav]");
    if (!nav) return;

    const resultado = vecinas(
      this.secuencia,
      this.getAttribute("slug") ?? "",
      leerAprendidas(),
      leerSoloPendientes(),
    );

    let visibles = 0;
    this.querySelectorAll<HTMLAnchorElement>("[data-direccion]").forEach(
      (enlace) => {
        const direccion = enlace.dataset.direccion;
        if (direccion !== "anterior" && direccion !== "siguiente") return;
        const destino = resultado[direccion];
        enlace.hidden = !destino;
        if (!destino) return;

        visibles++;
        enlace.href = destino.url;
        enlace.setAttribute(
          "aria-label",
          `${direccion === "anterior" ? "Anterior" : "Siguiente"}: ${destino.titulo}`,
        );
        const titulo = enlace.querySelector<HTMLElement>("[data-titulo]");
        if (titulo) titulo.textContent = destino.titulo;
      },
    );

    nav.hidden = visibles === 0;
  };
}

class WikiBuscador extends HTMLElement {
  private control?: AbortController;
  private consulta = "";
  private filtro: Coleccion | "todas" = "todas";
  private datos?: Promise<Resultado[]>;
  private renderId = 0;

  connectedCallback() {
    const input = this.querySelector<HTMLInputElement>("[data-busqueda-input]");
    if (!input) return;

    this.control = new AbortController();
    const { signal } = this.control;
    input.addEventListener("input", this.alEscribir, { signal });
    input.addEventListener("keydown", this.alTeclaInput, { signal });
    document.addEventListener("keydown", this.alTecla, { signal });
    this.querySelector("[data-busqueda-limpiar]")?.addEventListener(
      "click",
      this.limpiarConsulta,
      { signal },
    );
    this.querySelector("[data-limpiar-filtro]")?.addEventListener(
      "click",
      this.limpiarTodo,
      { signal },
    );
    this.querySelectorAll<HTMLElement>("[data-chip]").forEach((chip) => {
      chip.addEventListener("click", this.alChip, { signal });
    });
    window.addEventListener(EVENTO_PREFERENCIAS, this.dibujar, { signal });
    void this.dibujar();
  }

  disconnectedCallback() {
    this.control?.abort();
  }

  private cargar(): Promise<Resultado[]> {
    if (!this.datos) {
      const base = this.getAttribute("base") ?? "/";
      this.datos = fetch(`${base}buscador.json`)
        .then((respuesta) => {
          if (!respuesta.ok)
            throw new Error("Índice de búsqueda no disponible");
          return respuesta.json() as Promise<Resultado[]>;
        })
        .catch(() => []);
    }
    return this.datos;
  }

  private alEscribir = (evento: Event) => {
    this.consulta = (evento.target as HTMLInputElement).value;
    void this.dibujar();
  };

  private alChip = (evento: Event) => {
    const clave = ((evento.currentTarget as HTMLElement).dataset.coleccion ??
      "todas") as Coleccion | "todas";
    this.filtro = this.filtro === clave && clave !== "todas" ? "todas" : clave;
    void this.dibujar();
  };

  private alTecla = (evento: KeyboardEvent) => {
    const input = this.querySelector<HTMLInputElement>("[data-busqueda-input]");
    if (!input) return;
    if (
      evento.key === "/" &&
      document.activeElement?.tagName !== "INPUT" &&
      document.activeElement?.tagName !== "TEXTAREA"
    ) {
      evento.preventDefault();
      input.focus();
    }
  };

  private alTeclaInput = (evento: KeyboardEvent) => {
    if (evento.key !== "Escape") return;
    this.limpiarTodo();
    (evento.target as HTMLInputElement).blur();
  };

  private limpiarConsulta = () => {
    const input = this.querySelector<HTMLInputElement>("[data-busqueda-input]");
    if (input) input.value = "";
    this.consulta = "";
    void this.dibujar();
    input?.focus();
  };

  private limpiarTodo = () => {
    const input = this.querySelector<HTMLInputElement>("[data-busqueda-input]");
    if (input) input.value = "";
    this.consulta = "";
    this.filtro = "todas";
    void this.dibujar();
  };

  private dibujar = async () => {
    const id = ++this.renderId;
    const activo = this.consulta.trim().length > 0 || this.filtro !== "todas";
    this.dataset.activo = String(activo);

    const panel = this.querySelector<HTMLElement>("[data-panel]");
    if (panel) panel.hidden = !activo;
    const limpiar = this.querySelector<HTMLElement>("[data-busqueda-limpiar]");
    if (limpiar) limpiar.style.display = this.consulta ? "" : "none";

    this.querySelectorAll<HTMLElement>("[data-chip]").forEach((chip) => {
      chip.setAttribute(
        "aria-pressed",
        String(chip.dataset.coleccion === this.filtro),
      );
    });

    if (!activo) return;
    const datos = await this.cargar();
    if (id !== this.renderId) return;

    const q = this.consulta.trim().toLowerCase();
    const aprendidas = new Set(leerAprendidas());
    const soloPendientes = leerSoloPendientes();
    const resultados = datos.filter((item) => {
      if (this.filtro !== "todas" && item.coleccion !== this.filtro)
        return false;
      if (soloPendientes && aprendidas.has(item.slug)) return false;
      if (!q) return true;
      return [
        item.titulo,
        item.resumen,
        item.categoria,
        ...item.tags,
        ...item.alias,
      ].some((campo) => campo.toLowerCase().includes(q));
    });

    const nombreFiltro =
      this.filtro === "todas"
        ? "todas las colecciones"
        : (CATALOGO[this.filtro]?.nombre ?? this.filtro);
    const etiqueta = this.querySelector<HTMLElement>("[data-etiqueta]");
    if (etiqueta) {
      etiqueta.textContent = q
        ? `Resultados para "${this.consulta}" en ${nombreFiltro} (${resultados.length})`
        : `Mostrando ${resultados.length} entradas de ${nombreFiltro}`;
    }

    const contenedor = this.querySelector<HTMLElement>("[data-resultados]");
    const plantilla =
      this.querySelector<HTMLTemplateElement>("[data-plantilla]");
    if (!contenedor || !plantilla) return;

    const fragmento = document.createDocumentFragment();
    for (const item of resultados) {
      const nodo = plantilla.content.firstElementChild?.cloneNode(true);
      if (!(nodo instanceof HTMLElement)) continue;
      const enlace = nodo.querySelector("a");
      if (enlace) enlace.href = item.url;
      const titulo = nodo.querySelector<HTMLElement>("[data-titulo]");
      if (titulo) titulo.textContent = item.titulo;
      const coleccion = nodo.querySelector<HTMLElement>("[data-coleccion]");
      if (coleccion) {
        coleccion.textContent =
          CATALOGO[item.coleccion]?.nombre ?? item.coleccion;
        coleccion.style.color = CATALOGO[item.coleccion]?.colorText ?? "";
      }
      const resumen = nodo.querySelector<HTMLElement>("[data-resumen]");
      if (resumen) resumen.textContent = item.resumen;
      fragmento.appendChild(nodo);
    }
    contenedor.replaceChildren(fragmento);
  };
}

/** Registra las cinco islas y el accordion global. Idempotente. */
export function registrarIslas(): void {
  if (registrado || typeof customElements === "undefined") return;
  registrado = true;

  if (!customElements.get("wiki-tema"))
    customElements.define("wiki-tema", WikiTema);
  if (!customElements.get("wiki-filtro"))
    customElements.define("wiki-filtro", WikiFiltro);
  if (!customElements.get("wiki-aprendida"))
    customElements.define("wiki-aprendida", WikiAprendida);
  if (!customElements.get("wiki-buscador"))
    customElements.define("wiki-buscador", WikiBuscador);
  if (!customElements.get("wiki-navegacion"))
    customElements.define("wiki-navegacion", WikiNavegacion);

  // «Mostrar todo» vive en los listados, fuera de la isla del filtro: se atiende
  // aquí, una sola vez, y se delega en la lógica compartida de preferencias.
  document.addEventListener("click", (evento) => {
    if (!(evento.target instanceof Element)) return;
    if (!evento.target.closest("[data-ver-todo]")) return;
    if (!leerSoloPendientes()) return;
    guardarSoloPendientes(false);
    aplicarEstilos();
  });
}
