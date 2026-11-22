// Isla «Marcar como aprendida» (RF-14), solo en las fichas. Solo icono, sin
// fondo ni borde: `brain-off` en muted sin marcar, `brain` en azul
// (--color-dev) al marcarla. Escribe con la lógica de
// `lib/preferencias/aprendidas.ts` (TS puro) y reinyecta el <style> de la
// página con `aplicarEstilos`.
import { useEffect, useState } from "react";
import svgBrain from "../../assets/icons/brain.svg?raw";
import svgBrainOff from "../../assets/icons/brain-off.svg?raw";
import {
  alternarAprendida,
  aplicarEstilos,
  esAprendida,
  hayAlmacenamiento,
} from "../../lib/preferencias/aprendidas.ts";

interface Props {
  slug: string;
}

export default function BotonAprendida({ slug }: Props) {
  const [aprendida, setAprendida] = useState(false);
  const [disponible, setDisponible] = useState(true);

  useEffect(() => {
    setDisponible(hayAlmacenamiento());
    setAprendida(esAprendida(slug));
  }, [slug]);

  const alternar = () => {
    if (!disponible) return;
    const nueva = alternarAprendida(slug);
    setAprendida(nueva.includes(slug));
    aplicarEstilos();
  };

  return (
    <button
      type="button"
      aria-pressed={aprendida}
      aria-label={aprendida ? "Aprendida" : "Marcar como aprendida"}
      disabled={!disponible}
      onClick={alternar}
      className="inline-flex items-center justify-center w-10 h-10 p-0 rounded-full transition-opacity cursor-pointer enabled:hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
      title={
        disponible
          ? aprendida
            ? "Aprendida: pulsa para desmarcarla"
            : "Marcar como aprendida"
          : "Este navegador no permite guardar preferencias"
      }
    >
      <span
        className={`icono-svg inline-flex w-6 h-6 ${
          aprendida
            ? "text-[var(--color-dev-text)]"
            : "text-[var(--color-muted-text)]"
        }`}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: aprendida ? svgBrain : svgBrainOff }}
      />
    </button>
  );
}
