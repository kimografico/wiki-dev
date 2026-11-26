---
fecha: 2026-11-26
titulo: Data Layer
resumen: "Parte del sistema que concentra el acceso y la preparación de datos, separada de la interfaz y de la lógica de negocio."
categoria: datos-api
tags: [backend]
alias: [capa de datos]
relacionados: [data-manager, modelos, api, repository, ddd]
fuentes:
  - "https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier"
autoenlace: true
---

## Definición

La capa de datos es la zona del sistema que sabe cómo se obtienen, se transforman y se entregan los datos. Reúne las llamadas a APIs o bases de datos y las reglas de forma que el resto del código pida datos sin conocer la fuente.

Define una responsabilidad, no una librería ni una carpeta obligatoria.

## Por qué importa

Evita que cada pantalla repita la misma consulta y la misma transformación. Cuando cambia la fuente o se añade caché, el cambio se hace en un solo sitio y las pantallas siguen recibiendo el mismo resultado.

## Ejemplo

Una pantalla pide los pedidos del usuario a la capa de datos. Esa capa decide si los lee de la API o de la caché, convierte la respuesta a la forma definida en Modelos y devuelve una lista lista para mostrar. La pantalla no sabe de dónde salieron.

## Se confunde con

- **Data Manager**: en BBVA es una pieza concreta que obtiene datos para componentes; la capa de datos es la responsabilidad más amplia que esa pieza puede implementar.
- **Repository**: es un patrón para organizar el acceso a datos; puede vivir dentro de esta capa, pero no la agota.
- **Modelos**: son la estructura de los datos; la capa de datos es la que los consigue y los entrega.
- **API**: es el contrato o el servicio que se consume; la capa de datos es quien habla con él.

## Información incompleta

> **Aviso: información incompleta.** La fuente disponible describe el nivel de datos (*data tier*) en arquitecturas por niveles. «Data Layer» no es un nombre normalizado de forma universal y su contenido concreto depende de cada arquitectura.
