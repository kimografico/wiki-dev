---
titulo: Vitest
resumen: Ejecutor de tests integrado con Vite, rápido y compatible con la API de Jest.
categoria: herramienta
tags: [tests, terminal]
alias: []
relacionados: [vite, integracion-continua]
alternativas: []
web: https://vitest.dev
npm: vitest
fuentes: [https://vitest.dev/guide/]
---

## Qué es

Vitest es un framework de pruebas para proyectos basados en Vite. Ejecuta los tests, ofrece aserciones y espías (compatibles con los de Jest) y genera informes de cobertura.

## Para qué sirve

Comprueba que la lógica se comporta como se espera: por ejemplo, que la normalización de entradas o el cálculo de relaciones devuelvan lo correcto. Aquí también vigila que la cobertura de `src/lib` no baje del umbral.

## Cuándo usarlo

En cualquier módulo con lógica propia que merezca una prueba automática y repetible. Se integra sin fricción si el proyecto ya usa Vite.

## Cuándo no

No reemplaza a las pruebas de interfaz o de integración reales: cubre unidades aisladas. Exigir cobertura del 100 % en todas partes suele ser contraproducente.

## Alternativas

Jest es el clásico más extendido; Node tiene su propio runner integrado; aquí Vitest encaja porque comparte infraestructura con Vite.

## Ejemplo

```ts
import { expect, test } from "vitest";
import { normalizar } from "./entradas";

test("recorta el resumen", () => {
  expect(normalizar(" hola ").resumen).toBe("hola");
});
```
