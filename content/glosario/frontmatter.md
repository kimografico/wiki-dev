---
titulo: Frontmatter
resumen: Bloque de datos con formato YAML al inicio de un archivo Markdown, delimitado por tres guiones, que describe la entrada.
categoria: concepto
tags: []
relacionados: [markdown, content-collection]
terminoEn: Frontmatter
---

## Definición

El frontmatter es la cabecera de metadatos de un archivo Markdown. Se escribe entre dos líneas de `---` y usa YAML: pares `clave: valor` que describen la entrada (título, categoría, etiquetas…).

## Por qué importa

Separa los **datos** de una entrada de su **texto**. Así el título, la categoría o las relaciones se pueden validar, listar y reutilizar sin analizar la prosa.

## Ejemplo

```md
---
titulo: Zod
categoria: datos-api
tags: [backend]
---

## Qué es

...
```

## Se confunde con

Con el propio YAML. YAML es el formato; el frontmatter es **dónde** se usa: la cabecera de un documento Markdown.
