import { useState, type Ref } from "react";

interface Props {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  shortcut?: string;
  inputRef?: Ref<HTMLInputElement>;
}

export default function CampoBusqueda({
  value,
  defaultValue,
  onChange,
  placeholder = "Buscar…",
  ariaLabel = "Buscar",
  shortcut,
  inputRef,
}: Props) {
  const [valorLocal, setValorLocal] = useState(defaultValue ?? "");
  const valor = value ?? valorLocal;

  const actualizar = (nuevoValor: string) => {
    if (value === undefined) setValorLocal(nuevoValor);
    onChange?.(nuevoValor);
  };

  return (
    <div className="flex items-center gap-2 p-1.5 pl-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs transition-all focus-within:border-[var(--color-border-strong)]">
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
        value={valor}
        onChange={(event) => actualizar(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full bg-transparent border-0 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ring-0"
      />

      {valor && (
        <button
          type="button"
          onClick={() => actualizar("")}
          className="px-2 py-1 text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] cursor-pointer"
          aria-label="Limpiar búsqueda"
        >
          ✕
        </button>
      )}

      {shortcut && (
        <div className="hidden sm:flex items-center gap-1 pr-2 shrink-0">
          <kbd className="px-2 py-0.5 text-[11px] font-mono text-[var(--color-muted)] bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md">
            {shortcut}
          </kbd>
        </div>
      )}
    </div>
  );
}
