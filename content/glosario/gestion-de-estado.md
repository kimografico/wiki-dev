---
titulo: "Gestión de estado"
resumen: "Forma de organizar los datos que cambian durante la vida de una interfaz y de propagar sus cambios."
categoria: estado
tags: ["frontend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Forma de organizar los datos que cambian durante la vida de una interfaz y de propagar sus cambios.

## Por qué importa

Sin una regla clara, el mismo dato acaba duplicado en varios componentes y nadie sabe cuál manda.

## Ejemplo

Guardar los filtros de búsqueda en un store en lugar de pasarlos por seis componentes.

## Se confunde con

No es persistencia: el estado vive en memoria; localStorage o una base de datos lo conservan entre sesiones.
