---
titulo: "Módulos"
resumen: "Unidades de código con importaciones y exportaciones explícitas que delimitan responsabilidades y ámbitos privados."
categoria: lenguaje
tags: ["nivel-0"]
alias: []
relacionados: [scope, tree-shaking, dependencia, lit]
fuentes: []
autoenlace: true
---
## Definición

Un módulo es una unidad de código con una interfaz explícita: declara qué exporta y qué importa de otros. Esa frontera define también su ámbito: lo que no se exporta queda privado y no puede consultarse desde fuera. El módulo no es solo un archivo; es un contrato sobre qué nombres se comparten y cuáles son internos.

## Por qué importa

Permite razonar sobre una parte del programa sin leerlo entero. Si un módulo solo exporta dos funciones, cualquier cambio interno que mantenga esas firmas es seguro para sus consumidores. Además, el análisis estático ve qué se usa y descarta el resto, lo que hace posible el tree shaking. Los tests también se aíslan: se prueba la interfaz pública sin arrastrar la aplicación completa.

## Ejemplo

```js
// escala.js
const MULTIPLICADOR = 2;
export const duplicar = (n) => n * MULTIPLICADOR;

// pedido.js
import { duplicar } from "./escala.js";
```

`MULTIPLICADOR` no se exporta: cambiarlo no afecta a nadie fuera del módulo.

## Se confunde con

- **CommonJS**: `require`/`module.exports` es otro sistema de módulos, no la ausencia de módulos.
- **NgModules de Angular**: agrupan componentes y servicios; son una capa superior sobre los módulos ES.
- **Paquete**: distribuye varios módulos con nombre y versión.

Lit usa módulos ES nativos y no añade un concepto propio de módulo como Angular.
