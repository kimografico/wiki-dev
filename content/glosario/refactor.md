---
titulo: "Refactor"
resumen: "Cambio en la estructura interna del código que no altera su comportamiento observable."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: [code-review, tdd, deuda-tecnica, regresion]
fuentes: []
autoenlace: true
---

## Definición

Refactorizar es reestructurar código sin cambiar su comportamiento observable: se renombra, se extrae una función o se simplifica una condición, pero las mismas entradas siguen produciendo las mismas salidas.

## Por qué importa

Mantiene bajo el coste de cambio. Una función larga que mezcla validación y formato es difícil de corregir; dividirla permite tocar una parte sin alterar la otra. Los tests actúan como red: si siguen pasando, hay evidencia de que el comportamiento se conservó; sin ellos, «parece igual» no es comprobable. Conviene separar el refactor de los cambios funcionales en commits distintos: un diff que mezcla movimientos de código y cambios de lógica es mucho más difícil de juzgar, mientras que uno que solo mueve código permite centrar la revisión en la forma.

## Ejemplo

```js
const esValido = (valor) => valor != null && valor.length > 0;

if (esValido(nombre)) {
  guardar(nombre);
}
```

## Se confunde con

Con un bugfix: corregir un error cambia el comportamiento, porque el fallo deja de ocurrir; refactorizar busca que no cambie nada visible. Tampoco es reescribir el sistema desde cero: es un cambio incremental y verificable, no una migración completa.
