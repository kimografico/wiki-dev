---
titulo: "Enum"
resumen: "Tipo que restringe un valor a una lista cerrada de opciones con nombre."
categoria: lenguaje
tags: ["nivel-0"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Tipo que restringe un valor a una lista cerrada de opciones con nombre.

## Por qué importa

Convierte errores en tiempo de ejecución en errores en tiempo de escritura y hace autodocumentable el contrato.

## Ejemplo

```ts
type Estado = 'borrador' | 'publicado';
```

## Se confunde con

No es una unión cualquiera: el enum de Zod o TypeScript define una lista controlada, no cualquier string.
