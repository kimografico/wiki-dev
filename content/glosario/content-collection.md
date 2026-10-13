---
titulo: Content collection
resumen: Conjunto de archivos de contenido que un framework carga y valida con un esquema, agrupados por tipo (glosario, paquetes…).
categoria: concepto
tags: [frontend]
alias: [colección de contenido]
relacionados: [frontmatter, schema-first, slug]
terminoEn: Content collection
---

## Definición

Una *content collection* es una carpeta de archivos de contenido (por ejemplo, Markdown) que el framework trata como datos: los carga, valida su frontmatter con un esquema y expone funciones para consultarlos.

## Por qué importa

Convierte archivos sueltos en datos tipados y consultables sin construir un CMS. Añadir contenido sigue siendo crear un archivo, pero el acceso pasa por una API ordenada.

## Ejemplo

```ts
import { getCollection } from "astro:content";

const paquetes = await getCollection("paquetes");
```

## Se confunde con

Con una base de datos. Una content collection vive en el repositorio y se lee en el build; no hay servidor ni consultas en tiempo de ejecución.
