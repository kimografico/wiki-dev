---
titulo: "Utilidades"
resumen: "Fragmentos de código importables de forma transversal que resuelven una tarea repetida en un proyecto."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Fragmentos de código importables de forma transversal que resuelven una tarea repetida en un proyecto.

## Por qué importa

Centralizan una decisión para que todos los módulos usen la misma versión de esa lógica.

## Ejemplo

Un archivo `src/lib/formatos.ts` con `formatearFecha` importado desde varias features.

## Se confunde con

No es una biblioteca externa: las utilidades suelen vivir dentro del proyecto y no se publican.
