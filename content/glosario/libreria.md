---
titulo: "Librería"
resumen: "Conjunto reutilizable de funciones que se importa desde un proyecto para resolver un problema concreto."
categoria: concepto
tags: ["nivel-0"]
alias: []
relacionados: [paquete, dependencia, utilidades, date-fns]
fuentes: []
autoenlace: true
---

## Definición

Una librería es código ya escrito —funciones, clases y utilidades— que se importa en un proyecto para resolver un problema concreto. No tiene ciclo de vida propio: espera a que tu código la llame. Es un concepto distinto de Paquete, que es la forma de distribuirla.

## Por qué importa

En vez de escribir y mantener tu propio analizador de fechas, importas date-fns y te ahorras casos borde difíciles. El precio es una Dependencia: si cambia una firma, tu código se rompe; si crece de tamaño, tu bundle crece. Conviene elegir librerías pequeñas, con mantenimiento activo, y revisar qué parte se usa realmente antes de añadirla.

## Ejemplo

```js
import { format } from "date-fns";

format(new Date(2020, 0, 5), "dd/MM/yyyy"); // "05/01/2020"
```

## Se confunde con

Con un framework. La diferencia es quién controla: tu código llama a la librería; un framework como React llama a tu código y decide cuándo renderizar. También se confunde con Utilidades: las utilidades suelen ser funciones propias del proyecto; la librería viene de fuera. Y con Paquete: toda librería publicada en npm es un paquete, pero no todo paquete es una librería, porque muchos son herramientas de terminal.
