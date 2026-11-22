// Isla «Todo / solo pendientes» (RF-14), siempre en la cabecera y a la
// izquierda del interruptor de tema. Solo icono, sin fondo ni borde: `eye` en
// azul (--color-dev) cuando se muestra todo y `eye-off` en muted cuando el
// filtro oculta las aprendidas. Escribe en `localStorage` con la lógica de
// `lib/preferencias/aprendidas.ts` (TS puro) y reinyecta el <style> con
// `aplicarEstilos`, que además despacha `wiki:preferencias` para sincronizar
// el resto de islas.
import { useEffect, useState } from "react";
import svgOjo from "../../assets/icons/eye.svg?raw";
import svgOjoOff from "../../assets/icons/eye-off.svg?raw";
import {
  EVENTO_PREFERENCIAS,
  aplicarEstilos,
  guardarSoloPendientes,
  hayAlmacenamiento,
  leerSoloPendientes,
} from "../../lib/preferencias/aprendidas.ts";

export default function InterruptorSoloPendientes() {
  const [solo, setSolo] = useState(false);
  const [disponible, setDisponible] = useState(true);

  useEffect(() => {
    setDisponible(hayAlmacenamiento());
    const sincronizar = () => setSolo(leerSoloPendientes());
    sincronizar();

    // «Mostrar todo» del aviso de listado vacío (RF-14). Si el filtro ya está
    // en «todo», no se repite el trabajo.
    const verTodo = (evento: Event) => {
      if (!(evento.target instanceof Element)) return;
      if (!evento.target.closest("[data-ver-todo]")) return;
      if (!leerSoloPendientes()) return;
      guardarSoloPendientes(false);
      aplicarEstilos();
    };

    // Al volver con el botón atrás (bfcache) las preferencias pueden haber
    // cambiado en otra pestaña o página: se vuelven a inyectar.
    const pageshow = (evento: PageTransitionEvent) => {
      if (evento.persisted) aplicarEstilos();
    };

    window.addEventListener(EVENTO_PREFERENCIAS, sincronizar);
    document.addEventListener("click", verTodo);
    window.addEventListener("pageshow", pageshow);
    return () => {
      window.removeEventListener(EVENTO_PREFERENCIAS, sincronizar);
      document.removeEventListener("click", verTodo);
      window.removeEventListener("pageshow", pageshow);
    };
  }, []);

  const alternar = () => {
    if (!disponible) return;
    guardarSoloPendientes(!solo);
    aplicarEstilos();
  };

  return (
    <button
      type="button"
      aria-pressed={solo}
      aria-label={solo ? "Mostrar: solo pendientes" : "Mostrar: todo"}
      disabled={!disponible}
      onClick={alternar}
      className="inline-flex items-center justify-center w-10 h-10 p-0 rounded-full transition-opacity cursor-pointer enabled:hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
      title={
        disponible
          ? solo
            ? "Mostrar también las entradas aprendidas"
            : "Mostrar solo lo que queda por aprender"
          : "Este navegador no permite guardar preferencias"
      }
    >
      <span
        className={`icono-svg inline-flex w-6 h-6 ${
          solo
            ? "text-[var(--color-muted-text)]"
            : "text-[var(--color-dev-text)]"
        }`}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: solo ? svgOjoOff : svgOjo }}
      />
    </button>
  );
}
