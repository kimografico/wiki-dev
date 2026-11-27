---
titulo: "Middleware"
resumen: "Capa intermedia que intercepta una petición antes de entregarlo al manejador final de una API."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: [api, autenticacion, cors, plugin, hook]
fuentes: []
autoenlace: true
---

## Definición

Un middleware es una capa intermedia que intercepta una petición —o un mensaje— antes de entregarlo al manejador final. Puede inspeccionarlo, modificarlo, añadir cabeceras, detenerlo con una respuesta propia o llamar a `next()` para continuar la cadena.

## Por qué importa

Centraliza tareas transversales. La Autenticación, el logging, CORS o la compresión se escriben una vez y se aplican a todas las rutas, en lugar de repetirse en cada una. En una API con treinta endpoints, añadir una cabecera de seguridad en el middleware es una línea; sin él serían treinta cambios. El orden importa: quien comprime debe envolver a quien genera la respuesta, y la autenticación debe ir antes de las rutas protegidas.

## Ejemplo

```js
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
```

## Se confunde con

Con un Plugin: el plugin amplía una herramienta añadiendo una capacidad; el middleware está dentro de la cadena de ejecución de la petición y decide si esta sigue. Tampoco es un Hook: los hooks son puntos de extensión del ciclo de vida de un framework; el middleware es el propio flujo. Si no llama a `next()` ni responde, la petición se queda colgada: ese es el fallo más habitual al escribir uno.
