---
titulo: "Gestión de estado"
resumen: "Forma de organizar los datos que cambian durante la vida de una interfaz y de propagar sus cambios."
categoria: estado
tags: ["frontend"]
alias: []
relacionados: [zustand, redux, tanstack, swr]
fuentes: ["https://react.dev/learn/choosing-the-state-structure"]
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

## Local, global y de servidor

No todo lo que cambia debe ir al mismo sitio:

- **Local:** lo que solo usa un componente (si un desplegable está abierto).
- **Global:** lo que cruzan varios componentes y no viene de una API (tema, sesión, filtros compartidos).
- **De servidor:** datos que viven en una API y se traen, se cachean y se revalidan. No son estado que tú posees: son una copia con dueño ajeno.

El error habitual es copiar la respuesta de una API a un store global y después sincronizar los dos a mano. Para ese tercer grupo están `tanstack` y `swr`; la decisión se compara en Estado local frente a estado de servidor.
