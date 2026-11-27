---
titulo: "Virtual DOM"
resumen: "Árbol de objetos en memoria que se compara con el anterior para aplicar solo los cambios necesarios al DOM real."
categoria: concepto
tags: ["frontend","rendimiento"]
alias: []
relacionados: [dom, react, hidratacion, ssr, componentizacion]
fuentes: []
autoenlace: true
---
## Definición

El Virtual DOM es una representación ligera del **DOM** en memoria: un árbol de objetos con etiquetas, atributos e hijos que el framework construye cuando cambia el estado. No pinta nada: el framework genera el árbol, lo compara con el anterior (*diffing*) y traduce las diferencias al documento. Es una técnica interna, no una API del navegador.

## Por qué importa

Explica por qué en **React** no se manipulan nodos a mano. Una tabla de cien filas en la que cambia una celda no se vuelve a dibujar entera: se ajusta el texto de esa celda. El ahorro no es automático: si cada render crea miles de objetos, compararlos cuesta. Importan los componentes pequeños y las claves estables; la técnica no sustituye al diseño.

## Ejemplo

```js
function vista(visible) {
  return { type: "p", children: [visible ? "Hola" : ""] };
}
```

Al pasar `visible` a `false`, el diff detecta el cambio de texto y el navegador actualiza solo ese nodo.

## Se confunde con

Con el DOM real: el navegador nunca ve el árbol intermedio, únicamente las mutaciones finales. Tampoco es garantía de velocidad frente a **SSR** o a la generación estática, que evitan hacer trabajo en el cliente. No es exclusivo de React: varios frameworks usan la misma idea con nombres distintos. Y no debe confundirse con la **Hidratación**, que es el paso de adjuntar manejadores a un HTML ya existente.
