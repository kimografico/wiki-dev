---
titulo: "Proxy"
resumen: "Intermediario que recibe peticiones del cliente y las reenvía a otro servidor; puede inspeccionarlas, reescribirlas o cachearlas."
categoria: datos-api
tags: ["backend"]
alias: []
relacionados: [api, middleware, cors, servidor, cache]
fuentes:
  - "https://vite.dev/config/server-options.html#server-proxy"
autoenlace: true
---

## Definición

Un proxy es un intermediario que recibe peticiones de un cliente y las reenvía a otro servidor. Puede limitarse a transmitirlas o intervenir: cambiar cabeceras, reescribir rutas, cachear respuestas. Se sitúa **delante** del destino: el cliente habla con él y no necesita conocer la máquina final.

## Por qué importa

En desarrollo, un proxy local permite pedir `/api` al mismo origen que sirve la página aunque los datos estén en otro puerto; así se evita un problema de CORS sin publicar nada. En producción, el mismo patrón sirve para ocultar la dirección interna de un servicio, terminar TLS o repartir carga. Un proxy que solo reenvía no arregla por sí solo una API mal diseñada: conviene decidir qué se inspecciona y qué se deja pasar.

## Ejemplo

```js
// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  server: { proxy: { "/api": "http://localhost:8080" } },
});
```

Con esta configuración, `fetch("/api/usuarios")` llega al backend en el puerto 8080, pero el navegador ve una petición al mismo origen.

## Se confunde con

Con un middleware: este se ejecuta **dentro** del proceso de una aplicación y decide sobre peticiones que ya le llegan; el proxy puede estar fuera, delante de varias aplicaciones. Tampoco es un equilibrador de carga puro: repartir carga es una de sus funciones posibles, no su definición.
