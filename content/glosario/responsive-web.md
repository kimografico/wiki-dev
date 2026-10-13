---
titulo: Diseño responsive
resumen: Enfoque de maquetación que adapta la interfaz al tamaño de pantalla, de móvil hacia arriba, sin scroll horizontal.
categoria: concepto
tags: [frontend, rendimiento]
alias: [responsive]
relacionados: [accesibilidad-web]
terminoEn: Responsive web design
---

## Definición

El diseño *responsive* hace que una misma página se vea bien en pantallas muy distintas: móvil, tableta y escritorio. Se apoya en un `viewport` correcto, medidas flexibles y puntos de ruptura, y no depende de tamaños fijos.

## Por qué importa

La mayoría de lecturas empiezan en el móvil. Un diseño que no se adapta obliga a hacer zoom y leer con scroll horizontal, lo que hace la página incómoda o directamente inutilizable.

## Ejemplo

```css
/* Columna de lectura que se estrecha en pantallas pequeñas */
.prose { max-width: 68ch; }
```

## Se confunde con

Con diseñar solo «para móvil». El responsive no es una versión aparte: es la misma página que se refluye. Aquí se parte de 360 px y se comprueba que a 320 px tampoco hay scroll horizontal.
