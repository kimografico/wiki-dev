---
fecha: 2026-11-26
titulo: MuD
resumen: "Modelo único de Desarrollo de BBVA: componentes importables que llegan con su lógica y sus Data Managers incluidos."
categoria: concepto
tags: [bbva]
alias: [Modelo único de Desarrollo, Modelo Único de Desarrollo]
relacionados: [data-manager, componentizacion]
fuentes: []
autoenlace: true
---

## Definición

MuD (Modelo único de Desarrollo) es el modelo de desarrollo de BBVA para crear componentes importables desde un repositorio compartido, `ng-channels`. Estos componentes se importan con la lógica y los Data Managers ya incluidos, de modo que gestionan sus propias llamadas a los datos en lugar de dejar esa responsabilidad a quien los consume.

## Por qué importa

Reduce la decisión de arquitectura en cada feature: al importar el componente se obtiene también la forma de acceder a los datos. En este modelo los componentes y las features integran sus propios DMs y se evita el uso de adapters, porque una capa intermedia añadida por el consumidor repetiría lo que el componente ya trae.

## Ejemplo

Una feature importa un componente de `ng-channels` y lo coloca en su pantalla. El componente trae su lógica y su DM, por lo que la feature no añade un adaptador ni implementa por su cuenta la comunicación con la API o con la base de datos.

## Se confunde con

- **Una biblioteca de interfaz**: importar botones o tarjetas no implica que traigan acceso a datos. Lo distintivo de MuD es que el componente importable incluye también la lógica y el DM.
- **Un adapter**: MuD evita precisamente esa capa; los DMs ya viven dentro de los componentes y las features.
- **Un patrón de diseño concreto**: aquí se describe un modelo de desarrollo, no una estructura de clases con una solución única documentada.

## Información incompleta

> **Aviso: información incompleta.** Esta entrada recoge solo la descripción aproximada disponible. Falta por documentar el funcionamiento concreto de `ng-channels`, la estructura exacta de los componentes importables, los métodos y eventos de sus DMs y los casos en que los datos se obtienen de una API o de una base de datos. El detalle depende de la implementación interna y no está verificado aquí.
