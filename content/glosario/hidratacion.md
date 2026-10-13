---
titulo: Hidratación
resumen: Proceso de añadir interactividad a un HTML estático cargando JavaScript que «reactiva» los componentes en el navegador.
categoria: concepto
tags: [frontend, rendimiento]
alias: [hydration]
relacionados: [arquitectura-de-islas, react, static-site-generation]
terminoEn: Hydration
---

## Definición

La hidratación es el paso en el que el navegador carga JavaScript y lo asocia al HTML ya renderizado, de modo que los componentes responden a clics y cambios de estado. Hasta que no ocurre, el HTML es solo texto sin comportamiento.

## Por qué importa

Cuesta descargar y ejecutar JavaScript, así que hidratar toda una página grande es caro. Reducir qué se hidrata y cuándo es la clave del rendimiento en sitios de lectura.

## Ejemplo

En Astro, una directiva `client:*` decide cuándo se hidrata una isla:

```astro
<InterruptorTema client:load />
```

## Se confunde con

Con el renderizado en el cliente. La hidratación **reutiliza** el HTML ya existente; una SPA pura, en cambio, suele crear el DOM desde cero en el navegador.
