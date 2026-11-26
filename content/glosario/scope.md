---
titulo: "Scope"
resumen: "Ámbito léxico que determina desde dónde es visible una variable o declaración."
categoria: lenguaje
tags: ["frontend"]
alias: ["ámbito"]
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Ámbito léxico que determina desde dónde es visible una variable o declaración.

## Por qué importa

Es la base para entender closure, hoisting y por qué una variable no existe donde se espera.

## Ejemplo

```js
let fuera = 1; function f() { let dentro = 2; } // dentro no existe fuera de f
```

## Se confunde con

No es closure: el scope es el lugar; el closure es la función que conserva ese lugar.
