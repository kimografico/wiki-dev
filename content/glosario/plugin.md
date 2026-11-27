---
titulo: "Plugin"
resumen: "Componente opcional que se engancha a una herramienta para ampliar su comportamiento sin modificar el núcleo."
categoria: herramienta
tags: ["terminal"]
alias: []
relacionados: [dependencia, remark, astro, linter, hook]
fuentes: []
autoenlace: true
---
## Definición

Un plugin es un componente opcional que se engancha a una herramienta para ampliar su comportamiento sin modificar el núcleo. La herramienta define puntos de extensión —lectura de archivos, transformación de texto, generación de salida— y el plugin se registra en uno de ellos. Solo se activa cuando se incluye en la configuración.

## Por qué importa

Permite pagar solo por lo que se usa. Un generador de sitios puede venir sin soporte para diagramas y añadirlo cuando la wiki lo necesita, sin copiar código del proyecto original ni mantener una copia modificada. Las capacidades también son intercambiables: si un plugin deja de servir, se sustituye por otro que hable con el mismo punto de extensión.

## Ejemplo

```js
import remarkMenciones from "./remark-menciones.js";

export default {
  markdown: { remarkPlugins: [remarkMenciones] },
};
```

El plugin convierte títulos citados en enlaces durante el build, sin tocar los archivos Markdown.

## Se confunde con

- **Dependencia**: todo plugin es una dependencia, pero una dependencia cualquiera no se engancha a la herramienta.
- **Hook**: es el punto de enganche; el plugin es el código que se engancha a él.
- **Extensión del navegador**: actúa sobre el navegador, no sobre el proceso de build.

Matiz: el orden de registro importa. Dos plugins que transforman el mismo texto producen resultados distintos según cuál corre primero.
