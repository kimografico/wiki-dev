---
titulo: "Asincronía"
resumen: "Modelo en el que una operación larga no bloquea el hilo: se continúa con otra tarea y se recibe el resultado después."
categoria: lenguaje
tags: ["frontend","backend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Modelo en el que una operación larga no bloquea el hilo: se continúa con otra tarea y se recibe el resultado después.

## Por qué importa

Explica por qué el orden de ejecución de un script no coincide con el orden en que llegan las respuestas.

## Ejemplo

```js
async function cargar() { const r = await fetch('/datos'); return r.json(); }
```

## Se confunde con

No es paralelismo: la asincronía gestiona esperas en un mismo hilo; el paralelismo ejecuta trabajo real en varios núcleos.
