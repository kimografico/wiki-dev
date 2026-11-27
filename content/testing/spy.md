---
fecha: 2026-11-26
titulo: Spy
resumen: "Doble de prueba que conserva la lógica real y registra cómo se llamó, para verificar interacciones sin cambiar el comportamiento."
categoria: concepto
tags: [tests]
alias: [test spy, espía]
relacionados: [mock-stub, dummy, fixture, dobles-de-prueba, hooks-de-testing]
fuentes:
  - "https://martinfowler.com/bliki/TestDouble.html"
  - "https://martinfowler.com/articles/mocksArentStubs.html"
autoenlace: true
alternativas: [mock-stub, dummy, fixture]
---

## Qué es

Un spy es un doble que envuelve una función real: deja que se ejecute como siempre y, además, anota los argumentos, el número de llamadas y el resultado. Es una función espía, es decir, comportamiento real más registro.

La diferencia con un mock está en el orden. El mock parte de una expectativa y falla si no se cumple; el spy solo observa, y la aserción se escribe después de ejecutar la acción. Si el código nunca llama a la función observada, el test lo descubre al revisar el registro.

## Para qué sirve

Para comprobar que se produjo una colaboración concreta sin renunciar a lo que esa colaboración hace. Es útil cuando el efecto real importa —hay que enviar el correo o calcular el saldo— pero también interesa saber cuándo y con qué datos se disparó.

Frente a un mock, deja que la lógica real siga ejecutándose, de modo que una verificación de llamadas no sustituye silenciosamente al código que se quería probar.

## Tipos de prueba

Encaja en pruebas unitarias y de integración donde ya existe una implementación que funciona y solo se quiere añadir una comprobación de interacción. También aparece en pruebas de componentes para observar un callback sin impedir que el componente reaccione.

No sustituye a una prueba de regresión: verificar una llamada no demuestra que el resultado siga siendo correcto. Ambas comprobaciones pueden convivir en el mismo test.

## Ejemplo

```ts
const spy = vi.spyOn(servicio, "enviar");

enviarPedido(pedido);

expect(spy).toHaveBeenCalledTimes(1);
expect(spy).toHaveBeenCalledWith(pedido);
```

`servicio.enviar` se ejecuta de verdad; el spy solo guarda cómo se usó. Conviene restaurarlo en un hook `afterEach`, como se describe en Hooks de testing, para que otro caso no herede el registro.

## Matices

Un espía no es neutral: al envolver la función añade observación y, según la herramienta, puede alterar la identidad del método. En Vitest, `vi.spyOn` llama a la implementación original por defecto; en Jasmine, `spyOn` la sustituye y hace falta `.and.callThrough()` para conservarla. Saber cuál es el comportamiento por defecto evita comprobar una llamada que nunca ejecutó la lógica real.

## Alternativas

| Doble | Comportamiento | Asersión |
|---|---|---|
| Spy | Ejecuta la lógica real y registra la llamada | Después, sobre el registro |
| Mock | Parte de una expectativa previa | Antes, sobre la interacción esperada |
| Stub | Devuelve un valor preparado | Sobre el resultado, no sobre la llamada |
| Dummy | Solo ocupa la interfaz | Ninguna |

Mock y stub comparten entrada; el spy se elige cuando no se quiere cambiar lo que hace la función original. El dummy no registra nada y la fixture prepara datos, no observa llamadas.
