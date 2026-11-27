---
titulo: "Cucumber y Gherkin"
resumen: "Cucumber es el ejecutor de escenarios; Gherkin es el lenguaje con palabras clave Given, When y Then en que se escriben esos escenarios."
categoria: herramienta
tags: ["tests"]
alias: []
relacionados: ["bdd", "e2e", "playwright", "estrategia-de-testing"]
fuentes: ["https://cucumber.io/docs/gherkin/", "https://cucumber.io/docs/cucumber/"]
autoenlace: true
alternativas: []
web: "https://cucumber.io/"
---

## Qué es

Cucumber es un ejecutor de pruebas de aceptación: lee archivos de texto con escenarios y llama a funciones del proyecto que implementan cada paso. Gherkin es el lenguaje en el que se escriben esos archivos: una sintaxis de palabras clave (`Feature`, `Scenario`, `Given`, `When`, `Then`, `And`) legible sin saber programar.

Son dos piezas distintas. Gherkin solo describe comportamiento; no ejecuta nada por sí mismo. Cucumber interpreta esa descripción y necesita código de apoyo, llamado *step definitions*, para convertir cada frase en una acción real.

## Cucumber

Cucumber pertenece al mundo de BDD: parte de un comportamiento acordado y lo ejecuta. Se instala en el proyecto, lee los archivos `.feature` y enlaza cada frase con una implementación. El resultado de la ejecución indica qué escenarios pasan y cuáles fallan.

No es un navegador ni un framework de aserciones: decide qué pasos llamar; las comprobaciones se escriben en el código del proyecto.

## Gherkin

Gherkin es la capa de texto. Cada `Given` prepara el contexto, cada `When` describe la acción y cada `Then` expresa el resultado observable. La palabra `And` encadena frases del mismo tipo y `But` introduce una excepción.

El lenguaje es independiente del ejecutor: otros ejecutores también pueden leer Gherkin. Cambiar de herramienta no obliga a reescribir los escenarios, aunque sí a reescribir las implementaciones de los pasos.

## Para qué sirve

Permite que negocio, diseño y desarrollo hablen del mismo ejemplo concreto antes y después de implementarlo. Un escenario en lenguaje natural sirve para discutir un caso límite y, además, para ejecutarlo como prueba. Conviene cuando importa la regla de negocio —descuentos o permisos— más que el detalle técnico.

## Tipos de prueba

Cucumber se usa sobre todo para pruebas de aceptación: validan que una historia cumple el comportamiento acordado. Según cómo se implementen los pasos, el escenario puede quedarse en la lógica de dominio o llegar a la interfaz y al navegador, acercándose a E2E. No sustituye a las pruebas unitarias: un escenario cubre un flujo amplio, no todas las ramas internas.

## Ejemplo

```gherkin
Feature: Aplicar un cupón

  Scenario: Cupón de diez por ciento
    Given un carrito con dos productos de 50 cada uno
    When aplico el cupón "DIEZ"
    Then el total se reduce un 10%
```

```js
Given("un carrito con dos productos de {int} cada uno", (importe) => {
  carrito = new Carrito([importe, importe]);
});

When("aplico el cupón {string}", (codigo) => {
  carrito.aplicarCupon(codigo);
});

Then("el total se reduce un 10%", () => {
  expect(carrito.total()).toBe(90);
});
```

El `Given` fija el total inicial en 100 para que el `Then` pueda esperar 90.

## Cucumber frente a Gherkin

| Concepto | Papel | Qué pasa al cambiarlo |
|---|---|---|
| Cucumber | Ejecuta y enlaza pasos | Hay que adaptar las implementaciones |
| Gherkin | Describe el escenario | Deja de ser ejecutable si se sustituye por prosa |

La duda práctica se resume así: si la prueba no arranca, revisa Cucumber y sus step definitions; si el escenario no dice lo que el negocio espera, corrige el Gherkin.
