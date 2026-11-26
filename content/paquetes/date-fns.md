---
titulo: "date-fns"
resumen: "Biblioteca de fechas modular con funciones puras e inmutables importadas una a una."
categoria: herramienta
tags: ["frontend"]
alias: []
relacionados: []
fuentes: ["https://date-fns.org/"]
autoenlace: true
alternativas: ["moment","dayjs"]
web: "https://date-fns.org/"
npm: "date-fns"
---
## Qué es

Biblioteca de fechas modular con funciones puras e inmutables importadas una a una.

## Para qué sirve

Permite formatear, sumar y comparar fechas sin cargar toda la librería ni mutar el objeto original.

## Cuándo usarlo

Úsala cuando quieres reemplazar Moment.js con funciones pequeñas y tree-shakeables.

## Cuándo no

No es un reloj ni una API de zonas horarias completa; para casos complejos valora Temporal o Luxon.

## Alternativas

Las alternativas directas son `moment`, `dayjs`. Conviene compararlas antes de elegir.

## Ejemplo

```js
import { format, addDays } from 'date-fns';
format(addDays(new Date(), 1), 'dd/MM/yyyy');
```
