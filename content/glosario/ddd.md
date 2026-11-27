---
titulo: "DDD"
resumen: "Domain-Driven Design: enfoque que organiza el código alrededor del modelo del negocio y su lenguaje."
categoria: concepto
tags: ["tests","backend"]
alias: ["Domain-Driven Design"]
relacionados: [entidad, negocio, monolito, microservicio]
fuentes: []
autoenlace: true
---

## Definición

DDD (Domain-Driven Design) es un enfoque de diseño que organiza el código alrededor del modelo del negocio y del vocabulario que usa el equipo con el negocio. Su idea central es el *lenguaje ubicuo*: las mismas palabras aparecen en la conversación, en los requisitos y en los nombres de clases y métodos.

## Por qué importa

Cuando la lógica de negocio es compleja, traducir entre lo que dice el negocio y lo que hace el código introduce errores. Al nombrar una entidad igual que el dominio, el código se vuelve legible incluso para quien no programa. El enfoque también obliga a dibujar límites: un *bounded context* define dónde una palabra tiene un significado y dónde empieza otro modelo.

## Ejemplo

En un sistema de ventas, Facturación y Envíos son dos contextos: «pedido» significa cosas distintas en cada uno. Cada contexto mantiene su propio modelo y expone una interfaz explícita al otro, en lugar de compartir una única clase gigante.

## Se confunde con

Con una metodología de pruebas. DDD no prescribe cuántos tests escribir ni cómo nombrarlos; prescribe cómo dividir el modelo. Tampoco exige microservicios: los contextos delimitados pueden vivir perfectamente en el mismo despliegue.
