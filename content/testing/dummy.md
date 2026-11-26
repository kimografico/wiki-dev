---
fecha: 2026-11-26
titulo: Dummy
resumen: "Doble de prueba mínimo que solo cumple la interfaz y devuelve valores vacíos para que el código pueda ejecutarse."
categoria: concepto
tags: [tests]
alias: [objeto dummy]
relacionados: [mock-stub, spy, fixture, estrategia-de-testing, dobles-de-prueba]
fuentes:
  - "https://martinfowler.com/bliki/TestDouble.html"
autoenlace: true
alternativas: []
---

## Qué es

Un dummy es un doble de prueba que existe solo para satisfacer una interfaz. No calcula nada, no comprueba nada y no guarda información: sus métodos están vacíos o devuelven un valor neutro.

Es el escalón más bajo de los dobles de prueba. Se reconoce porque, si lo sustituyes por `null` y el test deja de arrancar, era un dummy.

## Para qué sirve

Para pasar una dependencia que el código exige pero que no interesa en esa prueba. Así el test se centra en la lógica que sí importa sin arrastrar un servicio real.

## Tipos de prueba

Aparece sobre todo en pruebas unitarias, cuando se llama a una función con colaboradores que no se usan en ese caso. También en pruebas de integración para desactivar Effects secundarios, como un logger o un contador de eventos, sin montar su implementación.

## Ejemplo

```ts
const loggerDummy = { log: () => {} };

guardarPedido(pedido, loggerDummy);
```

El test no comprueba el log: solo necesita que `guardarPedido` reciba algo con un método `log`.

## Alternativas

- **Stub**: devuelve valores concretos cuando la lógica bajo test necesita leer esa respuesta.
- **Spy**: conserva el comportamiento real y además registra las llamadas.
- **Mock**: define de antemano las interacciones esperadas y falla si no se producen.
- **Fixture**: aporta un estado de partida reutilizable, no un sustituto de una dependencia.
