---
fecha: 2026-11-26
titulo: Bugfix
resumen: "Corrección de un defecto que se integra en el flujo normal de ramas, revisión y despliegue de la próxima versión."
categoria: concepto
tags: [terminal]
alias: [corrección de bug]
relacionados: [hotfix, pullback, git-flow, pull-request, issue, regresion, correcciones-en-produccion]
fuentes:
  - "https://nvie.com/posts/a-successful-git-branching-model/"
autoenlace: true
---

## Definición

Un bugfix es la corrección de un error que entra por el mismo camino que cualquier otro cambio: se describe en un issue, se trabaja en una rama, se revisa en un PR y se despliega con la siguiente versión. No es una categoría especial de commit: es una forma de clasificar el cambio por su motivo.

## Por qué importa

Mantener la corrección dentro del flujo normal preserva la trazabilidad. El diff se revisa, la CI pasa y queda asociado al issue original, de modo que se puede responder después por qué se cambió cada línea.

Cuando el defecto está en producción y no puede esperar a la próxima versión, el camino es un hotfix.

## Ejemplo

El issue `PED-42` describe que un descuento se aplica dos veces. Se abre `fix/descuento-duplicado`, se añade una prueba de regresión con el caso fallido, se fusiona el PR y el arreglo sale en la versión `1.5`.

## Se confunde con

- **Hotfix**: se aplica sobre producción de forma urgente; un bugfix sigue el ciclo ordinario.
- **Regresión**: es el fallo que reaparece; el bugfix es la corrección y la prueba de regresión evita que vuelva.
- **Refactor**: mejora la estructura sin cambiar comportamiento; el bugfix corrige un comportamiento incorrecto.

## Información incompleta

> **Aviso: información incompleta.** «Bugfix» no aparece definido como categoría formal en la documentación pública consultada: en el modelo de git-flow se usa de forma genérica para hablar de correcciones. Aquí se describe un uso habitual del equipo, no una definición normativa.
