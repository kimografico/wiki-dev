// Isla del interruptor de tema (RF-13). Mínima: solo cambia `data-theme` y
// guarda la elección. La lógica vive en `lib/preferencias/tema.ts` (TS puro).
import { useEffect, useState } from "react";
import {
  alternarTema,
  temaInicial,
  type Tema,
} from "../../lib/preferencias/tema.ts";

export default function InterruptorTema() {
  const [tema, setTema] = useState<Tema>("light");

  useEffect(() => {
    setTema(temaInicial());
  }, []);

  const esOscuro = tema === "dark";

  return (
    <button
      type="button"
      aria-pressed={esOscuro}
      onClick={() => setTema(alternarTema(tema))}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] text-[var(--color-text)] transition-all cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
      title={esOscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
    >
      {esOscuro ? (
        // Icono Sol (para pasar a claro)
        <svg
          className="w-3.5 h-3.5 text-[var(--color-design)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Icono Luna (para pasar a oscuro)
        <svg
          className="w-3.5 h-3.5 text-[var(--color-dev)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
      <span className="text-xs font-medium">{esOscuro ? "Oscuro" : "Claro"}</span>
      <span className="visually-hidden">Pulsa para cambiar el tema</span>
    </button>
  );
}
