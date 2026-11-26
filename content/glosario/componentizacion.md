---
titulo: "Componentización"
resumen: "Práctica de dividir la interfaz en piezas autónomas con responsabilidad y límites claros."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Práctica de dividir la interfaz en piezas autónomas con responsabilidad y límites claros.

## Por qué importa

Define dónde vive el estado y qué se reutiliza; una mala división genera prop drilling y componentes imposible de testear.

## Ejemplo

Extraer un `Buscador` reutilizable con sus props en lugar de repetir el formulario en tres páginas.

## Se confunde con

No es simple división de archivos: un componente tiene contrato, estado y ciclo de vida propios.
