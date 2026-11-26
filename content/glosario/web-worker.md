---
titulo: "Web Worker"
resumen: "Script que se ejecuta en un hilo del navegador distinto al de la interfaz."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Script que se ejecuta en un hilo del navegador distinto al de la interfaz.

## Por qué importa

Permite mover cálculo pesado fuera del hilo principal sin congelar la página.

## Ejemplo

```js
const worker = new Worker('calculo.js');
```

## Se confunde con

No es un Cloudflare Worker: el Web Worker vive en el navegador del usuario; el de Cloudflare vive en la red.
