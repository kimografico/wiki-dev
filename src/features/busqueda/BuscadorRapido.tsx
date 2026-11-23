import { useState, useMemo, useEffect, useRef } from "react";
import { CATALOGO, LISTA_COLECCIONES } from "../../lib/content/catalogo.ts";
import type { Coleccion } from "../../lib/content/esquemas.ts";

export interface ItemBusqueda {
  slug: string;
  coleccion: Coleccion;
  titulo: string;
  resumen: string;
  categoria: string;
  tags: string[];
  url: string;
}

interface Props {
  entradas: ItemBusqueda[];
}

export default function BuscadorRapido({ entradas }: Props) {
  const [consulta, setConsulta] = useState("");
  const [filtroColeccion, setFiltroColeccion] = useState<string>("todas");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelAbierto =
    consulta.trim().length > 0 || filtroColeccion !== "todas";

  // Atajo de teclado: presionar "/" enfoca el buscador
  useEffect(() => {
    function manejarTecla(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setConsulta("");
        setFiltroColeccion("todas");
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", manejarTecla);
    return () => window.removeEventListener("keydown", manejarTecla);
  }, []);

  // Ocultar las secciones siguientes de la portada cuando haya un filtro activo
  useEffect(() => {
    const contenedor = document.getElementById("secciones-portada");
    if (contenedor) {
      if (panelAbierto) {
        contenedor.style.display = "none";
      } else {
        contenedor.style.display = "";
      }
    }
  }, [panelAbierto]);

  // Conteo por colección, derivado del catálogo (F1).
  const conteos = useMemo(() => {
    const porColeccion: Record<Coleccion, number> = Object.fromEntries(
      LISTA_COLECCIONES.map((c) => [c, 0]),
    ) as Record<Coleccion, number>;
    for (const entrada of entradas) {
      porColeccion[entrada.coleccion] += 1;
    }
    return porColeccion;
  }, [entradas]);

  const resultados = useMemo(() => {
    const q = consulta.trim().toLowerCase();

    return entradas.filter((item) => {
      const coincideColeccion =
        filtroColeccion === "todas" || item.coleccion === filtroColeccion;
      if (!coincideColeccion) return false;

      // Si no hay texto de búsqueda, mostrar todas las entradas de la colección seleccionada
      if (!q) return true;

      return (
        item.titulo.toLowerCase().includes(q) ||
        item.resumen.toLowerCase().includes(q) ||
        item.categoria.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [consulta, filtroColeccion, entradas]);

  // Chips de filtro: "Todas" + cada colección del catálogo.
  const chips = [
    { clave: "todas" as const, label: "Todas", count: entradas.length },
    ...LISTA_COLECCIONES.map((coleccion) => ({
      clave: coleccion,
      label: CATALOGO[coleccion].nombre,
      count: conteos[coleccion],
    })),
  ];

  // Nombre visible de la colección filtrada (para los rótulos del panel).
  const nombreFiltro =
    filtroColeccion === "todas"
      ? "todas las colecciones"
      : (CATALOGO[filtroColeccion as Coleccion]?.nombre ?? filtroColeccion);

  return (
    <div className="buscador-rapido w-full my-6 text-left">
      {/* Searchbar y filtros: centrados y con su ancho original */}
      <div className="w-full max-w-3xl mx-auto relative">
        <div className="flex items-center gap-2 p-1.5 pl-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs outline-none hover:outline-none focus-within:outline-none focus-within:ring-0 focus-within:border-[var(--color-border-strong)] transition-all">
          <svg
            className="w-5 h-5 text-[var(--color-muted)] shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            ref={inputRef}
            type="search"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder="Buscar término, tecnología o paquete..."
            aria-label="Buscar en la wiki"
            className="w-full bg-transparent border-0 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] outline-none focus:outline-none focus:ring-0 focus-visible:outline-none hover:outline-none ring-0"
          />

          {consulta && (
            <button
              type="button"
              onClick={() => setConsulta("")}
              className="px-2 py-1 text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] cursor-pointer"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1 pr-2 shrink-0">
            <kbd className="px-2 py-0.5 text-[11px] font-mono text-[var(--color-muted)] bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md">
              /
            </kbd>
          </div>
        </div>

        {/* Filtros de colección */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
          <span className="text-[var(--color-muted)] font-medium">
            Filtrar por:
          </span>
          {chips.map((col) => {
            const activo = filtroColeccion === col.clave;
            return (
              <button
                key={col.clave}
                type="button"
                onClick={() => {
                  setFiltroColeccion(
                    activo && col.clave !== "todas" ? "todas" : col.clave,
                  );
                }}
                className={`chip-filtro inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all cursor-pointer font-medium ${
                  activo
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-on-accent)] shadow-xs"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted-text)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                }`}
                aria-pressed={activo}
              >
                <span>{col.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    activo
                      ? "bg-black/20 text-white"
                      : "bg-[var(--color-bg)] text-[var(--color-muted)]"
                  }`}
                >
                  {col.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel de resultados filtrados: fuera del div estrecho, ocupa el 100% del contenedor padre */}
      {panelAbierto && (
        <div className="w-full mt-6 p-5 sm:p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg transition-all animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--color-border)] text-xs">
            <span className="font-semibold text-[var(--color-text)] text-sm">
              {consulta.trim()
                ? `Resultados para "${consulta}" en ${nombreFiltro} (${resultados.length})`
                : `Mostrando ${resultados.length} entradas de ${
                    filtroColeccion === "todas"
                      ? "todas las colecciones"
                      : nombreFiltro
                  }`}
            </span>
            <button
              type="button"
              onClick={() => {
                setFiltroColeccion("todas");
                setConsulta("");
              }}
              className="text-xs font-medium text-[var(--color-muted-text)] hover:text-[var(--color-accent-text)] cursor-pointer transition-colors"
            >
              Limpiar filtro ✕
            </button>
          </div>

          {resultados.length === 0 ? (
            <div className="py-8 text-center text-sm text-[var(--color-muted-text)]">
              No se encontraron resultados para los criterios seleccionados.
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 p-0.5 list-none m-0">
              {resultados.map((item) => (
                <li key={`${item.coleccion}-${item.slug}`}>
                  <a
                    href={item.url}
                    className="block p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 hover:bg-[var(--color-bg)] hover:border-[var(--color-accent)] transition-all no-underline group h-full"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-bold text-sm text-[var(--color-text)] group-hover:text-[var(--color-accent-text)] transition-colors line-clamp-1">
                        {item.titulo}
                      </span>
                      <span
                        className="text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] shrink-0"
                        style={{ color: CATALOGO[item.coleccion].colorText }}
                      >
                        {CATALOGO[item.coleccion].nombre}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-muted-text)] m-0 line-clamp-2 leading-relaxed">
                      {item.resumen}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
