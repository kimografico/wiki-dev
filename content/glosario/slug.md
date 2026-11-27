---
fecha: 2026-10-13
titulo: Slug
resumen: Identificador legible de una entrada, en minúsculas y con guiones, que suele coincidir con el nombre de su archivo.
categoria: concepto
tags: [nivel-0]
relacionados: ["content-collection", "url", "convenciones-de-nombres", "frontmatter"]
terminoEn: Slug
---

## Definición

Un slug es un identificador corto y legible derivado de un nombre: minúsculas, sin acentos y guiones en lugar de espacios. «Generación de sitio estático» se convierte en `static-site-generation`. En esta wiki es el nombre del archivo dentro de `content/` y también el último segmento de la URL de la entrada.

## Por qué importa

Es la clave estable de una entrada. Los campos `relacionados`, las entidades de las comparativas y las menciones automáticas se resuelven por slug; cambiarlo rompe enlaces internos y deja de reconocer el título en el texto. Por eso se decide al crear la entrada y se conserva aunque el título evolucione con el tiempo.

## Ejemplo

```text
content/paquetes/gray-matter.md  ->  slug: gray-matter
content/glosario/slug.md         ->  slug: slug
```

Las siglas se escriben en minúsculas (`ssr`) y su forma extensa se declara en `alias` para que se reconozca en el texto.

## Se confunde con

Con el título: el título es el nombre visible y puede cambiar; el slug es el identificador técnico. También con la URL completa, de la que es solo un segmento, y con el `id` de HTML, que identifica un elemento dentro de una página, no una entrada.

## Convenciones

Los guiones separan palabras; no se usan guiones bajos ni acentos, aunque el título visible los lleve.
