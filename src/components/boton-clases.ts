export type VarianteBoton = "principal" | "secundaria" | "sutil";
export type TamanoBoton = "pequeno" | "normal";

const variantes: Record<VarianteBoton, string> = {
  principal:
    "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-on-accent)] hover:brightness-110",
  secundaria:
    "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)]",
  sutil:
    "border-transparent bg-transparent text-[var(--color-muted-text)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]",
};

export function clasesBoton(
  variante: VarianteBoton,
  tamano: TamanoBoton,
  clase?: string | null,
) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full border font-semibold cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
    tamano === "pequeno" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
    variantes[variante],
    clase,
  ];
}
