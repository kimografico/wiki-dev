---
titulo: "Hook"
resumen: "Punto de extensión que permite insertar código propio en un momento determinado de otro sistema."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: [webhook, react]
fuentes: ["https://react.dev/reference/react/hooks"]
autoenlace: true
---
## Definición

Punto de extensión que permite insertar código propio en un momento determinado de otro sistema.

## Por qué importa

Evita modificar el núcleo de una herramienta para añadir comportamiento en un momento concreto.

## Ejemplo

Un hook de React como `useState`, un hook de git como `pre-commit` o un webhook HTTP.

## Se confunde con

Un hook es local al sistema que lo ofrece; un webhook es una llamada HTTP que otro servidor hace hacia el tuyo.

## Los hooks de React

En React un hook es una función que empieza por `use` y engancha el componente al estado o al ciclo de vida. Se llama en el nivel superior del componente u otro hook, nunca dentro de un `if`, un bucle ni un callback: React depende de que el orden sea el mismo en cada render.

Un *custom hook* no es otra categoría: es una función propia que empieza por `use` y llama a hooks dentro. Así se extrae lógica con estado reutilizable sin añadir un componente extra.
