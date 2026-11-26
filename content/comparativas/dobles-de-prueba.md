---
fecha: 2026-11-26
titulo: Dobles de prueba
resumen: "Cuándo usar dummy, stub, spy, mock o fixture para sustituir dependencias y preparar datos en los tests."
categoria: concepto
tags: [tests]
alias: []
relacionados: [dummy, mock-stub, spy, fixture]
fuentes:
  - "https://martinfowler.com/bliki/TestDouble.html"
  - "https://martinfowler.com/articles/mocksArentStubs.html"
autoenlace: true
entidades: [dummy, mock-stub, spy, fixture]
contexto: "Elegir el sustituto adecuado al escribir una prueba unitaria o de integración con dependencias."
---

## Contexto

Una prueba necesita aislar una parte del código. Según lo que se quiera comprobar, la dependencia se puede ignorar, dar un valor fijo, observar o preparar previamente. Elegir el doble equivocado produce tests que pasan sin verificar nada o que fallan por razones ajenas a la lógica.

## Criterios

| Doble | ¿Ejecuta lógica real? | ¿Devuelve valores? | ¿Registra llamadas? | Para qué sirve mejor |
| --- | --- | --- | --- | --- |
| Dummy | No | Vacíos | No | Ocupar una interfaz que no interesa |
| Stub | No | Fijos | No | Dar una respuesta controlada |
| Spy | Sí | La real | Sí | Verificar interacción sin cambiar el comportamiento |
| Mock | No | Según expectativa | Sí, y la exige | Fijar la interacción esperada |
| Fixture | No aplica | Estado inicial | No | Preparar datos reutilizables |

Los primeros cuatro son sustitutos de dependencias; la fixture es el escenario de datos con el que arranca la prueba. Fowler describe un quinto doble, el *fake*: una implementación con un atajo que funciona, pero que no sirve para producción.

## Cuándo elegir cada una

- **Dummy** cuando el colaborador se exige pero no se usa en ese caso.
- **Stub** cuando la lógica bajo test necesita leer una respuesta concreta.
- **Spy** cuando la implementación real debe seguir ejecutándose y además interesa comprobar cómo se llamó.
- **Mock** cuando la interacción es el resultado que se quiere verificar y conviene fallar pronto si no ocurre.
- **Fixture** cuando varios casos comparten el mismo punto de partida.

Mezclar varios en una misma prueba es normal: por ejemplo, una fixture de entrada con un stub para la API.

## Ejemplos

- Validar una función pura con un logger dummy: solo se comprueba el valor devuelto.
- Probar una pantalla con un stub que devuelve una lista conocida y una fixture con el usuario ya cargado.
- Comprobar que se guarda un pedido con un spy sobre el servicio real, sin sustituir su lógica.
