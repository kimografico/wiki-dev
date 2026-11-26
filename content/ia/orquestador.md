---
titulo: "Orquestador"
resumen: "Componente que decide qué agente, herramienta o paso se ejecuta a continuación para completar una meta."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
alternativas: ["agente"]
---
## Qué es

Componente que decide qué agente, herramienta o paso se ejecuta a continuación para completar una meta.

## Para qué sirve

Convierte una intención amplia en una secuencia de acciones observables con trazas.

## Ejemplo

Un orquestador que elige entre buscar en la wiki, redactar una entrada y pedir revisión.

## Limitaciones

Un bucle mal acotado repite trabajo y consume tokens; necesita límites, presupuesto y criterios de parada.

## Alternativas

Las alternativas directas son `agente`. Conviene compararlas antes de elegir.
