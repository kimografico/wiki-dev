---
titulo: "Entidad"
resumen: "Concepto del dominio con identidad propia y datos que pueden cambiar con el tiempo."
categoria: datos-api
tags: ["backend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Concepto del dominio con identidad propia y datos que pueden cambiar con el tiempo.

## Por qué importa

Sirve para separar «qué es» de «cómo se guarda» y evitar que la base de datos dicte el modelo.

## Ejemplo

Un `Pedido` con identificador, estado y líneas es una entidad; dos pedidos con distinto id son distintos aunque tengan los mismos datos.

## Se confunde con

No es un modelo de datos cualquiera: la entidad enfatiza la identidad y la continuidad en el tiempo.
