---
titulo: "Slot"
resumen: "Punto de inserción declarado en un componente o plantilla donde se coloca el contenido que llega desde fuera."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: ["layout", "astro", "shadow-dom", "componentizacion"]
fuentes: ["https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot"]
autoenlace: true
---

## Definición

Un slot es un hueco declarado dentro de un componente o una plantilla donde se coloca contenido que llega desde fuera. Quien define el componente decide dónde está el hueco y qué mostrar si nadie lo rellena; quien lo usa decide qué marcado va ahí. En Astro y en los componentes web, el contenido entre las etiquetas del componente se proyecta en ese punto.

## Por qué importa

Permite separar estructura y contenido sin crear una prop por cada texto. Una tarjeta fija su borde, su cabecera y su pie, y deja que cada página elija el cuerpo. Si mañana cambia el envoltorio, no hay que tocar las páginas que la usan: el hueco sigue en el mismo sitio. Es la base de los layouts que envuelven entradas completas.

## Ejemplo

```astro
---
import Layout from "../layouts/Base.astro";
---
<Layout titulo="Slot">
  <p>Este párrafo se proyecta en el slot del layout.</p>
</Layout>
```

En HTML nativo, `<slot name="pie">Texto por defecto</slot>` se rellena con `slot="pie"`; el slot sin nombre recoge el resto.

## Se confunde con

No es una prop: una prop transmite valores —cadenas, números, objetos—; un slot transmite marcado ya construido, con sus etiquetas y componentes. Tampoco es un *include* clásico de plantilla, donde el archivo incluido se inserta por su propia ruta: aquí el contenido lo pasa el componente padre.
