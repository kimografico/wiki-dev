---
fecha: 2026-10-13
titulo: Slug
resumen: Identificador legible de una entrada, en minúsculas y con guiones, que suele coincidir con el nombre de su archivo.
categoria: concepto
tags: [nivel-0]
relacionados: [content-collection]
terminoEn: Slug
---

## Definición

Un slug es un identificador corto y legible derivado de un nombre: en minúsculas, sin acentos y con guiones en lugar de espacios. Por ejemplo, «Generación de sitio estático» produce `static-site-generation`.

## Por qué importa

Es la clave estable de una entrada. Las relaciones entre entradas y las menciones enlazadas se resuelven por slug, así que no se renombra a la ligera: cambiarlo rompe enlaces.

## Ejemplo

```text
content/paquetes/gray-matter.md  ->  slug: gray-matter
```

## Se confunde con

Con el título. El título es el nombre visible y puede cambiar; el slug es el identificador técnico y conviene mantenerlo estable.

## Slugs y menciones

Además de identificar la URL, el slug se usa en los campos de relación y en el índice de menciones. Por eso debe ser estable: cambiarlo rompe enlaces internos y deja de reconocer el título en el texto.
