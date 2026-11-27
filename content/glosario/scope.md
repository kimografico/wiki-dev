---
titulo: "Scope"
resumen: "Ámbito léxico que determina desde dónde es visible una variable o declaración."
categoria: lenguaje
tags: ["frontend"]
alias: ["ámbito"]
relacionados: [closure, hoisting, funcion, modulos]
fuentes: []
autoenlace: true
---

## Definición

El scope, o ámbito, es la zona del programa en la que una declaración es visible. JavaScript usa ámbito léxico: se decide por dónde se escribe el código, no por quién lo llama. Un `let` declarado dentro de una función existe en esa función y en sus bloques internos, pero no fuera.

## Por qué importa

Explica errores habituales de «variable no definida» y valores inesperados. Un bucle con `let` crea una ligadura por iteración; con `var`, la variable es compartida. Saber dónde vive cada nombre permite extraer código a otra función sin romper referencias ni crear variables globales accidentales. Dos funciones pueden usar el mismo nombre de variable sin colisionar porque cada una tiene su propio ámbito.

## Ejemplo

```js
let fuera = 1;
function f() {
  const dentro = 2;
  return fuera + dentro;
}
// dentro no existe aquí: solo vive en f
```

## Se confunde con

Con closure: el scope es el lugar donde se declara el dato; el closure es la función que sigue accediendo a ese lugar después de que la declaración terminó. Tampoco es el contexto de `this`: `this` se resuelve en la llamada, mientras que las variables siguen el ámbito léxico.
