---
titulo: "Middleware"
resumen: "Capa intermedia que intercepta una petición o un mensaje antes de entregarlo al manejador final."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Capa intermedia que intercepta una petición o un mensaje antes de entregarlo al manejador final.

## Por qué importa

Centraliza tareas transversales como autenticación, logging o CORS sin repetirlas en cada ruta.

## Ejemplo

```js
app.use((req, res, next) => { console.log(req.url); next(); });
```

## Se confunde con

No es un plugin: el middleware se sitúa en la cadena de ejecución; el plugin amplía una herramienta.
