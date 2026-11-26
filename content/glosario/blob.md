---
titulo: "Blob"
resumen: "Objeto binario grande: una secuencia de bytes tratada como una unidad opaca."
categoria: datos-api
tags: ["frontend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Objeto binario grande: una secuencia de bytes tratada como una unidad opaca.

## Por qué importa

Es la forma estándar de manejar imágenes, PDFs o cualquier contenido que no es texto sin convertirlo a cadena.

## Ejemplo

```js
const blob = new Blob(['hola'], { type: 'text/plain' });
```

## Se confunde con

No es un objeto de dominio: un blob no interpreta su contenido, solo lo transporta.
