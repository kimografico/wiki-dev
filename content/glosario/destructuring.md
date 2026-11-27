---
titulo: "Destructuring"
resumen: "Sintaxis que extrae valores de arrays u objetos y los asigna directamente a variables."
categoria: lenguaje
tags: ["frontend"]
alias: []
relacionados: [spread-rest, array, operadores, optional-chaining]
fuentes: []
autoenlace: true
---

## Definición

El destructuring es una sintaxis que extrae valores de arrays u objetos y los asigna directamente a variables nuevas. En objetos se nombra la propiedad; en arrays se sigue la posición. Permite además definir valores por defecto y recoger el resto en otra variable.

## Por qué importa

Hace explícito qué partes de una estructura se usan. En una respuesta con veinte campos, declarar solo `nombre` y `correo` documenta la dependencia real y reduce el acoplamiento con el resto del objeto. Anidado, evita repetir cadenas largas del tipo `persona.direccion.ciudad`.

## Ejemplo

```js
const { nombre, correo, activo = true } = persona;
const [primero, ...resto] = lista;
```

`activo` toma `true` si la propiedad no existe. `...resto` recoge los elementos restantes del array en uno nuevo; sobre un objeto haría lo mismo con las propiedades no extraídas.

## Se confunde con

Con spread. Destructuring abre una estructura para sacar piezas; spread introduce esas piezas en otra (`{ ...persona }`). Se escriben parecido —los tres puntos— pero apuntan en direcciones opuestas. Tampoco es optional chaining: `persona?.correo` protege el acceso cuando `persona` es nulo, algo que el destructuring directo no hace.
