---
titulo: "DOMPurify"
resumen: "Biblioteca que limpia HTML no confiable eliminando scripts y atributos peligrosos."
categoria: herramienta
tags: ["seguridad","frontend"]
alias: []
relacionados: []
fuentes: ["https://github.com/cure53/DOMPurify"]
autoenlace: true
alternativas: []
web: "https://github.com/cure53/DOMPurify"
npm: "dompurify"
---
## Qué es

Biblioteca que limpia HTML no confiable eliminando scripts y atributos peligrosos.

## Para qué sirve

Reduce el riesgo de XSS cuando hay que mostrar HTML que viene del usuario.

## Cuándo usarlo

Úsalo justo antes de insertar HTML externo en el DOM.

## Cuándo no

No sustituye a escapar por defecto: la mejor defensa es no insertar HTML cuando no haga falta.

## Alternativas

No hay una alternativa directa dentro del catálogo: la decisión depende del requisito concreto.

## Ejemplo

```js
const limpio = DOMPurify.sanitize(htmlDelUsuario);
```
