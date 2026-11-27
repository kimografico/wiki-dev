---
titulo: "Debug"
resumen: "Proceso de localizar y corregir la causa de un comportamiento inesperado del código."
categoria: concepto
tags: ["frontend","backend","terminal"]
alias: []
relacionados: [devtools, bugfix, source-map, code-review]
fuentes: []
autoenlace: true
---

## Definición

Depurar es localizar la causa de un comportamiento inesperado observando la ejecución real: detener el programa en un punto, inspeccionar variables, seguir la pila de llamadas y comparar lo esperado con lo ocurrido. El objetivo es la causa, no el síntoma visible en pantalla.

## Por qué importa

Añadir `console.log` por intuición funciona en casos simples, pero se queda corto cuando el fallo depende del estado o del orden de ejecución. Un breakpoint congela ese instante y permite ver el valor exacto de cada variable. Documentar el camino seguido evita repetir la misma búsqueda cuando el error reaparece semanas después.

## Ejemplo

```js
function total(carrito) {
  debugger; // el navegador se detiene aquí: inspecciona `carrito`
  return carrito.reduce((suma, item) => suma + item.precio, 0);
}
```

Con `debugger;` o un punto de ruptura en DevTools se comprueba si `precio` llega como número o como texto antes de culpar a `reduce`.

## Se confunde con

Con el paquete npm `debug`, una utilidad para emitir mensajes según el entorno; aquí se describe la práctica general. Tampoco es arreglar: identificar la causa y aplicar el `bugfix` son dos pasos distintos.
