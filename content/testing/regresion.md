---
fecha: 2026-11-26
titulo: Regresión
resumen: "Fallo que reaparece en una funcionalidad que antes funcionaba, normalmente tras un cambio en otra parte del código."
categoria: concepto
tags: [tests]
alias: [regresión de software, prueba de regresión]
relacionados: [browserstack, storybook, core-web-vitals, bugfix, hotfix]
fuentes:
  - "https://en.wikipedia.org/wiki/Regression_testing"
autoenlace: true
alternativas: [bugfix, hotfix, cobertura]
---

## Qué es

Una regresión es un comportamiento que funcionaba y ha dejado de hacerlo después de un cambio. No es un fallo nuevo: es el mismo problema vuelto a aparecer, a menudo en una zona que nadie tocó directamente.

La prueba que se añade para impedir que vuelva a ocurrir es una prueba de regresión. Conviene distinguir ambas cosas: la regresión es el fallo; la prueba es la comprobación permanente que se deja en la suite.

## Para qué sirve

Para convertir un incidente en una barrera de protección. Reproducir el fallo con un test antes de arreglarlo deja constancia del caso límite y evita que una refactorización futura lo reintroduzca sin que nadie lo note. Es la forma más fiable de que un arreglo no se pierda con el tiempo.

También ayuda a acotar la causa: si la prueba de regresión pasa en un entorno y falla en otro, el cambio responsable suele estar en la diferencia entre ambos.

## Tipos de prueba

- **Funcional**: el flujo sigue devolviendo el resultado esperado tras un cambio.
- **Visual**: un componente conserva su aspecto; Storybook suele emplearse para detectar este tipo de regresión.
- **De rendimiento**: métricas como Core Web Vitals no empeoran entre versiones.
- **De compatibilidad**: el fallo solo aparece en un navegador o dispositivo concreto, donde ayuda BrowserStack.
- **De contrato**: la respuesta de una API mantiene su forma aunque cambie el servidor.

## Ejemplo

Un formulario validaba importes negativos. Al refactorizar la utilidad de formato, la validación dejó de rechazar `-1`:

```ts
it("sigue rechazando importes negativos", () => {
  expect(validarImporte("-1")).toBe(false);
});
```

Esa prueba se escribe primero y falla con el código roto; después se corrige la utilidad hasta que pasa. El caso concreto queda registrado para siempre.

## Alternativas

| Opción | Qué hace | Cuándo elegirla |
|---|---|---|
| Bugfix | Corrige el fallo actual | Hay que restaurar el comportamiento cuanto antes |
| Hotfix | Corrige en producción con un camino corto | El fallo está afectando a usuarios ya |
| Cobertura | Mide qué código se ejecutó | Se quiere priorizar zonas sin probar |
| Prueba de regresión | Impide que el fallo reaparezca | El fallo ya se ha reproducido una vez |

Arreglar y proteger no son excluyentes: un buen arreglo incluye su prueba de regresión. Aumentar la cobertura, en cambio, no garantiza que el caso que falló esté cubierto.
