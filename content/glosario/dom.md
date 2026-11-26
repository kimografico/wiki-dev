---
titulo: "DOM"
resumen: "Document Object Model: representación en árbol de un documento HTML que permite a JavaScript leer y modificar la página."
categoria: lenguaje
tags: ["frontend","nivel-0"]
alias: ["Document Object Model"]
relacionados: [propagacion-de-eventos, html-semantico]
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

## Leer fuerza trabajo, escribir se agrupa

Cambiar estilos no pinta de inmediato: el navegador lo programa. Pero leer una medida como `offsetWidth` obliga a calcular el layout en ese momento. Intercalar lectura y escritura en un bucle provoca recálculos repetidos:

```js
// Mal: leer y escribir en cada vuelta
for (const el of elementos) el.style.width = el.offsetWidth + 1 + "px";

// Mejor: leer todo, después escribir todo
const anchos = elementos.map((el) => el.offsetWidth);
elementos.forEach((el, i) => (el.style.width = anchos[i] + 1 + "px"));
```

Los eventos siguen su propio orden: en Propagación de eventos se explica por qué un clic puede llegar a varios nodos.
