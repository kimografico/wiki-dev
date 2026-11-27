---
titulo: "Optional chaining"
resumen: "Operador `?.` que lee propiedades anidadas sin lanzar error si algún eslabón es nulo o indefinido."
categoria: lenguaje
tags: ["frontend"]
alias: []
relacionados: [operadores, fallback, api, tipos]
fuentes: []
autoenlace: true
---
## Definición

Optional chaining es el operador `?.`: lee una propiedad anidada sin lanzar error si algún eslabón de la cadena es `null` o `undefined`. En ese caso, toda la expresión se evalúa como `undefined`. Se coloca antes de cada acceso que pueda faltar: `usuario?.direccion?.ciudad`.

## Por qué importa

Las respuestas de una API suelen ser parciales: un usuario sin dirección, un campo que aún no existe. Sin `?.` haría falta una comprobación por nivel, y olvidar una de ellas provoca un `TypeError` que rompe el renderizado. El operador reduce ese ruido y deja visible la estructura esperada. Conviene usarlo donde la ausencia es normal, no para silenciar datos incorrectos.

## Ejemplo

```js
const ciudad = usuario?.direccion?.ciudad ?? "Desconocida";
const primerPedido = usuario?.pedidos?.[0]?.id;
const avisar = usuario?.contacto?.email?.(asunto);
```

La primera línea combina `?.` con `??`; la tercera solo llama si la función existe.

## Se confunde con

- **Valor por defecto**: `?.` evita el error; `??` elige el valor alternativo. Uno solo no hace lo que hace el otro.
- **Parámetro opcional**: `function f(x = 1)` da un valor inicial al argumento, no protege accesos.
- **Comparación con `&&`**: `usuario && usuario.ciudad` funciona, pero `?.` cubre también índices y llamadas.

Matiz: `?.` corta solo esa cadena, no el resto de la función. Si el valor ausente era inesperado, conviene validarlo antes en lugar de ocultarlo.
