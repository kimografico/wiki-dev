---
titulo: "Shadow DOM"
resumen: "Árbol DOM encapsulado adjunto a un elemento: aísla sus estilos y su estructura del documento principal."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: ["dom", "lit", "slot"]
fuentes: ["https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot"]
autoenlace: true
---

## Definición

Shadow DOM es un árbol de elementos adjunto a un elemento anfitrión y mantenido aparte del documento principal. Dentro pueden vivir marcado y estilos propios: una regla CSS global no alcanza ese subárbol, y un selector definido dentro no afecta al resto de la página. Se crea con `attachShadow({ mode: "open" })` y desde fuera se consulta mediante `shadowRoot`.

## Por qué importa

Un componente que se reparte entre proyectos no puede depender de nombres de clases globales: basta que otra hoja de estilos defina `.boton` para cambiar su aspecto. Con Shadow DOM el componente lleva su CSS encapsulado y quien lo usa no necesita conocer sus clases. El caso típico es un selector de fechas incrustado en una página construida con otro framework: ni contamina ni se contamina.

## Ejemplo

```js
const raiz = document.querySelector("#reloj").attachShadow({ mode: "open" });
raiz.innerHTML = `<style>p { color: rebeccapurple; }</style><p>Hola</p>`;
```

Con `mode: "closed"`, `shadowRoot` no es accesible desde fuera. Los eventos sí burbujean hacia el documento, pero se redirigen: fuera del componente parecen venir del anfitrión.

## Se confunde con

No es un iframe: este carga otro documento, con su propia navegación; Shadow DOM es un subárbol de la misma página. Tampoco es Virtual DOM, una representación en memoria para calcular cambios. Ni estilo de ámbito (*scoped CSS*) aplicado por un bundler: aquello solo reescribe selectores.
