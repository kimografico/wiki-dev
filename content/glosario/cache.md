---
titulo: "Cache"
resumen: "Copia temporal de un resultado costoso guardada para reutilizarlo sin repetir el trabajo."
categoria: rendimiento-ux
tags: ["frontend","rendimiento"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Copia temporal de un resultado costoso guardada para reutilizarlo sin repetir el trabajo.

## Por qué importa

 Es la palanca más directa para mejorar latencia y reducir llamadas repetidas, pero obliga a decidir cuándo se invalida.

## Ejemplo

El navegador guarda una imagen durante una sesión y la sirve del disco en lugar de volver a pedirla.

## Se confunde con

No es persistencia: la memoria caché puede caducar o perderse; una base de datos guarda el dato de forma duradera.
