---
titulo: "JSX"
resumen: "Extensión sintáctica de JavaScript que permite escribir etiquetas parecidas a HTML dentro del código y evaluar expresiones en ellas."
categoria: lenguaje
tags: ["frontend"]
alias: []
relacionados: [react, dom, html-semantico, virtual-dom]
fuentes: []
autoenlace: true
---
## Definición

JSX es una extensión sintáctica de JavaScript que permite escribir etiquetas parecidas a HTML dentro del código. No es HTML ni una plantilla de texto: el compilador las transforma en llamadas que crean elementos, con lo que las expresiones entre llaves se evalúan al ejecutarse. En React los atributos tienen convenciones propias, como `className` para la clase CSS, porque el resultado es código JavaScript, no un documento escrito a mano.

## Por qué importa

Mantiene la estructura de la interfaz junto a la lógica que decide qué mostrar. Un caso concreto: una lista que cambia según el estado se expresa con `map` dentro de las llaves, sin concatenar cadenas ni manipular el DOM a mano. El compilador avisa de etiquetas sin cerrar y de expresiones mal formadas antes de que lleguen al navegador, que no entiende JSX directamente.

## Ejemplo

```jsx
function Saludo({ nombre, activo }) {
  return <p className={activo ? "activo" : ""}>Hola, {nombre}</p>;
}
```

`{nombre}` inserta el valor de la prop y la expresión condicional decide la clase.

## Se confunde con

Con HTML: las etiquetas se parecen, pero aquí se compilan y admiten JavaScript. Con una plantilla de cadena: asignar texto a `innerHTML` fuerza al navegador a analizarlo; JSX construye elementos. Con Virtual DOM: es la representación en memoria que React compara para actualizar la interfaz, no la sintaxis con que se escribe.
