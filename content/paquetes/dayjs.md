---
titulo: "Day.js"
resumen: "Biblioteca ligera de fechas con API parecida a Moment.js y capacidades adicionales mediante plugins."
categoria: herramienta
tags: ["frontend"]
alias: []
relacionados: [typescript, inmutabilidad, utilidades]
fuentes: ["https://day.js.org/"]
autoenlace: true
alternativas: ["moment","date-fns"]
web: "https://day.js.org/"
npm: "dayjs"
---
## Qué es

Day.js es una biblioteca de fechas ligera que expone una API casi idéntica a Moment.js. Envuelve una fecha nativa en un objeto inmutable: las operaciones devuelven un objeto nuevo en vez de modificar el original. El núcleo cubre lo habitual y el resto de capacidades se añaden con plugins que se importan cuando se necesitan.

## Para qué sirve

Migrar código que ya usa Moment.js con muy pocos cambios. Caso concreto: un proyecto con cientos de llamadas a `format`; cambias el import y gran parte del código sigue funcionando. El objetivo es reducir el tamaño de la dependencia sin abrir una refactorización grande. También sirve para proyectos nuevos que quieren una API de fechas corta y legible.

## Cuándo usarlo

- Cuando el peso del paquete importa y la API de Moment ya está extendida por el equipo.
- Cuando quieres una curva de aprendizaje corta: si sabes Moment, ya sabes Day.js casi todo.
- Cuando necesitas una extensión concreta y puedes importar solo el plugin correspondiente.

## Cuándo no

- Si estás empezando un proyecto desde cero y no tienes código heredado: date-fns ofrece un modelo de funciones puras más directo.
- Si necesitas muchas capacidades avanzadas: cada plugin añade peso y la suma puede acercarse al tamaño de la biblioteca que querías evitar.
- Si solo necesitas formatear: `Intl.DateTimeFormat` ya viene en el entorno.

## Alternativas

| Criterio | Day.js | Moment.js | date-fns |
|----------|--------|-----------|----------|
| API | Casi la de Moment, muy corta | Amplia y mutable | Funciones puras |
| Extensión | Plugins | Incluida en el núcleo | Funciones independientes |
| Mejor momento | Salir de Moment | Código heredado | Diseñar desde cero |

Day.js gana cuando la prioridad es abandonar Moment sin reescribir; date-fns gana cuando se diseña desde cero y se valora la composición de funciones. Moment.js queda como punto de comparación del código heredado, no como primera opción.

## Matices

El núcleo no incluye todas las operaciones de Moment: el análisis de formatos arbitrarios y ciertas operaciones de zona horaria viven en plugins. Conviene listar los plugins que se usan antes de calcular el ahorro de peso. Otro detalle: Day.js es inmutable, así que un `add` sin asignar el resultado no cambia la fecha original; en Moment ese patrón sí podía modificarla. Esa diferencia puede alterar el comportamiento en código migrado a ciegas.

## Ejemplo

```js
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es";

dayjs.extend(utc);
dayjs.locale("es");

const fecha = dayjs("2026-11-27").add(1, "d");
fecha.format("DD/MM/YYYY"); // "28/11/2026"
```

El plugin se registra una vez con `extend`; desde ese momento está disponible en todas las instancias.
