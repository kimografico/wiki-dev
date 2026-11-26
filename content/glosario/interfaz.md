---
titulo: "Interfaz"
resumen: "Contrato que declara qué miembros debe tener un tipo o qué operaciones ofrece un componente, sin definir su implementación."
categoria: lenguaje
tags: ["frontend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Contrato que declara qué miembros debe tener un tipo o qué operaciones ofrece un componente, sin definir su implementación.

## Por qué importa

Permite programar contra un acuerdo estable y cambiar la implementación sin tocar a los consumidores.

## Ejemplo

```ts
interface Repositorio { guardar(x: Entidad): Promise<void>; }
```

## Se confunde con

No es la interfaz de usuario: en programación, interfaz es el contrato; en UX es la superficie visual.
