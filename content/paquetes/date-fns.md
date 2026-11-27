---
titulo: "date-fns"
resumen: "Biblioteca de fechas modular con funciones puras e inmutables, importadas una a una para reducir el bundle."
categoria: herramienta
tags: ["frontend"]
alias: []
relacionados: [typescript, inmutabilidad, utilidades]
fuentes: ["https://date-fns.org/"]
autoenlace: true
alternativas: ["moment","dayjs"]
web: "https://date-fns.org/"
npm: "date-fns"
---
## Qué es

date-fns es una biblioteca de fechas formada por funciones pequeñas e independientes. Cada función hace una cosa —formatear, sumar días, comparar, calcular una diferencia— y devuelve un valor nuevo sin modificar la fecha de entrada. Se importa función por función, así que el empaquetador puede descartar las que no usas (*tree shaking*). No es un objeto global con decenas de métodos encadenables.

## Para qué sirve

Trabajar con fechas sin cargar toda la biblioteca ni mutar datos compartidos. Caso concreto: mostrar el día siguiente en formato `dd/MM/yyyy` a partir de `new Date()`; importas `format` y `addDays` y terminas. En una aplicación grande, importar solo lo necesario mantiene el paquete pequeño; en código con estado, la inmutabilidad evita que una fecha se cambie sin querer desde otra función.

## Cuándo usarlo

- Cuando vienes de Moment.js y quieres reducir peso revisando las llamadas de fechas, sin cambiar por completo la lógica ni la estructura del proyecto.
- Cuando usas unas pocas operaciones: el tree shaking hace que pagues solo por ellas.
- Cuando prefieres funciones puras y fáciles de probar antes que un objeto con estado.

## Cuándo no

- Si necesitas zonas horarias complejas o calendarios no gregorianos: mejor una biblioteca especializada o la API Temporal cuando esté disponible en tus entornos.
- Si todo tu código ya usa Day.js y la API está extendida por el equipo: migrar solo por migrar no aporta.
- Si solo formateas una fecha: `Intl.DateTimeFormat` del navegador puede bastar sin dependencias.

## Alternativas

| Biblioteca | Modelo | Cuándo conviene |
|------------|--------|-----------------|
| date-fns | Funciones puras e importación individual | Paquete pequeño y código funcional |
| Moment.js | Objeto mutable con API amplia | Código heredado que aún no se ha migrado |
| Day.js | API parecida a Moment con plugins | Migrar código antiguo casi sin cambios |

Las tres resuelven lo básico; la diferencia está en el modelo de API y en el peso. date-fns no es compatible con la sintaxis de Moment: la migración es una revisión de llamadas y de imports, no un cambio estructural. La lógica de fechas se conserva y se adapta función por función.

## Matices

El formato se escribe con tokens propios (`yyyy`, `MM`, `dd`); conviene no confundirlos con los de `strftime` o con los de Day.js. Las funciones de date-fns trabajan con `Date` nativo y devuelven `Date` nativo, lo que facilita pasarlas a otras piezas. Los locales se importan por separado, así que los nombres de meses y días traducidos también se pagan solo si se usan. Esa modularidad es la razón principal para elegirla frente a una biblioteca monolítica.

## Ejemplo

```js
import { format, addDays, differenceInCalendarDays } from "date-fns";
import { es } from "date-fns/locale";

const hoy = new Date();
const manana = addDays(hoy, 1);
format(manana, "EEEE d 'de' MMMM", { locale: es });
differenceInCalendarDays(manana, hoy); // 1
```

La fecha original no se toca: `addDays` devuelve una instancia nueva.
