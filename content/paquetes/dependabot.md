---
titulo: "Dependabot"
resumen: "Servicio de GitHub que abre pull requests automáticos al actualizar dependencias y avisa de vulnerabilidades."
categoria: herramienta
tags: ["seguridad","terminal"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
alternativas: []
---
## Qué es

Servicio de GitHub que abre pull requests automáticos al actualizar dependencias y avisa de vulnerabilidades.

## Para qué sirve

Mantiene el árbol de dependencias al día sin que nadie recuerde revisarlo manualmente.

## Cuándo usarlo

Úsalo en cualquier repositorio con `package.json` o lockfile versionado.

## Cuándo no

No ejecuta los tests por sí solo: hace falta un workflow que valide el PR que abre.

## Alternativas

No hay una alternativa directa dentro del catálogo: la decisión depende del requisito concreto.

## Ejemplo

Un PR que sube Vite de versión tras detectar una nueva release.
