import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // En F0 todavía no hay tests; la suite llega a partir de F1 y se escribe o
    // ajusta a petición del autor (spec.md §11).
    passWithNoTests: true,
    include: ["src/**/*.test.ts", "scripts/**/*.test.ts"],
    coverage: {
      provider: "v8",
      // RNF-10: cobertura >= 90% sobre la lógica TypeScript (lib/ y scripts/);
      // se excluyen .astro, páginas, stories y configuración.
      include: ["src/lib/**", "scripts/**"],
      exclude: ["**/*.test.ts", "**/*.stories.*"],
      reporter: ["text", "html"],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
    },
  },
});
