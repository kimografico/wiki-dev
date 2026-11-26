---
titulo: "ARIA"
resumen: "Conjunto de atributos de Accessible Rich Internet Applications que describen estado, rol y relaciones de elementos que el HTML nativo no expresa."
categoria: concepto
tags: ["accesibilidad"]
alias: []
relacionados: []
fuentes: ["https://www.w3.org/WAI/ARIA/apg/"]
autoenlace: true
---
## Definición

Conjunto de atributos de Accessible Rich Internet Applications que describen estado, rol y relaciones de elementos que el HTML nativo no expresa.

## Por qué importa

Sin estos atributos, un componente interactivo hecho con divs puede resultar invisible o incomprensible para un lector de pantalla.

## Ejemplo

Un botón personalizado necesita `role="button"`, `aria-pressed` y gestión del foco para anunciarse correctamente.

## Se confunde con

No sustituye al HTML semántico: un `<button>` nativo siempre es mejor que un div con ARIA añadido.
