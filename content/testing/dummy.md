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
alternativas: [mock-stub, spy, fixture]
---

## Qué es

Un dummy es un doble de prueba que existe solo para satisfacer una interfaz. No calcula nada, no comprueba nada y no guarda información: sus métodos están vacíos o devuelven un valor neutro como `undefined`, `null` o una cadena vacía.

Es el escalón más bajo de los dobles de prueba. Se reconoce con una prueba rápida: si lo sustituyes por `null` y el test deja de arrancar, era un dummy. Si el test sigue pasando, probablemente ni hacía falta pasar esa dependencia.

## Para qué sirve

Para entregar una dependencia que el código exige pero que no interesa en esa prueba. El constructor de un servicio puede pedir un logger, un reloj y un cliente HTTP; si la lógica bajo test solo calcula un importe, los tres pueden ser dummies. Así el test se centra en lo que importa sin arrastrar servicios reales ni configurarlos.

También sirve para desactivar efectos secundarios: un contador de eventos o un registrador que escribiría en disco se sustituyen por un objeto que acepta la llamada y no hace nada.

## Tipos de prueba

Aparece sobre todo en pruebas unitarias, cuando se llama a una función con colaboradores que no se usan en ese caso. En pruebas de integración se emplea para neutralizar adaptadores periféricos sin montar su implementación real. En pruebas extremo a extremo apenas aparece: ahí se prefiere que los componentes trabajen con dependencias reales o con un sustituto más completo.

## Ejemplo

```ts
type Logger = { log: (mensaje: string) => void };

const loggerDummy: Logger = { log: () => {} };
const relojDummy = { ahora: () => 0 };

const total = calcularTotal(pedido, loggerDummy, relojDummy);

expect(total).toBe(42);
```

El test no comprueba el log ni la hora: solo necesita que `calcularTotal` reciba objetos con esos métodos. Si empiezas a verificar cuántas veces se llamó `log`, ya no es un dummy.

## Alternativas

- **Stub**: devuelve valores concretos que la lógica bajo test necesita leer; el dummy se limita a un valor neutro.
- **Spy**: conserva la lógica real y anota las llamadas para verificarlas después.
- **Mock**: define de antemano las interacciones esperadas y falla si no se producen.
- **Fixture**: aporta un estado de partida reutilizable, no un sustituto de una dependencia.

El límite con el stub es el más fino: en cuanto el valor devuelto importa al cálculo, el doble deja de ser dummy.
