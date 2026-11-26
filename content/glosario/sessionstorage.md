---
titulo: "SessionStorage"
resumen: "Almacenamiento del navegador que conserva datos mientras la pestaña siga abierta."
categoria: concepto
tags: ["frontend","seguridad"]
alias: ["sessionStorage"]
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Almacenamiento del navegador que conserva datos mientras la pestaña siga abierta.

## Por qué importa

Útil para estados temporales que no deben persistir al cerrar la pestaña.

## Ejemplo

```js
sessionStorage.setItem('filtro', 'backend');
```

## Se confunde con

No es localStorage: localStorage sobrevive al cierre del navegador y se comparte entre pestañas del mismo origen.
