---
fecha: 2026-11-26
titulo: Fixture
resumen: "Conjunto de datos y estado de partida conocido y reutilizable que prepara el escenario de una prueba."
categoria: concepto
tags: [tests]
alias: [test fixture]
relacionados: [hooks-de-testing, mock-stub, dummy, spy, estrategia-de-testing, dobles-de-prueba]
fuentes: []
autoenlace: true
alternativas: []
---

## Qué es

Una fixture es el estado conocido con el que empieza una prueba: objetos, registros en una base de datos de prueba o archivos de entrada. No sustituye a una dependencia, sino que decide qué hay cuando la prueba arranca.

La palabra designa tanto los datos como el mecanismo que los prepara y los limpia al terminar.

## Para qué sirve

Para que una prueba sea repetible. Si dos ejecuciones parten del mismo estado, un fallo se puede reproducir y no depende de lo que haya quedado de la prueba anterior.

## Tipos de prueba

Se usa en pruebas unitarias como objeto de entrada y en pruebas de integración o extremo a extremo como datos semilla. En esas últimas conviene crearla y destruirla con hooks de configuración y limpieza para no contaminar el siguiente caso.

## Ejemplo

```ts
const pedidoFixture = {
  id: "p-1",
  importe: 42,
  estado: "pendiente",
};

it("acepta un pedido pendiente", () => {
  expect(validar(pedidoFixture)).toBe(true);
});
```

Todas las pruebas que usen `pedidoFixture` parten exactamente del mismo pedido.

## Alternativas

- **Dummy, stub, spy y mock**: son sustitutos de dependencias; una fixture es el escenario de datos.
- **Datos generados en cada prueba**: dan más variedad, pero hacen más difícil repetir un fallo concreto.
