---
fecha: 2026-10-13
titulo: Pagefind
resumen: Buscador estático que indexa un sitio ya construido y añade búsqueda sin ningún servidor.
categoria: herramienta
tags: [frontend, rendimiento]
alias: []
relacionados: [static-site-generation, markdown, content-collection]
alternativas: []
web: https://pagefind.app
npm: pagefind
fuentes: [https://pagefind.app/docs/]
---

## Qué es

Pagefind es un buscador para sitios estáticos. Tras el build, recorre el HTML generado, extrae el texto de cada página y escribe un índice en la carpeta de salida. Ese índice se divide en fragmentos: el navegador descarga solo la parte necesaria cuando alguien escribe en el buscador. La búsqueda ocurre en el cliente, sin base de datos ni servicio intermedio. Conviene distinguirlo del HTML: Pagefind no genera páginas, añade un índice sobre páginas ya existentes.

## Para qué sirve

Permite que una wiki publicada en GitHub Pages tenga búsqueda local. El contenido se construye una vez y el visitante puede encontrar una entrada por título o por texto sin lanzar peticiones a un servidor propio. En este proyecto, sin embargo, la búsqueda es hoy un filtro en cliente implementado en `ListaEntradas.astro`: trabaja sobre las entradas que ya llegan en la página, sin consultar ningún índice. El indexado con Pagefind está previsto y aparece comentado en `.github/workflows/deploy.yml`, pero no se ejecuta en el despliegue actual.

## Cuándo usarlo

Encaja cuando el sitio es estático, el contenido cambia en cada publicación y se acepta que el índice quede congelado hasta el siguiente build. Es una opción natural para documentación, wikis y blogs con cientos de páginas, donde la búsqueda sirve para encontrar texto y no para recomendar ni personalizar.

## Cuándo no

No conviene si el contenido cambia en tiempo real, si hacen falta sinónimos complejos, facetas avanzadas o analítica de búsquedas, o si el índice debe incluir datos privados. Tampoco ayuda en una página de una sola entrada: el coste de descargar el índice supera el beneficio. Si el equipo necesita permisos por usuario, la búsqueda debe resolverse en un servicio con acceso controlado.

## Ejemplo

Así se vería el paso que hoy está comentado en el workflow de despliegue:

```bash
npm run build
npx pagefind --site dist
```

El segundo comando añadiría los archivos del índice dentro de `dist/`. Desde el navegador, respetando la base `/wiki-dev/` de la wiki:

```js
import pagefind from "/wiki-dev/pagefind/pagefind.js";

const resultado = await pagefind.search("bundler");
const pagina = await resultado.results[0].data();
console.log(pagina.url, pagina.excerpt);
```

El módulo se importa por defecto, no como una exportación con nombre `{ pagefind }`.

## Matices

El orden importa: indexar antes del build dejaría fuera las páginas nuevas. También conviene publicar el índice con el resto del sitio, porque una búsqueda que apunta a un índice ausente falla en silencio. La ruta del import debe incluir la base `/wiki-dev/`: copiar el ejemplo con `/pagefind/pagefind.js` pediría el archivo fuera de la subruta publicada y la búsqueda no arrancaría. Mientras el indexado siga desactivado, los filtros por categoría, etiqueta y estado de lectura los aplica el filtro en cliente de `ListaEntradas.astro`, no la API de Pagefind. Frente a un servicio alojado, Pagefind cambia mantenimiento por simplicidad: no hay claves ni cuotas que vigilar, pero tampoco hay resultados que se actualicen sin una nueva publicación.
