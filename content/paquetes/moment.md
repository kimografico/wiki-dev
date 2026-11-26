---
titulo: "Moment.js"
resumen: "Biblioteca clásica de fechas con API muy completa que hoy se considera en mantenimiento."
categoria: herramienta
tags: ["frontend"]
alias: []
relacionados: []
fuentes: ["https://momentjs.com/"]
autoenlace: true
alternativas: ["date-fns","dayjs"]
web: "https://momentjs.com/"
npm: "moment"
---
## Qué es

Biblioteca clásica de fechas con API muy completa que hoy se considera en mantenimiento.

## Para qué sirve

Aparece en mucho código heredado; reconocer su API permite migrarlo con criterio.

## Cuándo usarlo

Mantenlo solo mientras se planea la salida; para código nuevo elige date-fns o Day.js.

## Cuándo no

No es la opción recomendada para proyectos nuevos: su tamaño y mutabilidad son conocidos; valora también Temporal y luxon.

## Alternativas

Las alternativas directas son `date-fns`, `dayjs`. Conviene compararlas antes de elegir.

## Ejemplo

```js
moment().add(1, 'day').format('YYYY-MM-DD');
```
