---
titulo: Generación de sitio estático
resumen: Técnica que genera todas las páginas HTML durante el build, antes de publicar, en lugar de construirlas en cada petición.
categoria: concepto
tags: [rendimiento]
alias: [SSG, Static Site Generation]
relacionados: [astro, arquitectura-de-islas, hidratacion]
terminoEn: Static Site Generation
---

## Definición

Un sitio generado estáticamente (SSG, de *Static Site Generation*) produce su HTML en el momento del build. El visitante recibe archivos ya construidos desde un servidor de archivos, sin que ningún servidor ejecute código por petición.

## Por qué importa

Es rapidísimo y barato de alojar: no hay servidor de aplicaciones ni base de datos que mantener, y el contenido es cacheable por defecto. Además, los errores (datos inválidos, enlaces rotos) se detectan en el build y no en producción.

## Ejemplo

```bash
npm run build   # genera dist/ con todo el HTML
```

El resultado de `dist/` se puede servir desde cualquier hosting de archivos, como GitHub Pages.

## Se confunde con

Con una aplicación renderizada en el servidor (SSR) o en el cliente (SPA). El SSG pregenera **todo** en el build; SSR genera en cada petición y SPA construye en el navegador.
