---
titulo: "SEO semántico"
resumen: "Optimización para motores de búsqueda basada en significado, estructura y contenido útil más que en repetir palabras clave."
categoria: rendimiento-ux
tags: ["frontend"]
alias: []
relacionados: [html-semantico, accesibilidad-web, core-web-vitals, frontmatter]
fuentes: []
autoenlace: true
---

## Definición

El SEO semántico optimiza para buscadores cuidando el significado del contenido y su estructura: título descriptivo, encabezados ordenados, texto que responde a una duda y enlaces coherentes. No consiste en repetir una palabra clave hasta saturar la página. La semántica se apoya en HTML significativo, no en etiquetas añadidas solo para el buscador.

## Por qué importa

Un buscador entiende mejor una ficha cuyo título, resumen y cuerpo describen el mismo concepto con precisión. En esta wiki, Frontmatter declara título y resumen; los encabezados «Definición» y «Ejemplo» organizan el texto; las relaciones enlazan conceptos vecinos. El resultado sirve también a quien lee: si el contenido responde de verdad, no hace falta escribir una versión para el buscador y otra distinta para las personas. Un `h2` que no describe su bloque, o un resumen genérico repetido en todas las fichas, debilita esa señal.

## Ejemplo

```html
<h1>Proxy</h1>
<meta name="description" content="Qué es un proxy y cuándo usarlo">
```

## Se confunde con

Con ASO (optimización para tiendas de aplicaciones): aquella ajusta el título, la descripción y las capturas de una app en su tienda; aquí el canal es la web. Tampoco es sinónimo de rendimiento: Core Web Vitals influyen, pero una página rápida con textos vacíos sigue sin responder a la búsqueda.
