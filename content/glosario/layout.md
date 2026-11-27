---
titulo: "Layout"
resumen: "Estructura compartida que envuelve varias páginas con cabecera, pie y un hueco para el contenido propio de cada una."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: [slot, componentizacion, frontend, static-site-generation]
fuentes: []
autoenlace: true
---

## Definición

Un layout es la estructura compartida que envuelve a varias páginas: cabecera, navegación, pie y un hueco donde se inserta el contenido de cada una. Se define una vez y se aplica a muchas rutas, de modo que el marco visual no se copia en cada archivo. En Astro, ese hueco se declara con un `slot`.

## Por qué importa

En una wiki de cien entradas, sin layout cada ficha tendría que repetir cabecera, menú y pie. Un cambio en el menú exigiría editar cien archivos y siempre quedaría alguno desactualizado. Con un layout, la corrección se hace en un solo sitio y se refleja en todas las páginas que lo usan. También centraliza decisiones transversales: título del documento, metadatos y carga de estilos. Es la misma idea que hace viable la Generación de sitio estático: cientos de páginas comparten un único marco.

## Ejemplo

```astro
---
import Base from "../layouts/Base.astro";
---
<Base titulo="Layout">
  <p>Contenido de esta entrada</p>
</Base>
```

`Base.astro` contiene el `slot` que recibe el párrafo.

## Se confunde con

No es una plantilla de datos: la plantilla describe **qué campos** tiene una entrada; el layout describe **dónde se colocan** en la página. Tampoco es un componente cualquiera: un componente se invoca cuando hace falta, mientras que el layout se aplica automáticamente a un grupo de páginas. La Componentización divide la interfaz en piezas; el layout es la pieza que las enmarca todas.
