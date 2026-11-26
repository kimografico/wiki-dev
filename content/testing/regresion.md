---
fecha: 2026-11-26
titulo: Regresión
resumen: "Fallo que reaparece en una funcionalidad que antes funcionaba, normalmente tras un cambio en otra parte del código."
categoria: concepto
tags: [tests]
alias: [regresión de software, prueba de regresión]
relacionados: [estrategia-de-testing, browserstack, storybook, core-web-vitals, bugfix, hotfix]
fuentes:
  - "https://en.wikipedia.org/wiki/Regression_testing"
autoenlace: true
alternativas: []
---

## Qué es

Una regresión es un comportamiento que funcionaba y ha dejado de hacerlo después de un cambio. No es un bug nuevo: es el mismo fallo vuelto a aparecer, a menudo en una zona que nadie tocó directamente.

La prueba que se añade para impedir que vuelva a ocurrir es una prueba de regresión.

## Para qué sirve

Para convertir un incidente en una comprobación permanente. Reproducir el fallo con un test antes de arreglarlo deja constancia del caso límite y evita que una refactorización futura lo reintroduzca sin que nadie lo note.

## Tipos de prueba

- **Funcional**: el flujo sigue devolviendo el resultado esperado tras un cambio.
- **Visual**: un componente conserva su aspecto; Storybook suele usarse para detectar este tipo de regresión.
- **De rendimiento**: métricas como Core Web Vitals no empeoran entre versiones.
- **De compatibilidad**: el fallo solo aparece en un navegador o dispositivo concreto, donde ayuda BrowserStack.

## Ejemplo

Un formulario validaba importes negativos. Al refactorizar la utilidad de formato, la validación dejó de rechazar `-1`. El arreglo incluye una prueba unitaria con `-1` que antes fallaba y ahora pasa: esa prueba es la de regresión.

## Alternativas

- **Bugfix y hotfix**: corrigen el fallo; la prueba de regresión es la que evita que reaparezca.
- **Cobertura**: aumentar el porcentaje de líneas ejecutadas no garantiza que el caso que falló esté cubierto.

## Información incompleta

> **Aviso: información incompleta.** La descripción se apoya en una fuente general de contraste; no se localizó una definición normativa pública consultable que pueda citarse como primaria.
