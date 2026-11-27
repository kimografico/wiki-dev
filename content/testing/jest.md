---
titulo: "Jest"
resumen: "Framework de pruebas de JavaScript con runner, aserciones, mocks y cobertura integrados."
categoria: herramienta
tags: ["tests","terminal"]
alias: []
relacionados: ["vitest", "jasmine", "cobertura", "estrategia-de-testing"]
fuentes: ["https://jestjs.io/", "https://jestjs.io/docs/getting-started"]
autoenlace: true
alternativas: ["vitest", "jasmine"]
web: "https://jestjs.io/"
npm: "jest"
---

## Qué es

Jest es un framework de pruebas para JavaScript que reúne en un mismo paquete el ejecutor, la sintaxis `describe`, `it` y `test`, las aserciones `expect`, los dobles de prueba (`jest.fn`, `jest.mock`) y los informes de cobertura. Ofrece también un entorno DOM simulado para probar componentes sin abrir un navegador. Desde Jest 28, ese entorno no viene incluido: `jest-environment-jsdom` se instala como paquete aparte.

No es un navegador ni una herramienta de extremo a extremo: ejecuta código en Node.js y simula el entorno que haga falta. Para flujos reales en pantalla se emplea otra herramienta.

## Para qué sirve

Para empezar a testear sin decidir cada pieza por separado. En un proyecto con transpilación configurada, instalar Jest y escribir el primer `test` suele ser suficiente. Es habitual en bibliotecas y aplicaciones que necesitan mocks de dependencias y cobertura desde el primer día.

También sirve para convertir un fallo en prueba de regresión: se escribe el caso que reproducía el error, se comprueba que falla y se arregla el código hasta que pasa.

## Tipos de prueba

- **Unitarias** de lógica pura, con `jest.fn()` para sustituir colaboradores.
- **De integración** entre módulos, con `jest.mock()` para controlar una dependencia externa.
- **De componentes** con el entorno DOM simulado; las consultas por rol son de Testing Library, no de Jest.
- **Asíncronas**, devolviendo la promesa desde `test` o usando `async`/`await`.

## Ejemplo

```js
import { enviar } from "./envio.js";

test("reintenta una vez si falla el envío", async () => {
  const cliente = { post: jest.fn().mockRejectedValueOnce(new Error("red")) };
  cliente.post.mockResolvedValueOnce({ ok: true });

  const resultado = await enviar(cliente, "pedido-1");

  expect(cliente.post).toHaveBeenCalledTimes(2);
  expect(resultado.ok).toBe(true);
});
```

Aquí `jest.fn()` prepara respuestas y permite verificar el número de llamadas: la misma función sirve como stub y como mock.

## Alternativas

| Opción | Momento en que conviene |
|---|---|
| Jest | Proyecto consolidado con mocks propios y cobertura integrada |
| Vitest | Proyecto con Vite que quiere una API parecida y arranque rápido |
| Jasmine | Suite pequeña que solo necesita `describe`, `it` y `expect` |

La comparativa Vitest frente a Jest detalla el criterio: migrar conviene cuando el coste de arranque o la integración con el bundler pesan más que adaptar mocks y configuración.

## Matices

La cobertura que genera Jest mide ejecución, no calidad de las aserciones: un test sin `expect` aumenta el porcentaje. Los mocks también pueden ocultar fallos de integración: si se sustituyen todas las dependencias, se comprueba el propio código, no que los módulos reales sepan comunicarse.
