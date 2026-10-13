---
titulo: Markdown
resumen: Lenguaje de marcado ligero, basado en texto plano, que se convierte en HTML y que aquí se usa sin extensiones MDX.
categoria: concepto
tags: []
relacionados: [frontmatter, remark]
terminoEn: Markdown
---

## Definición

Markdown es un lenguaje de marcado sencillo: el texto se escribe en plano y unas pocas marcas (`#` para títulos, `**` para negrita, `[]()` para enlaces) indican el formato. Un procesador lo convierte en HTML.

## Por qué importa

Separa el contenido de la presentación y es fácil de escribir y de revisar en un `git diff`. Al ser texto plano, sirve igual para una persona o para un agente.

## Ejemplo

```md
## Qué es

Un párrafo con un [enlace](https://astro.build).
```

## Se confunde con

Con HTML. Markdown genera HTML, pero su sintaxis es mucho más breve y legible; para lo que Markdown no cubre, aquí no se usa MDX ni componentes dentro del texto.
