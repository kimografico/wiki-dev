---
titulo: "JavaScript"
resumen: "Lenguaje interpretado o compilado JIT, base del navegador y también usado en servidor con runtimes como Node.js."
categoria: lenguaje
tags: ["nivel-0", "frontend", "backend"]
alias: [JS]
relacionados: [java, typescript, nodejs, dom, event-loop, asincronia, tipos]
alternativas: []
web: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
fuentes:
  - "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
  - "https://developer.mozilla.org/en-US/docs/Glossary/JavaScript"
  - "https://developer.mozilla.org/en-US/docs/Glossary/Dynamic_typing"
  - "https://developer.mozilla.org/en-US/docs/Glossary/Prototype-based_programming"
  - "https://developer.mozilla.org/en-US/docs/Glossary/ECMAScript"
  - "https://ecma-international.org/publications-and-standards/standards/ecma-262/"
  - "https://nodejs.org/en/about/"
  - "https://www.typescriptlang.org/"
  - "https://developer.mozilla.org/en-US/docs/Glossary/TypeScript"
autoenlace: true
---

## Qué es

JavaScript es un lenguaje ligero, interpretado o compilado justo a tiempo, con funciones de primera clase. Es tecnología central de la web junto a HTML y CSS, y se ejecuta tanto en el navegador como en servidores mediante runtimes como Node.js. Su especificación es ECMAScript, documentada en ECMA-262. Es de tipado dinámico —el tipo se asigna en tiempo de ejecución según el valor— y se basa en prototipos: la reutilización parte de objetos existentes, no de clases declaradas. JavaScript no es «Java interpretado»: MDN lo niega expresamente y Java es otro lenguaje, compilado a bytecode para JVM.

## Para qué sirve

En el navegador da vida a la página: responde a eventos, manipula el DOM y actualiza la interfaz sin recargar. Fuera del navegador permite construir aplicaciones de red con Node.js, un runtime asíncrono y orientado a eventos. TypeScript añade comprobación estática sobre JavaScript y se compila de vuelta a JavaScript, así que todo lo que funciona en JS sigue siendo válido.

## Cuándo usarla

Cuando el trabajo ocurre en el navegador: es el lenguaje que entiende. También en servidor si interesa compartir código con el frontend o aprovechar un runtime asíncrono. Para proyectos grandes que vayan a tocar varias personas, conviene escribirla con tipos mediante TypeScript.

## Cuándo no

No es la opción cuando se necesita comprobación de tipos antes de ejecutar: para eso está TypeScript, que la añade sin abandonar el ecosistema. Tampoco conviene elegirla por su nombre: Java y JavaScript son lenguajes distintos con compilación y modelo de tipos diferentes. Y no es la herramienta para todo: un script de automatización pequeño puede resolverse con un lenguaje de terminal simple.

## Ejemplo

```js
const boton = document.querySelector("#guardar");
boton.addEventListener("click", () => {
  console.log("Guardado");
});
```

`querySelector` devuelve un elemento del DOM y `addEventListener` asocia una función al evento; la función se ejecuta cada vez que se pulsa el botón.
