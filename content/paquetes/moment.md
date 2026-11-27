---
titulo: "Moment.js"
resumen: "Biblioteca de fechas muy completa y mutable, presente en código heredado: cómo reconocer su API y decidir la salida."
categoria: herramienta
tags: ["frontend"]
alias: []
relacionados: ["date-fns", "dayjs", "inmutabilidad"]
fuentes: ["https://momentjs.com/"]
autoenlace: true
alternativas: ["date-fns", "dayjs"]
web: "https://momentjs.com/"
npm: "moment"
---

## Qué es

Moment.js es una biblioteca de fechas que representa cada fecha en un objeto `moment` y ofrece una API muy amplia: sumar días, comparar, formatear, analizar cadenas y trabajar con zonas horarias. El objeto se modifica al encadenar métodos, por lo que `add` cambia la instancia original. Esa mutabilidad es la diferencia con las utilidades funcionales y la causa más habitual de errores cuando se copia código antiguo. Su propio sitio lo presenta como proyecto en modo mantenimiento: conviene leerlo como una pieza del pasado, no como la base de un módulo nuevo.

## Para qué sirve

Sirve para reconocer y mantener código heredado. Un `moment(...)` al que se le llama `.format('YYYY-MM-DD')` aparece en formularios, informes y ficheros de datos; entender que `format` solo produce texto y que `add` muta permite corregir un bucle que suma días repetidos. También ayuda a acotar una migración: se buscan las llamadas a la API, se clasifican las que solo formatean y se sustituyen por pasos más pequeños.

## Cuándo usarlo

Se mantiene mientras se planea la salida o cuando una dependencia antigua lo exige y el coste de tocarla supera el beneficio. En mantenimiento, conviene agrupar su uso en un único módulo de fechas: así la sustitución futura no obliga a revisar toda la aplicación.

## Cuándo no

No conviene elegirlo para código nuevo. Su tamaño y su modelo mutable complican las pruebas, y muchas operaciones que antes requerían una librería entera se resuelven con utilidades pequeñas o con la API nativa. Tampoco es la herramienta adecuada si el equipo quiere que una fecha pase por una validación estricta antes de entrar en el dominio.

## Alternativas

date-fns ofrece funciones independientes e inmutables: encaja cuando se quiere importar solo lo necesario. Day.js conserva una API muy parecida a Moment.js y resulta cómoda cuando el código existente encadena llamadas. La decisión depende del peso de la migración: si predominan las cadenas de métodos, Day.js reduce el cambio; si predominan formatos concretos, date-fns deja un código más explícito.

## Ejemplo

```js
import moment from "moment";

const fecha = moment();
const copia = fecha.clone().add(1, "day"); // clone evita mutar fecha

console.log(fecha.format("YYYY-MM-DD"));
console.log(copia.format("YYYY-MM-DD"));
```

## Matices

`clone` es la defensa mínima mientras no se complete la migración: sin él, la fecha original cambia y el error aparece lejos de la llamada. Al extraer el módulo de fechas, conviene devolver siempre valores nuevos para que la API propia ya tenga el comportamiento que se espera de las alternativas.
