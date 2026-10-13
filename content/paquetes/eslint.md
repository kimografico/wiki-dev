---
titulo: ESLint
resumen: Analizador estático de JavaScript y TypeScript que señala errores y prácticas dudosas según reglas configurables.
categoria: herramienta
tags: [frontend, terminal]
alias: []
relacionados: [prettier]
alternativas: []
web: https://eslint.org
npm: eslint
fuentes: [https://eslint.org/docs/latest/]
---

## Qué es

ESLint recorre el código sin ejecutarlo y avisa de problemas: variables sin usar, comparaciones sospechosas, patrones incorrectos en Astro o React. Sus reglas son configurables y se pueden ampliar con plugins.

## Para qué sirve

Atrapa errores reales antes de ejecutar y mantiene cierta coherencia en el código. Aquí forma parte de las comprobaciones de calidad del build y de la CI.

## Cuándo usarlo

En todo proyecto con JavaScript o TypeScript; en un equipo, para acordar reglas comunes y detectarlas automáticamente.

## Cuándo no

No sustituye a los tests ni al comprobador de tipos: cubre estilo y errores estáticos, no el comportamiento. Conviene no llenarlo de reglas discutibles.

## Alternativas

Biome agrupa lint y formato en una sola herramienta más rápida; aquí se mantiene ESLint por su ecosistema y su soporte de Astro.

## Ejemplo

```bash
npm run lint        # revisa el proyecto
eslint --fix .      # corrige lo que se puede
```
