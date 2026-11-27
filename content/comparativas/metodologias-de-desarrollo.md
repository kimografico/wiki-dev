---
titulo: "Metodologías de desarrollo"
resumen: "SDD decide qué construir, DDD modela el negocio, BDD acuerda comportamiento y TDD guía la implementación con tests."
categoria: concepto
tags: ["tests", "backend"]
alias: []
relacionados: [sdd, tdd, ddd, bdd, cucumber-gherkin]
fuentes: []
autoenlace: true
entidades: [sdd, tdd, ddd, bdd]
contexto: "Cuatro siglas que se citan como si fueran la misma cosa, aunque actúan en momentos distintos y producen artefactos distintos."
---

## Contexto

**SDD**, **DDD**, **BDD** y **TDD** se citan juntas por su forma, pero actúan en momentos distintos. Meterlas en el mismo saco produce síntomas concretos: tests para una funcionalidad que nadie definió, modelos de dominio para un CRUD trivial o reuniones interminables para decidir el nombre de una variable.

Cada una responde a una pregunta y entrega un artefacto distinto.

## Criterios

| Sigla | Pregunta | Momento | Artefacto |
|---|---|---|---|
| SDD | ¿Qué construimos y por qué? | Antes del diseño | Especificación aceptada |
| DDD | ¿Cómo funciona el negocio? | Diseño | Modelo y lenguaje compartido |
| BDD | ¿Qué comportamiento esperamos? | Acuerdo | Escenarios Given/When/Then |
| TDD | ¿Cómo lo implemento con seguridad? | Codificación | Test fallido, código, verde |

**Cucumber y Gherkin** son una forma usual de escribir los escenarios de BDD; no son la definición de BDD. **Cobertura** mide cuánto código se ejecuta en tests, pero no dice si el comportamiento acordado es correcto.

## Cuándo elegir cada una

Empieza por **SDD** cuando la duda es de alcance: todavía no está claro qué debe hacer la función ni qué significa «terminado». Usa **DDD** cuando las reglas de negocio son ricas y cambian: pedidos, pagos o tarifas. Un modelo que no coincide con el lenguaje del negocio genera traducciones frágiles en cada cambio.

Usa **BDD** cuando el criterio de aceptación debe entenderse igual en producto, QA y desarrollo. Los ejemplos compartidos evitan discusiones sobre casos límite. Usa **TDD** para implementar lógica delicada: escribe una prueba que falla, hazla pasar y limpia.

No son excluyentes, pero sí ordenables: primero spec, después modelo y comportamiento, y al final tests. Un refactor interno no necesita una nueva spec; un cambio de reglas de negocio sí.

## Ejemplos

```md
# Alta de comparativa
Una comparativa necesita al menos dos entidades existentes y contexto no vacío.
```

```gherkin
Feature: Validar una comparativa

  Scenario: Comparativa con una sola entidad
    Given una comparativa con una sola entidad
    When se valida el contenido
    Then se informa de que faltan entidades
```

```ts
it("rechaza una comparativa con una sola entidad", () => {
  expect(validar({ entidades: ["astro"] })).toBe(false);
});
```

## Matices

**TDD** no es «escribir tests después»: el orden fallo → paso → limpieza es lo que aporta información de diseño. **BDD** no exige una herramienta concreta. **SDD** no es acumular documentación; es llegar al código con una decisión tomada. **DDD** tampoco exige un proyecto enorme: basta con respetar el lenguaje del dominio donde haya reglas reales.
