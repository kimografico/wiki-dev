---
fecha: 2026-10-13
titulo: Facade
resumen: Patrón estructural que ofrece una interfaz simple sobre un conjunto complejo de módulos, ocultando los detalles a quien la usa.
categoria: concepto
tags: []
alias: [fachada]
relacionados: [repository, adapter]
familia: estructural
fuentes: ["https://refactoring.guru/design-patterns/facade"]
autoenlace: true
---

## Problema

Un sistema tiene muchas piezas: varios módulos, llamadas a distintas APIs y pasos de preparación. Si cada consumidor tiene que conocerlas todas, cualquier cambio interno se propaga a media aplicación.

## Solución

Se coloca una fachada delante: una API pequeña y con nombres de dominio. Quien la usa pide lo que necesita sin saber cómo se resuelve por dentro. Si cambia el origen de los datos, solo se reescribe la fachada.

## Estructura

```
Componentes / páginas
        │
        ▼
     Fachada  ──  operación sencilla
        │
        ├── Subsistema A
        ├── Subsistema B
        └── Subsistema C
```

## Ejemplo

Los componentes no saben de dónde salen los datos ni qué capa los consulta:

```ts
const relacionados = await getRelacionados(slug);
```

Detrás de esa función puede haber una collection de Astro, una caché y un filtrado. El componente solo conoce el resultado.

## Cuándo usarlo

Cuando un subsistema es complejo y tiene varios consumidores, o cuando quieres ocultar una API incómoda mientras migras a otra. No merece la pena si solo hay una llamada y un consumidor: añadiría una capa sin quitar complejidad.

## En esta wiki

La fachada aparece en la capa de contenido: las páginas y los componentes no importan `astro:content`, sino un módulo intermediario que expone solo lo que la wiki necesita. Se confunde con repositorio: este encapsula el acceso a los datos; la fachada es una idea más general.

## Se confunde con

- **Adapter**: la fachada crea una interfaz simple propia sobre un subsistema complejo; el adaptador traduce una interfaz ajena a la que ya espera el consumidor. La fachada simplifica; el adaptador hace compatible.
- **Provider**: entrega una instancia ya creada a quien la pide. La fachada agrupa operaciones y oculta el subsistema que hay detrás.
