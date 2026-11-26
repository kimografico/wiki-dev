---
fecha: 2026-11-26
titulo: Vitest frente a Jest
resumen: Criterios para elegir runner de pruebas en un proyecto JavaScript/TypeScript, con foco en la integración con Vite y el coste de migración.
categoria: herramienta
tags: [tests, frontend]
alias: [jest frente a vitest]
relacionados: [vitest, jest, vite]
fuentes:
  - "https://vitest.dev/guide/why"
  - "https://vitest.dev/guide/comparisons"
  - "https://vitest.dev/guide/migration/jest"
  - "https://jestjs.io/docs/getting-started"
autoenlace: true
entidades: [vitest, jest]
contexto: "En un proyecto con Astro/Vite y tests unitarios en TypeScript, decidir si mantener Vitest o migrar las pruebas a Jest."
---

## Contexto

Los dos runners tienen una API parecida y resuelven el mismo problema. La decisión rara vez es «cuál es mejor»: es si encajan con el pipeline de build que ya tienes y cuánto cuesta mover los tests existentes.

Aquí se usa Vitest porque Astro apoya su servidor de desarrollo y su build en Vite: una sola configuración para desarrollo, build y pruebas.

## Criterios

| | Vitest | Jest |
|---|---|---|
| Integración | Reutiliza `vite.config.*`, plugins y transformaciones | Pipeline propio, ajeno a Vite |
| TypeScript | Funciona sin configuración adicional | Vía Babel (sin comprobación de tipos) o `ts-jest` |
| Globals | Desactivados por defecto | Activados por defecto |
| Migración | Compatible en API, con diferencias en mocks y hooks | Ecosistema más antiguo y herramientas propias |
| Coste de mantener | Una configuración compartida con Vite | Dos configuraciones si el proyecto usa Vite |

La compatibilidad de Jest con Vite ha cambiado entre versiones y las fuentes oficiales no coinciden: la documentación de Jest ha señalado incompatibilidades con el sistema de plugins de Vite, mientras la de Vitest describe vías de integración. No des por hecho ninguna de las dos afirmaciones sin verificar la versión instalada; lo estable es el coste de mantener dos pipelines distintos.

## Cuándo elegir cada una

**Vitest** encaja cuando el proyecto ya usa Vite (directamente o a través de Astro), los tests son unitarios o de integración en TypeScript y quieres compartir plugins y alias entre build y pruebas. No tiene por qué ser más rápido en todos los proyectos: la ventaja segura es la configuración compartida.

**Jest** tiene sentido en un proyecto consolidado con muchos mocks heredados, herramientas propias o una dependencia que exige Jest. Migrar solo por moda tiene un coste oculto: `globals`, el comportamiento de `mockReset`, los factories de mocks, los callbacks `done` y los timers cambian.

Para TS con Jest, Babel transforma pero no comprueba tipos: hace falta `ts-jest` o ejecutar el comprobador de tipos por separado.

## Ejemplos

```ts
// Vitest: importa las funciones del runner.
import { describe, it, expect, vi } from "vitest";

it("llama una vez", () => {
  const spy = vi.fn();
  spy();
  expect(spy).toHaveBeenCalledTimes(1);
});
```

Al migrar desde Jest, `jest.mock` debe devolver un objeto con los exports explícitos, `requireActual` pasa a ser `importActual` y `jest.setTimeout` se sustituye por la configuración equivalente. Conviene migrar un archivo, ejecutar la suite completa y comparar resultados antes de seguir.
