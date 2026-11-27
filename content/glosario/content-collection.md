---
fecha: 2026-10-13
titulo: Content collection
resumen: Conjunto de archivos de contenido que un framework carga y valida con un esquema, agrupados por tipo (glosario, paquetes…).
categoria: concepto
tags: [frontend]
alias: [colección de contenido]
relacionados: [frontmatter, schema-first, slug, markdown]
terminoEn: Content collection
---

## Definición

Una *content collection* es una carpeta de archivos de contenido —Markdown, MDX o JSON— que el framework trata como datos estructurados: los descubre, valida su frontmatter contra un esquema y los expone mediante funciones de consulta. No es un directorio que se lee en crudo: la colección define qué campos son obligatorios y con qué tipo se interpretan.

## Por qué importa

Permite mantener el contenido en archivos legibles y, aun así, obtener errores tempranos. Si una entrada olvida el `resumen` o escribe una categoría fuera del catálogo, el fallo aparece al construir el sitio y no después de publicarlo. En esta wiki las entradas viven en `content/<coleccion>/` y el esquema compartido hace que todas las fichas de una colección tengan la misma forma.

## Ejemplo

```ts
import { getCollection } from "astro:content";

const glosario = await getCollection("glosario");
const ordenadas = glosario.sort((a, b) =>
  a.data.titulo.localeCompare(b.data.titulo),
);
```

La consulta devuelve objetos con `id`, `slug` y `data`; `data` ya viene validado y tipado.

## Se confunde con

Con un CMS. Un CMS ofrece interfaz de edición, base de datos y publicación desde el navegador; aquí el editor es el repositorio y el contenido se congela en el build. También se confunde con una simple lectura de archivos: sin esquema no hay garantía de que el frontmatter sea correcto.
