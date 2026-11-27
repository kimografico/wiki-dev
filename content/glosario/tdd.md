---
titulo: "TDD"
resumen: "Test-Driven Development: ciclo de escribir un test fallido, implementar lo mínimo y refactorizar."
categoria: concepto
tags: ["tests","backend"]
alias: ["Test-Driven Development"]
relacionados: ["vitest", "refactor", "bdd", "cobertura"]
fuentes: []
autoenlace: true
---

## Definición

TDD (*Test-Driven Development*) es una forma de trabajar en tres pasos repetidos: escribir una prueba que falla, implementar lo mínimo para que pase y refactorizar con las pruebas en verde. El orden importa: la prueba se escribe antes del código de producción y describe un comportamiento observable.

## Por qué importa

Escribir primero la prueba obliga a decidir qué significa "hecho" antes de programar. En `normalizarSlug`, el primer caso puede exigir que `"Hola Mundo"` produzca `"hola-mundo"`; al verlo fallar se confirma que la prueba detecta el problema real. Después, cada cambio pequeño se comprueba de inmediato, de modo que un refactor amplio no depende de recordar qué funcionaba.

## Ejemplo

```ts
it("convierte espacios y acentos en guiones", () => {
  expect(normalizarSlug("Ágil y SSG")).toBe("agil-y-ssg");
});
```

Primero falla porque la función no existe o no normaliza; luego se implementa y, por último, se limpia el código sin cambiar el resultado.

## Se confunde con

No es BDD: BDD formula escenarios de comportamiento acordados con negocio, a menudo con Cucumber y Gherkin; TDD se centra en la unidad y en el ciclo rojo-verde-refactor. Tampoco es escribir pruebas después: eso no obliga a ver el fallo antes de implementar. Medir la cobertura no dice en qué orden se escribió.

## Matices

El ciclo no exige probar cada línea: conviene elegir casos límite y de error.
