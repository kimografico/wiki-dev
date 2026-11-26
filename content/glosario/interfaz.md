---
titulo: "Interfaz"
resumen: "Contrato que declara qué miembros debe tener un tipo o qué operaciones ofrece un componente, sin definir su implementación."
categoria: lenguaje
tags: ["frontend"]
alias: []
relacionados: [tipos, typescript]
fuentes: ["https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces"]
autoenlace: true
---
## Definición

Contrato que declara qué miembros debe tener un tipo o qué operaciones ofrece un componente, sin definir su implementación.

## Por qué importa

Permite programar contra un acuerdo estable y cambiar la implementación sin tocar a los consumidores.

## Ejemplo

```ts
type Entidad = { id: string };
interface Repositorio { guardar(x: Entidad): Promise<void>; }
```

## Se confunde con

No es la interfaz de usuario: en programación, interfaz es el contrato; en UX es la superficie visual.

## `type` o `interface`

En TypeScript las dos pueden describir la forma de un objeto, pero no son intercambiables. `interface` admite `extends` y se puede **reabrir**: dos declaraciones con el mismo nombre se fusionan (*declaration merging*). Un alias `type` no puede redeclararse.

```ts
interface Pedido { id: string }
interface Pedido { total: number } // se fusiona: Pedido tiene id y total

type Estado = "abierto" | "cerrado"; // unión: solo posible con type
```

`type` también nombra objetos, primitivos, tuplas y uniones, y es la vía habitual para alias derivados con utilidades como `Pick` o `Record` (que a su vez pueden usarse al extender una interfaz). La confusión útil no es «cuál es mejor», sino «qué necesito expresar»: contratos que pueden ampliar los consumidores → `interface`; combinaciones y transformaciones → `type`. En una librería, reabrir la interfaz permite a quien la usa añadir campos; mezclarlas sin criterio en el mismo modelo hace difícil saber dónde está la definición real.
