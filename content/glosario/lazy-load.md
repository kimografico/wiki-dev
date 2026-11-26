---
titulo: "Lazy load"
resumen: "Carga diferida de recursos solo cuando se acercan a la vista o se necesitan."
categoria: rendimiento-ux
tags: ["frontend","rendimiento"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Carga diferida de recursos solo cuando se acercan a la vista o se necesitan.

## Por qué importa

Reduce transferencia inicial y mejora la percepción de velocidad en páginas largas.

## Ejemplo

```html
<img src="grafico.png" loading="lazy" />
```

## Se confunde con

No es code splitting: cargar imágenes tardíamente no divide el JavaScript.
