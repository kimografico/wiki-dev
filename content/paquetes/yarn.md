---
titulo: "Yarn"
resumen: "Gestor de dependencias de npm con foco en velocidad, determinismo y workspaces."
categoria: herramienta
tags: ["terminal","nivel-0"]
alias: []
relacionados: []
fuentes: ["https://yarnpkg.com/"]
autoenlace: true
alternativas: ["npm","pnpm"]
web: "https://yarnpkg.com/"
npm: "yarn"
---
## Qué es

Gestor de dependencias de npm con foco en velocidad, determinismo y workspaces.

## Para qué sirve

Ofrece una alternativa madura a npm con otro formato de lockfile y comandos propios.

## Cuándo usarlo

Úsalo cuando el equipo ya lo emplea o cuando sus workspaces encajan mejor con el proyecto.

## Cuándo no

No conviene tener lockfiles de npm y Yarn conviviendo sin una decisión clara.

## Alternativas

Las alternativas directas son `npm`, `pnpm`. Conviene compararlas antes de elegir.

## Ejemplo

```bash
yarn install
yarn workspace wiki dev
```
