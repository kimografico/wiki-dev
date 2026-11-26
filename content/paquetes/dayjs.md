---
titulo: "Day.js"
resumen: "Biblioteca ligera de fechas con API compatible con Moment.js y sistema de plugins."
categoria: herramienta
tags: ["frontend"]
alias: []
relacionados: []
fuentes: ["https://day.js.org/"]
autoenlace: true
alternativas: ["moment","date-fns"]
web: "https://day.js.org/"
npm: "dayjs"
---
## Qué es

Biblioteca ligera de fechas con API compatible con Moment.js y sistema de plugins.

## Para qué sirve

Facilita migrar código antiguo de Moment.js casi sin cambiar llamadas.

## Cuándo usarlo

Úsalo cuando el peso del bundle importa y la API de Moment ya está extendida por el equipo.

## Cuándo no

No incluye todas las capacidades de Moment en el núcleo; algunas viven en plugins.

## Alternativas

Las alternativas directas son `moment`, `date-fns`. Conviene compararlas antes de elegir.

## Ejemplo

```js
import dayjs from 'dayjs'; dayjs().format('YYYY-MM-DD');
```
