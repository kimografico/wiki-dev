---
fecha: 2026-11-26
titulo: Provider
resumen: "Módulo que suministra una dependencia a quien la necesita, en lugar de que cada consumidor la construya por su cuenta."
categoria: concepto
tags: [backend]
alias: [proveedor de dependencias]
relacionados: [adapter, facade, repository, ddd, contenedor-presentacional, zustand]
fuentes:
  - "https://martinfowler.com/articles/injection.html"
  - "https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection"
autoenlace: true
---

## Definición

Un provider es quien entrega una dependencia lista para usar: una conexión, un cliente HTTP, un repositorio o un servicio de dominio. El consumidor declara qué necesita y recibe la instancia; no decide cómo se crea ni qué implementación concreta hay detrás.

Esta idea es el núcleo de la inyección de dependencias: la creación se separa del uso.

## Por qué importa

Permite sustituir una dependencia en una prueba sin tocar al consumidor, y cambiar la implementación en producción sin revisar todos los archivos que la usan. También evita que cada módulo inicialice su propio cliente con configuraciones distintas.

## Ejemplo

Una pantalla recibe un repositorio ya creado en lugar de importar `astro:content` directamente. En una prueba se le pasa un repositorio falso; en la web, el real. La pantalla no cambia.

## Se confunde con

- **Adapter**: traduce la interfaz de un sistema a otra; un provider decide qué instancia se entrega, no transforma llamadas.
- **Provider de React Context**: comparte nombre, pero allí es un componente que entrega valores al árbol de UI. La idea es parecida; el contexto de uso es distinto.
- **Proveedor cloud o de identidad**: es una empresa o servicio externo, no un mecanismo de creación de dependencias dentro del código.
- **Zustand**: prescinde de providers y contextos porque la store vive fuera del árbol de componentes.
- **Inversión de control (IoC)**: es el principio general; la inyección de dependencias es una forma concreta de IoC, no su sinónimo.
