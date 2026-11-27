---
titulo: "Deuda técnica"
resumen: "Coste futuro que se asume al elegir una solución rápida o desactualizada en lugar de una más sólida."
categoria: concepto
tags: ["terminal"]
alias: []
relacionados: [refactor, bugfix, code-review, hotfix]
fuentes: []
autoenlace: true
---

## Definición

Deuda técnica es el coste futuro que se asume al elegir una solución rápida o desactualizada en lugar de una más sólida. Puede ser código duplicado, una dependencia sin actualizar, una prueba ausente o una decisión de arquitectura que ya no encaja. Lo característico es que la solución funciona hoy.

## Por qué importa

Hacerla visible permite decidir: no toda deuda se paga, pero conviene conocerla para priorizarla frente a nuevas funcionalidades. Un atajo que ahorra una tarde puede multiplicar el coste de cada cambio posterior si se copió en cinco sitios. Ignorarla durante mucho tiempo termina convirtiendo cambios pequeños en migraciones arriesgadas.

## Ejemplo

Copiar la validación de un formulario en cinco componentes sale más rápido que extraerla a una función. Semanas después, añadir una regla exige tocar cinco archivos y comprobar cinco variantes. Extraerla ahora es una refactorización con un coste único.

## Se confunde con

Con un bug. El bug falla en el presente y se corrige con un bugfix; la deuda técnica funciona y encarece el futuro. Tampoco es lo mismo que un hotfix: este es un parche urgente en producción que, si se hace mal, puede añadir deuda nueva.
