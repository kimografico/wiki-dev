---
titulo: "Utilidades npm"
resumen: "Paraguas de paquetes pequeños y concretos que resuelven una tarea estrecha: qs, ws, nanoid, picomatch o lodash."
categoria: herramienta
tags: ["terminal"]
alias: ["utilidades npm"]
relacionados: ["npm", "paquete", "dependencia", "utilidades"]
fuentes: []
autoenlace: true
---

## Definición

"Utilidades npm" es un paraguas informal para paquetes pequeños y muy concretos: `qs` serializa y analiza cadenas de consulta, `nanoid` genera identificadores cortos, `picomatch` compara rutas con comodines, `ws` abre conexiones WebSockets y `lodash` reúne funciones auxiliares. No son una sola librería ni comparten API.

## Por qué importa

Conocerlos evita reescribir código resuelto y probado por otros. Para generar un identificador, `nanoid` sustituye un `Math.random().toString(36)` casero con riesgo de colisiones. El lado negativo es que cada paquete añade una dependencia: hay que vigilar su tamaño, sus actualizaciones y si aporta más que unas líneas propias.

## Ejemplo

```js
import { nanoid } from "nanoid";
const id = nanoid(10);
```

Antes de instalar, conviene mirar qué hace exactamente: `lodash` es amplio, pero importar una función concreta permite al bundler descartar el resto.

## Se confunde con

No es una sola librería: es una familia de paquetes independientes, con mantenimiento y versiones distintas. Tampoco es un framework, porque no impone una estructura de aplicación. Y no debe confundirse con las Utilidades a secas, que pueden ser funciones propias del proyecto sin publicarse en ningún registro.

## Matices

Una dependencia transitiva puede traer utilidades que nadie eligió directamente. Por eso un bundle grande no siempre se explica por los imports escritos a mano: revisar el árbol de dependencias ayuda a decidir qué merece quedarse y qué se puede sustituir.
