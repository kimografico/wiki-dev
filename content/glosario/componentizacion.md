---
titulo: "Componentización"
resumen: "Práctica de dividir la interfaz en piezas autónomas con responsabilidad y límites claros."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: [ciclo-de-vida, gestion-de-estado, slot, html-semantico]
fuentes: []
autoenlace: true
---
## Definición

La componentización es la práctica de dividir la interfaz en piezas autónomas con una responsabilidad y unos límites claros. Cada componente declara qué datos recibe, qué estado mantiene y qué parte del DOM produce. Es una forma de organizar la vista, no una tecnología concreta: existe en React, en Astro y en Lit con nombres distintos.

## Por qué importa

Define dónde vive el estado y qué se reutiliza. Una división acertada permite cambiar el buscador de una página sin tocar el layout; una división equivocada reparte la misma lógica entre seis archivos y obliga a pasar propiedades por varios niveles. También afecta a las pruebas: un componente con una sola responsabilidad se prueba con menos montaje y menos dependencias.

## Ejemplo

```jsx
function Buscador({ onBuscar }) {
  return <input onChange={(e) => onBuscar(e.target.value)} />;
}
```

Extraer `Buscador` evita repetir el formulario en tres páginas.

## Se confunde con

Con separar archivos: partir un archivo grande en dos no crea un componente si no hay contrato ni responsabilidad propia. Tampoco es componer funciones: aquí la unidad incluye vista, estado y ciclo de vida, aunque no siempre los tres a la vez.
