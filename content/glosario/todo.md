---
titulo: "TODO"
resumen: "Comentario convencional en el código que marca una tarea pendiente o una decisión pospuesta."
categoria: concepto
tags: ["terminal"]
alias: ["TO DO"]
relacionados: ["issue", "deuda-tecnica", "code-review", "refactor"]
fuentes: []
autoenlace: true
---

## Definición

Un TODO es un comentario convencional en el código que señala una tarea pendiente o una decisión pospuesta. No ejecuta nada: es una nota para quien lea ese fragmento más adelante. Se escribe con la palabra en mayúsculas y una descripción breve de lo que falta.

## Por qué importa

Coloca la deuda justo donde está el problema, con el contexto que tendrá quien la retome. Un `// TODO: paginar cuando la API lo soporte` junto a la llamada explica por qué solo se trae la primera página. En una revisión de código, estos comentarios ayudan a distinguir "esto está acabado" de "esto funciona, pero aún falta algo".

## Ejemplo

```ts
// TODO: soportar paginación cuando la API la ofrezca
const resultados = await api.listarFichas();
```

Un TODO útil dice qué hacer y, si importa, por qué no se hace ahora. Uno que solo pone `TODO: arreglar` no ayuda a nadie.

## Se confunde con

No es una issue: el TODO vive en el código y no tiene estado, responsable ni seguimiento; la issue vive en el gestor de trabajo y permite asignarla y cerrarla. Tampoco es un FIXME, que marca algo ya roto, mientras que el TODO puede señalar una mejora futura o una limitación conocida.

## Matices

Un TODO sin dueño se convierte en deuda invisible: conviene pasarlo a una Issue antes de cerrar la tarea que lo originó.
