---
fecha: 2026-11-26
titulo: Estrategia de testing
resumen: Cómo repartir las pruebas entre comprobaciones estáticas, unitarias, de integración y de extremo a extremo según coste y confianza.
categoria: concepto
tags: [tests, frontend]
alias: [pirámide de testing, trofeo de testing, testing trophy]
relacionados: [vitest, jest, e2e, playwright, cobertura, regresion, fixture, dobles-de-prueba]
fuentes:
  - "https://martinfowler.com/bliki/TestPyramid.html"
  - "https://martinfowler.com/articles/2021-test-shapes.html"
  - "https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications"
  - "https://kentcdodds.com/blog/how-to-know-what-to-test"
autoenlace: true
alternativas: []
---

## Qué es

Una estrategia de testing decide qué se comprueba en cada nivel y cuántas pruebas conviene tener en cada uno. No es una cuota de líneas ni una colección de herramientas: es una respuesta al coste de escribir, mantener y ejecutar cada tipo de prueba.

Dos metáforas conviven: la **pirámide** y el **trofeo**. No son necesariamente rivales: suelen hablar de definiciones distintas de «test unitario».

## Para qué sirve

Para evitar los dos extremos: una suite con miles de tests unitarios que no comprueban flujos reales, o una suite de pruebas de navegador lentas y frágiles que nadie ejecuta. Cada nivel detecta un tipo de fallo distinto y tiene un coste distinto.

## Tipos de prueba

- **Estática:** lint y comprobación de tipos. Detecta errores antes de ejecutar nada; es la capa más barata.
- **Unitaria:** una función o módulo con colaboradores controlados. Rápida y precisa para lógica pura y casos límite.
- **Integración:** varios módulos trabajando juntos, normalmente un componente con sus datos y el DOM. Es donde más confianza se gana por euro invertido en frontend.
- **Extremo a extremo (E2E):** un flujo completo en navegador real. Cara y más lenta, pero comprueba que las piezas se conectan.

## Pirámide

La pirámide clásica propone muchas pruebas unitarias, menos de integración y pocas de extremo a extremo. Su supuesto es que las pruebas de interfaz son lentas y frágiles; cuando dejan de serlo, el equilibrio puede cambiar.

Un fallo en una prueba de alto nivel también está diciendo que falta una prueba unitaria que lo detecte antes. La reacción útil es reproducir el bug en el nivel bajo antes de arreglarlo: esa prueba se convierte en una Regresión controlada.

## Trofeo

El trofeo añade la capa estática y da más peso a la integración. Sus consultas se centran en lo que ve y usa el usuario, no en detalles internos del componente. Concibió esta forma para un código base propio, no para arquitecturas de microservicios.

La diferencia con la pirámide viene en gran parte de qué se llame «unitario»: un test con colaboradores reales para unos es de integración y para otros es unitario.

## Qué priorizar

Piensa en **casos de uso**, no en líneas. Una cobertura alta puede convivir con flujos enteros sin probar. El criterio es qué te molestaría más si se rompiera; empieza por el camino feliz de ese flujo.

Un buen orden práctico: comprobación estática en cada cambio, unitarios para la lógica con ramas, integración para los componentes que orquestan datos y un E2E para el flujo crítico.

## Ejemplo

Un formulario de pedidos:

- Unitario: la función que valida el importe y rechaza valores negativos.
- Integración: el formulario muestra el error accesible cuando el usuario envía un valor inválido.
- E2E: crear un pedido desde la página hasta que aparece en el listado.

Cada nivel responde una pregunta distinta. Si el E2E falla, lo primero no es añadir otro E2E: es ver si el fallo ya se podía detectar en la validación unitaria.

## Cuándo no escribir un test

No escribas pruebas que solo repitan la implementación: detalles internos, clases CSS, llamadas exactas a funciones privadas o código de terceros. No intentes llegar al 100 % de cobertura como objetivo; es un número, no una garantía.

Tampoco merece la pena testear código que vas a borrar mañana. Un test que estorba al refactorizar cuesta más que el bug que evita.

## Alternativas

La estrategia no sustituye a la revisión manual ni a la monitorización en producción: hay fallos que solo aparecen con datos reales o en otro navegador. Complementa, no reemplaza. Para elegir herramientas concretas, compara `vitest` y `jest` para unitarios e integración, y `playwright` para navegador.
