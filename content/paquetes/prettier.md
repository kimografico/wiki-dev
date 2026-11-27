---
fecha: 2026-10-13
titulo: Prettier
resumen: Formateador de código opinado que reescribe el estilo (comillas, saltos, indentación) de forma uniforme.
categoria: herramienta
tags: [frontend, terminal, nivel-0]
alias: []
relacionados: [eslint, astro, markdown]
alternativas: []
web: https://prettier.io
npm: prettier
fuentes: [https://prettier.io/docs/]
---

## Qué es

Prettier es un formateador opinado: decide comillas, indentación, longitud de línea y saltos, y reescribe el archivo para que todos sigan el mismo estilo. No interpreta el programa para buscar errores; solo transforma su presentación. Con el plugin correspondiente cubre también archivos `.astro`, además de JavaScript, TypeScript, CSS y Markdown.

## Para qué sirve

Elimina las discusiones de estilo del code review. En este repositorio se aplica con `npm run format` —equivalente a `prettier --write .`— cuando hace falta reescribir archivos, y `lint-staged` lo ejecuta sobre los archivos preparados al hacer commit; no se lanza automáticamente al guardar. La comprobación `npm run format:check` se ejecuta en la integración continua: si alguien dejó un archivo sin formatear, falla antes de mezclar el cambio. El contenido de la wiki también pasa por él, incluido el frontmatter, de modo que una entrada nueva no introduce diferencias de espaciado en el diff.

## Cuándo usarlo

Cuando varias personas o agentes escriben en el mismo repositorio y se quiere una puntuación uniforme sin debatirla. Aporta especialmente en proyectos con muchos lenguajes, porque una sola herramienta cubre JS, CSS y Markdown con la misma filosofía. En archivos Markdown, ordena tablas y listas sin que nadie tenga que contar espacios.

## Cuándo no

Si el equipo necesita reglas de estilo muy específicas, aceptar las decisiones de Prettier puede ser un cambio cultural. Tampoco sirve para detectar variables sin usar, importaciones incorrectas ni errores de lógica: para eso está ESLint. Y no conviene ejecutarlo sobre archivos generados o binarios, porque reescribe contenido que debe permanecer intacto.

## Prettier frente a ESLint

La duda habitual es si uno sustituye al otro. No: ESLint analiza el código y puede avisar de problemas; Prettier solo cambia cómo se ve. Cuando ambos están instalados, la regla práctica es que ESLint no lleve reglas de formato que Prettier ya resuelve, para que no se peleen corrigiendo el mismo archivo. En este proyecto, `npm run lint` y `npm run format:check` son comprobaciones independientes y las dos deben pasar.

## Ejemplo

```bash
npm run format:check          # falla si algo no está formateado
npm run format                # reescribe los archivos
npx prettier --check content/paquetes/zod.md
```

## Matices

Formatear no cambia el significado, pero sí cambia el diff. Conviene ejecutar el formateador sobre el archivo que se está tocando y no sobre todo el repositorio en una tarea sin relación, para que el historial siga siendo legible.
