---
fecha: 2026-10-13
titulo: Arquitectura de islas
resumen: Patrón que renderiza toda la página como HTML estático y aísla en «islas» solo los componentes que necesitan JavaScript.
categoria: concepto
tags: [frontend, rendimiento]
alias: [isla, islands]
relacionados: [hidratacion, astro, react, code-splitting]
terminoEn: Islands architecture
---

## Definición

La arquitectura de islas renderiza la página como HTML estático y marca solo algunos componentes como interactivos. Cada uno se hidrata de forma independiente: carga su JavaScript cuando toca y no arrastra al resto del documento. El texto, las imágenes y la navegación siguen siendo HTML, sin estado en el cliente.

## Por qué importa

En una wiki casi todas las páginas se leen: no necesitan gestionar estado ni reaccionar a cada pulsación. Si se hidratara todo el árbol, el navegador descargaría y ejecutaría código para resolver algo que ya viene en el HTML. Con islas, un selector de tema puede existir sin penalizar el artículo que lo contiene. El coste se paga solo donde hay interactividad real.

## Ejemplo

```astro
---
import InterruptorTema from '../components/InterruptorTema.tsx';
---
<article><slot /></article>
<InterruptorTema client:load />
```

En Astro, `client:load` hidrata el componente React nada más cargar la página y lo convierte en una isla; el artículo se envía como HTML. La directiva solo vale para componentes de frameworks UI: un componente `.astro` se renderiza en el servidor y no admite `client:*`.

## Se confunde con

Con una SPA. En una aplicación de página única el cliente construye la interfaz y gestiona la navegación; aquí el HTML es la página y las islas son excepciones. Tampoco es lo mismo que Hidratación: la hidratación es el mecanismo, y las islas deciden dónde aplicarlo. Abusar de muchas islas pequeñas puede sumar más JavaScript que una sola pieza bien delimitada.
