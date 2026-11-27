---
titulo: "Lazy load"
resumen: "Carga diferida de un recurso solo cuando se necesita o se acerca a la vista del navegador."
categoria: rendimiento-ux
tags: ["frontend","rendimiento"]
alias: []
relacionados: [code-splitting, core-web-vitals, skeleton, cache]
fuentes: []
autoenlace: true
---

## Definición

Lazy load, o carga diferida, es la técnica de no descargar un recurso hasta que se necesita: normalmente cuando se acerca a la vista del navegador o cuando la persona pulsa algo. El recurso existe en la página, pero su petición se pospone. Se aplica sobre todo a imágenes, vídeos y `iframe`.

## Por qué importa

En una página con veinte imágenes, descargarlas todas al abrir compite por la red con el texto y el CSS que hacen falta para leer. Al diferir las que quedan fuera de pantalla, la primera renderización llega antes y mejora Core Web Vitals. El caso típico es una galería: se lee arriba mientras las fotos de abajo se piden scroll a scroll. Conviene reservar ancho y alto, o la página saltará cuando lleguen.

## Ejemplo

```html
<img src="grafico.png" width="640" height="360" loading="lazy" alt="Ventas por mes" />
```

El navegador decide cuándo pedir el archivo; `width` y `height` evitan el desplazamiento.

## Se confunde con

No es Code splitting: aquí se posponen recursos; allí se divide el JavaScript en trozos que se cargan bajo demanda. Tampoco es precarga, que hace lo contrario: pedir el archivo antes de usarlo. Y no conviene aplicarlo a la imagen principal, porque retrasaría justo lo que se quiere mostrar. Para contenido que aún no ha llegado, un Skeleton describe su forma en lugar de pedirlo tarde.
