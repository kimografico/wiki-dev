---
titulo: "Hooks de testing"
resumen: "Funciones de los frameworks de pruebas que se ejecutan antes o después de tests y suites para preparar y limpiar el entorno."
categoria: concepto
tags: ["tests"]
alias: []
relacionados: ["fixture", "vitest", "jest", "playwright", "estrategia-de-testing"]
fuentes: []
autoenlace: true
alternativas: []
---

## Qué es

Los hooks de testing son funciones que el framework ejecuta en momentos concretos del ciclo de vida de una suite: antes o después de cada prueba, o antes y después de un grupo completo. No son las pruebas; son el envoltorio que prepara y limpia el entorno.

Los nombres varían según la herramienta, pero el patrón se repite: `beforeEach` y `afterEach` se ejecutan por test; `beforeAll` y `afterAll`, una vez por grupo (`describe` o `suite`). Vitest y Jest usan esos nombres; Playwright los expone como `test.beforeEach` y `test.afterEach` sobre su objeto de prueba.

## Para qué sirve

Para no repetir código de preparación en cada prueba y, sobre todo, para que cada caso empiece desde un estado conocido. Si una prueba deja un registro en la base de datos o una clave en `localStorage`, la siguiente puede verse afectada y fallar por una causa ajena. El hook de limpieza elimina ese rastro.

También concentran recursos caros: abrir una conexión una vez en `beforeAll` y cerrarla en `afterAll` evita repetir la operación en cada caso.

## Tipos de prueba

- **Unitarias**: limpian mocks y relojes falsos entre casos para que una expectativa no herede llamadas anteriores.
- **De integración**: crean y borran datos semilla en una base de prueba.
- **De componentes**: montan y desmontan el DOM simulado antes y después de cada renderizado.
- **Extremo a extremo**: inician sesión una vez por suite y cierran el navegador al final, o restauran el estado del servidor entre escenarios.

## Ejemplo

```ts
import { beforeEach, afterEach, vi } from "vitest";

beforeEach(() => {
  localStorage.clear();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});
```

Gracias a estos dos hooks, ningún test hereda temporizadores falsos ni espías del caso anterior.

## Matices

| Situación | Hook adecuado | Riesgo |
|---|---|---|
| Estado que cambia en cada caso | `beforeEach` / `afterEach` | Ninguno; es la opción segura |
| Recurso caro e inmutable | `beforeAll` / `afterAll` | Si se modifica, contamina al resto del grupo |
| Datos que solo usa una prueba | Crearlos dentro del test | Repetición, pero máximo aislamiento |

Un hook no es una fixture: el hook es la función de ciclo de vida; la fixture es el estado que esa función prepara. Conviene limpiar exactamente lo que se creó: borrar todo el almacenamiento sin discriminar puede ocultar una dependencia real entre pruebas. Si el hook de limpieza falla, el resto de la suite debe poder seguir ejecutándose para que el fallo original siga siendo visible.
