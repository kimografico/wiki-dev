---
titulo: "Hooks de testing"
resumen: "Funciones de los frameworks de pruebas que se ejecutan antes o después de tests y suites para preparar y limpiar el entorno."
categoria: concepto
tags: ["tests"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
alternativas: []
---
## Qué es

Funciones de los frameworks de pruebas que se ejecutan antes o después de tests y suites para preparar y limpiar el entorno.

## Para qué sirve

Centralizan setup y teardown para que cada test empiece desde un estado conocido.

## Tipos de prueba

`beforeEach`, `afterEach`, `beforeAll` y `afterAll` en Vitest o Jest.

## Ejemplo

```ts
beforeEach(() => { localStorage.clear(); });
afterEach(() => { vi.restoreAllMocks(); });
```

## Alternativas

No hay una alternativa directa dentro del catálogo: la decisión depende del requisito concreto.
