---
titulo: "pnpm"
resumen: "Gestor de dependencias que usa enlaces y un almacén global para evitar duplicar paquetes en cada proyecto."
categoria: herramienta
tags: ["terminal","nivel-0"]
alias: []
relacionados: []
fuentes: ["https://pnpm.io/"]
autoenlace: true
alternativas: ["npm","yarn"]
web: "https://pnpm.io/"
npm: "pnpm"
---
## Qué es

Gestor de dependencias que usa enlaces y un almacén global para evitar duplicar paquetes en cada proyecto.

## Para qué sirve

Ahorra disco y acelera instalaciones en monorepos con muchas dependencias compartidas.

## Cuándo usarlo

Úsalo cuando trabajes con workspaces o quieras instalaciones rápidas y deterministas.

## Cuándo no

No conviene mezclarlo con npm en el mismo repo sin decidir antes qué lockfile manda.

## Alternativas

Las alternativas directas son `npm`, `yarn`. Conviene compararlas antes de elegir.

## Ejemplo

```bash
pnpm install
pnpm --filter wiki add zod
```
