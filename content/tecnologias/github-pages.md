---
fecha: 2026-10-13
titulo: GitHub Pages
resumen: Servicio de GitHub que publica archivos estáticos de un repositorio; aquí es el destino del despliegue de la wiki.
categoria: despliegue
tags: [frontend, nivel-0]
alias: []
relacionados: [github, github-actions, integracion-continua, static-site-generation, cloudflare]
alternativas: [vercel, cloudflare]
web: https://pages.github.com
fuentes: [https://docs.github.com/pages]
---

## Qué es

GitHub Pages es un servicio de alojamiento de sitios estáticos integrado en GitHub. Publica HTML, CSS, JavaScript e imágenes desde un repositorio, sin servidor de aplicación ni base de datos. No ejecuta código por petición: todo lo que sirve ya fue generado antes. Tampoco sustituye al workflow que construye el sitio; Pages recibe el resultado y lo pone a disposición del público.

## Para qué sirve

Sirve para publicar el resultado de un build estático de forma sencilla. Un workflow construye la wiki y entrega la carpeta generada; Pages la sirve en una dirección pública. Como el repositorio ya está en GitHub, no hace falta crear una cuenta en otro proveedor ni copiar archivos a mano. Es una opción cómoda cuando el sitio es documentación, un blog o una wiki de lectura.

## Cuándo usarla

- El sitio se genera entero en el build y no necesita backend.
- El código ya vive en GitHub y quieres que publicación y repositorio estén juntos.
- Aceptas servir archivos públicos y gestionar el dominio desde la configuración del repositorio.

## Cuándo no

Cuando se necesita lógica por petición, usuarios autenticados, bases de datos o procesos en segundo plano: Pages solo entrega archivos. Tampoco es la mejor opción si el equipo usa otro proveedor para todo lo demás y tendría que duplicar permisos y pipelines.

## Alternativas

| Opción | Criterio para elegirla |
| --- | --- |
| GitHub Pages | El proyecto ya está en GitHub y el sitio es puramente estático. |
| Vercel | Quieres despliegues previos por rama y funciones junto al frontend. |
| Cloudflare | Necesitas CDN, DNS y protección alrededor del sitio, además de funciones en el borde. |

Si solo cambia el lugar donde se sirven los archivos, la decisión es operativa; si necesitas functions, ya no estás comparando hosting estático.

## Ejemplo

Secuencia que ejecuta el workflow de publicación:

```bash
npm ci
npm run check
npm run validate
npm run build
```

El build deja el sitio en `dist/`. El workflow sube esa carpeta como artefacto y lo publica; no hay que incluir `node_modules` ni los archivos fuente en el resultado. Separar comprobación y publicación permite frenar el despliegue si falla un test.

## Despliegue de esta wiki

El sitio es estático: el build genera HTML y el workflow lo publica después de pasar tipos, lint, formato, validación de contenido y pruebas. No hay servidor de aplicación en GitHub Pages; por eso la búsqueda funciona hoy como filtro en cliente sobre las entradas ya renderizadas, y el paso de indexado con Pagefind permanece comentado en el workflow. El dominio y la ruta base se configuran en Astro para que los enlaces sigan funcionando bajo la subruta publicada. Si el contenido no se ve tras un cambio, conviene revisar primero el artefacto generado y después la caché de la capa que esté delante.
