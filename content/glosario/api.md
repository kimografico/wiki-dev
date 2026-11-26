---
titulo: "API"
resumen: "Interfaz contractual que permite a un programa usar las funciones o datos de otro sin conocer su implementación."
categoria: datos-api
tags: ["nivel-0"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Interfaz contractual que permite a un programa usar las funciones o datos de otro sin conocer su implementación.

## Por qué importa

Define el límite entre components: cuando el contrato cambia, los consumidores se rompen aunque el código interno siga siendo correcto.

## Ejemplo

Una API REST expone `GET /usuarios` y devuelve JSON; el cliente confía en esa forma, no en cómo se consulta la base de datos.

## Se confunde con

No es lo mismo que una biblioteca: la biblioteca se enlaza dentro del proceso, la API suele cruzar un límite de red o de módulo.
