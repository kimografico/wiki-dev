---
titulo: "Snapshot"
resumen: "Test que guarda una representación serializada del resultado y la compara en ejecuciones posteriores."
categoria: concepto
tags: ["tests"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
alternativas: []
---
## Qué es

Test que guarda una representación serializada del resultado y la compara en ejecuciones posteriores.

## Para qué sirve

Detecta cambios inesperados de forma en componentes o estructuras grandes.

## Tipos de prueba

Render de un componente o salida de un generador de Markdown.

## Ejemplo

```ts
expect(generar(entrada)).toMatchSnapshot();
```

## Alternativas

No hay una alternativa directa dentro del catálogo: la decisión depende del requisito concreto.
