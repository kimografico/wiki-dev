---
titulo: Prettier
resumen: Formateador de código opinado que reescribe el estilo (comillas, saltos, indentación) de forma uniforme.
categoria: herramienta
tags: [frontend, terminal]
alias: []
relacionados: [eslint]
alternativas: []
web: https://prettier.io
npm: prettier
fuentes: [https://prettier.io/docs/]
---

## Qué es

Prettier da formato al código con reglas fijas: no se discute cómo colocar las comillas o los saltos de línea, la herramienta decide por ti. Con el plugin de Astro, cubre también los archivos `.astro`.

## Para qué sirve

Elimina discusiones de estilo y mantiene el repositorio uniforme. Aquí se ejecuta al guardar (`--write`) y se comprueba en la CI (`--check`).

## Cuándo usarlo

Cuando varias personas (o agentes) escriben en el mismo repositorio y se quiere un formato consistente sin pensarlo.

## Cuándo no

Prettier no busca errores ni lógica: convive con ESLint, no lo reemplaza. Si el equipo ya tiene un estilo muy definido, hay que valorar el cambio.

## Alternativas

Biome integra formato y lint; dprint es otra opción rápida; aquí Prettier se queda por su soporte de Astro y su configuración mínima.

## Ejemplo

```bash
npm run format:check   # falla si algo no está formateado
npm run format         # reescribe el proyecto
```
