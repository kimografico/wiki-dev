---
titulo: "Core Web Vitals"
resumen: "Métricas de experiencia real de carga, interactividad y estabilidad visual: LCP, INP y CLS."
categoria: rendimiento-ux
tags: ["rendimiento"]
alias: []
relacionados: [lazy-load, code-splitting, cache, dashboard]
fuentes: ["https://web.dev/articles/vitals"]
autoenlace: true
---

## Definición

Core Web Vitals son tres métricas de experiencia real: LCP mide cuánto tarda en aparecer el elemento de contenido más grande, INP mide la respuesta a las interacciones del usuario y CLS mide cuánto se desplaza el contenido de forma inesperada. Se recogen de visitantes reales cuando el sitio envía telemetría, no en una ejecución aislada.

## Por qué importa

Convierten una queja difusa («va lento») en señales accionables. Un LCP alto apunta a la imagen principal o a un CSS bloqueante; un INP alto delata un manejador de eventos que bloquea el hilo principal; un CLS alto suele venir de imágenes sin dimensiones reservadas o de fuentes que cambian el texto al cargar. Al medirse en campo, muestran lo que ocurre en equipos y redes reales, no solo en el ordenador del desarrollador.

## Ejemplo

```html
<img src="/hero.webp" width="1200" height="600" alt="Portada">
```

Reservar `width` y `height` evita que el navegador desplace el texto cuando llega la imagen: es una corrección directa de CLS. Cargar esa misma imagen de forma diferida, en cambio, puede empeorar el LCP si es justamente el elemento principal.

## Se confunde con

Con Lighthouse. Lighthouse ejecuta una auditoría en laboratorio, con condiciones fijas y sin usuarios reales; las Core Web Vitals son el resultado medido en campo. Un buen resultado en la herramienta no garantiza que los visitantes vean lo mismo.
