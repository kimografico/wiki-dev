---
titulo: "DOM"
resumen: "Document Object Model: representación en árbol de un documento HTML que permite a JavaScript leer y modificar la página."
categoria: lenguaje
tags: ["frontend","nivel-0"]
alias: ["Document Object Model"]
relacionados: []
fuentes: ["https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model"]
autoenlace: true
---
## Definición

Document Object Model: representación en árbol de un documento HTML que permite a JavaScript leer y modificar la página.

## Por qué importa

Casi toda interacción de interfaz termina manipulando este árbol o reaccionando a sus eventos.

## Ejemplo

```js
document.querySelector('#titulo').textContent = 'Listo';
```

## Se confunde con

No es el HTML: el HTML es el texto que llega; el DOM es el árbol vivo que crea el navegador al interpretarlo.
