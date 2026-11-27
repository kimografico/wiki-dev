---
titulo: "Operadores"
resumen: "Símbolos o palabras que aplican una operación a valores y devuelven un resultado, con reglas propias de precedencia."
categoria: lenguaje
tags: ["nivel-0"]
alias: []
relacionados: [funcion, optional-chaining, literales, tipos]
fuentes: []
autoenlace: true
---
## Definición

Un operador es un símbolo o palabra que aplica una operación a uno o varios valores y devuelve un resultado. `+`, `===`, `??` y `typeof` lo son. Se distinguen por su aridad —cuántos operandos toman— y por su precedencia, que decide el orden cuando no hay paréntesis. Son sintaxis del lenguaje, no de las librerías.

## Por qué importa

Dos expresiones casi idénticas pueden dar resultados distintos. En `a + b * c`, la multiplicación se evalúa primero; en `a ?? (b || c)`, los paréntesis son obligatorios para mezclar ambos operadores. Saber la precedencia evita depurar un valor que era el resultado correcto de una expresión mal agrupada. Escribir los paréntesis deja la intención por escrito.

## Ejemplo

```js
const a = 2, b = 3, c = 4;
const conPar = (a + b) * c;   // 20
const sinPar = a + b * c;     // 14
const texto = conPar ?? "sin valor";
```

Los dos cálculos difieren solo en los paréntesis: sin ellos la multiplicación se agrupa primero; con ellos se suma antes.

## Se confunde con

- **Función**: se llama con nombre y argumentos; el operador tiene sintaxis propia.
- **Palabra reservada**: `typeof` es operador, aunque parezca una función.
- **Método**: `a.concat(b)` es una llamada; `a + b` es una operación.

Matiz: `??` solo actúa ante `null` o `undefined`; `||` actúa ante cualquier valor falso, como `0`. Confundirlos cambia resultados sin error.
