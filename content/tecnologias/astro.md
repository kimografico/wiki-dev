---
fecha: 2026-10-13
titulo: Astro
resumen: Framework centrado en el contenido que genera HTML estático por defecto y solo envía JavaScript a las islas declaradas interactivas.
categoria: framework
tags: [frontend, rendimiento]
alias: []
relacionados: [static-site-generation, arquitectura-de-islas, react, github-pages]
alternativas: [nextjs, react]
web: https://astro.build
fuentes: [https://docs.astro.build/]
---

## Qué es

Astro es un framework para sitios web centrados en el contenido. Genera el HTML en el momento del build y, por defecto, no envía JavaScript al navegador: solo se hidratan los componentes que marcas explícitamente como interactivos con una directiva `client:*`. Esa es la idea de arquitectura de islas: el documento es HTML y la interactividad son pequeños parches localizados. Astro no intenta sustituir a React dentro de esas islas; puede usar React, Vue u otros frameworks solo en la zona que lo necesita.

## Para qué sirve

Sirve para wikis, blogs, documentación y catálogos: páginas donde la lectura manda y la interactividad es puntual. Esta propia wiki es un ejemplo: el contenido vive en Markdown con esquemas y el build produce archivos estáticos; la búsqueda se resuelve hoy con un filtro en cliente en `ListaEntradas.astro`, y el indexado estático con Pagefind está previsto pero todavía no se genera en el despliegue. El resultado es un sitio rápido en móvil y fácil de alojar, porque no necesita un proceso de servidor respondiendo cada petición.

## Cuándo usarla

- El contenido es mayoritariamente texto e imágenes que no cambian por usuario.
- Quieres buen rendimiento y poco JavaScript sin renunciar a algún widget interactivo.
- Necesitas validar frontmatter con esquemas y publicar en un hosting estático.
- Conviven componentes de varios frameworks y conviene aislarlos.

## Cuándo no

Si el producto es una aplicación con estado constante —un chat, un editor colaborativo, un panel con datos en tiempo real— una SPA encaja mejor: pelearse con hidrataciones parciales en cada pantalla añade fricción. Astro tampoco aporta mucho a una sola página con una interactividad mínima que se resuelve con unas líneas de JavaScript.

## Alternativas

| Opción | Criterio para elegirla |
| --- | --- |
| Next.js | Conviene si el proyecto es sobre todo React y necesita renderizado en servidor y rutas API. |
| React | Encaja si toda la experiencia es una aplicación de cliente y apenas hay contenido estático. |

La comparación se reduce al peso de la interactividad: si predomina la lectura, Astro gana; si predomina la aplicación, gana un framework de aplicación.

## Ejemplo

```astro
---
import { getCollection } from "astro:content";
import Buscador from "../componentes/Buscador.jsx";

const entradas = await getCollection("glosario");
---

<h1>Glosario</h1>
<ul>
  {entradas.map((entrada) => <li>{entrada.data.titulo}</li>)}
</ul>
<Buscador client:load />
```

La lista se resuelve en el build y no genera JavaScript. Solo `Buscador`, al llevar `client:load`, se hidrata en el navegador. Cambiar esa directiva por `client:visible` retrasaría la hidratación hasta que el componente entre en pantalla.
