---
fecha: 2026-10-13
titulo: Diseño responsive
resumen: Enfoque de maquetación que adapta la interfaz al tamaño de pantalla, de móvil hacia arriba, sin scroll horizontal.
categoria: concepto
tags: [frontend, rendimiento]
alias: [responsive]
relacionados: [accesibilidad-web, wcag, core-web-vitals, html-semantico]
terminoEn: Responsive web design
---

## Definición

El diseño *responsive* hace que una misma página se refluya según el ancho disponible: móvil, tableta o escritorio. Se apoya en un `viewport` correcto, medidas flexibles y puntos de ruptura, y evita anchos fijos que obliguen al scroll horizontal.

## Por qué importa

La mayoría de lecturas empiezan en el móvil. Una tabla ancha o un menú con `width: 800px` obliga a hacer zoom y desplazarse de lado; una columna con `max-width: 68ch` se lee sin ese esfuerzo. El diseño fluido también evita duplicidad: no hay que mantener dos plantillas distintas para pantallas pequeñas y grandes. Conviene probar con zoom alto, no solo cambiando el ancho de la ventana: a 320 px aparecen desbordamientos que un móvil moderno no muestra.

## Ejemplo

```css
/* Columna de lectura que se estrecha en pantallas pequeñas */
.prose { max-width: 68ch; }

@media (max-width: 40rem) {
  .grid { grid-template-columns: 1fr; }
}
```

## Se confunde con

Con diseñar solo «para móvil». El responsive no es una versión aparte: es la misma página que se refluye. Tampoco es accesibilidad: un layout adaptable puede seguir teniendo botones pequeños o poco contraste; por eso se revisa también con WCAG.
