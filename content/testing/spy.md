---
fecha: 2026-11-26
titulo: Spy
resumen: "Doble de prueba que conserva la lógica real y registra cómo se llamó, para verificar interacciones sin cambiar el comportamiento."
categoria: concepto
tags: [tests]
alias: [test spy, espía]
relacionados: [mock-stub, dummy, fixture, estrategia-de-testing, dobles-de-prueba]
fuentes:
  - "https://martinfowler.com/bliki/TestDouble.html"
  - "https://martinfowler.com/articles/mocksArentStubs.html"
autoenlace: true
alternativas: []
---

## Qué es

Un spy es un doble que envuelve una función real: deja que se ejecute como siempre y, además, anota los argumentos, el número de llamadas y el resultado. Es una **función espía**: comportamiento real más registro.

La diferencia con un mock está en el orden: el mock parte de una expectativa y falla si no se cumple; el spy solo observa y la aserción se escribe después.

## Para qué sirve

Para comprobar que se llamó a una colaboración concreta sin renunciar a lo que esa colaboración hace. Es útil cuando el efecto real importa, pero también interesa saber cuándo y con qué datos se disparó.

## Tipos de prueba

Encaja en pruebas unitarias e integración donde ya existe una implementación que funciona y solo se quiere añadir una comprobación de interacción. No sustituye a una prueba de regresión: verificar una llamada no demuestra que el resultado siga siendo correcto.

## Ejemplo

```ts
const spy = vi.spyOn(servicio, "enviar");

enviarPedido(pedido);

expect(spy).toHaveBeenCalledWith(pedido);
```

`servicio.enviar` se ejecuta de verdad; el spy solo guarda cómo se usó.

## Alternativas

- **Mock y stub**: el stub devuelve valores fijos y el mock fija expectativas; ninguno conserva por defecto la lógica real.
- **Dummy**: solo ocupa un hueco; no registra nada.
- **Fixture**: prepara datos de entrada, sin observar llamadas.
