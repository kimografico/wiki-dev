---
titulo: Arquitectura de islas
resumen: Patrón que renderiza toda la página como HTML estático y aísla en «islas» solo los componentes que necesitan JavaScript.
categoria: concepto
tags: [frontend, rendimiento]
alias: [isla, islands]
relacionados: [hidratacion, astro, react]
terminoEn: Islands architecture
---

## Definición

La arquitectura de islas trata la página como HTML estático con pequeños espacios interactivos independientes, las «islas». Cada isla es un componente que se hidrata por su cuenta; el resto de la página no envía JavaScript.

## Por qué importa

Un artículo de una wiki se lee, no se «usa»: casi nada necesita interactividad. Mantener el JavaScript limitado a las islas hace que las páginas carguen rápido sin renunciar a la interactividad donde de verdad hace falta.

## Ejemplo

```astro
<!-- HTML estático, cero JS -->
<article><slot /></article>
<!-- Isla: solo esto se hidrata -->
<InterruptorTema client:load />
```

## Se confunde con

Con una aplicación de página única (SPA), donde todo el árbol se hidrata. La diferencia es que aquí cada isla es independiente y el grueso de la página no ejecuta JavaScript.
