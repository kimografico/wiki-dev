---
fecha: 2026-11-26
titulo: Fixture
resumen: "Conjunto de datos y estado de partida conocido y reutilizable que prepara el escenario de una prueba."
categoria: concepto
tags: [tests]
alias: [test fixture]
relacionados: [hooks-de-testing, mock-stub, dummy, spy, dobles-de-prueba]
fuentes: []
autoenlace: true
alternativas: [dummy, mock-stub, spy]
---

## Qué es

Una fixture es el estado conocido con el que empieza una prueba: objetos, registros en una base de datos de prueba o archivos de entrada. No sustituye a una dependencia, sino que decide qué hay cuando la prueba arranca.

La palabra designa tanto los datos como el mecanismo que los prepara y los limpia al terminar. En herramientas como Playwright, una fixture es además un recurso que el framework crea y entrega a cada test, con su propio ciclo de vida.

## Para qué sirve

Para que una prueba sea repetible. Si dos ejecuciones parten del mismo estado, un fallo se puede reproducir y no depende de lo que haya quedado de la prueba anterior. También evita escribir los mismos objetos en cada caso: la fixture se define una vez y se reutiliza.

En pruebas de integración, una fixture con datos semilla permite comprobar consultas y filtros sin depender del contenido de una base de datos compartida.

## Tipos de prueba

- **Unitarias**: un objeto de entrada con valores ya conocidos, sin persistencia.
- **De integración**: registros semilla creados en una base de prueba y borrados al finalizar.
- **Extremo a extremo**: una cuenta de usuario o un conjunto de productos preparados antes de abrir la página.
- **De componentes**: props y estado iniciales con los que se monta el componente.

En los tres últimos casos conviene crear y destruir la fixture con hooks, para no contaminar el siguiente escenario.

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

Todas las pruebas que usen `pedidoFixture` parten exactamente del mismo pedido. Si una necesita un importe distinto, conviene derivar un objeto nuevo en lugar de modificar la fixture compartida.

## Alternativas

- **Dummy, stub, spy y mock**: sustituyen una dependencia; una fixture aporta el escenario de datos, no un sustituto.
- **Datos generados en cada prueba**: dan más variedad y descubren casos imprevistos, pero dificultan repetir un fallo concreto porque cada ejecución parte de valores distintos.

## Matices

Una fixture compartida que se muta se convierte en una fuente de fallos difíciles de rastrear: el test que falla puede no ser el que la modificó. La regla práctica es simple: datos inmutables pueden compartirse; datos que la prueba va a cambiar deben crearse frescos para cada caso, aunque eso suponga repetir unas líneas.
