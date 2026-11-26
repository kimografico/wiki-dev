---
titulo: "Composite"
resumen: "El código trata objetos individuales y agrupaciones de forma distinta, obligando a condicionales en cada recorrido."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
familia: estructural
---
## Problema

El código trata objetos individuales y agrupaciones de forma distinta, obligando a condicionales en cada recorrido.

## Solución

Definir una interfaz común para hojas y compuestos, de modo que el cliente no distinga entre ambos.

## Estructura

Componente con operaciones comunes, hoja que implementa la operación y compuesto que contiene hijos y delega en ellos.

## Ejemplo

```ts
interface Nodo { render(): string }
class Texto implements Nodo { render() { return 'hola'; } }
class Grupo implements Nodo { constructor(private hijos: Nodo[]) {} render() { return this.hijos.map(h => h.render()).join(''); } }
```

## Cuándo usarlo

Cuando los elementos forman un árbol y el cliente debe tratar hojas y ramas del mismo modo, como en componentes de interfaz.
