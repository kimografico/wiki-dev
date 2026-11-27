---
titulo: "Mock y stub"
resumen: "Dobles de prueba: el stub prepara una respuesta sin verificar llamadas; el mock fija expectativas sobre la interacción y falla si no se cumplen."
categoria: concepto
tags: ["tests"]
alias: []
relacionados: ["dummy", "spy", "fixture", "dobles-de-prueba", "estrategia-de-testing"]
fuentes:
  - "https://martinfowler.com/bliki/TestDouble.html"
  - "https://martinfowler.com/articles/mocksArentStubs.html"
autoenlace: true
alternativas: [dummy, spy, fixture]
---

## Qué es

Mock y stub son dos dobles de prueba que sustituyen a una dependencia real. Los dos presentan la misma interfaz que aquello que reemplazan, pero se diferencian por su papel: el **stub** entrega una respuesta preparada para que la lógica bajo test pueda avanzar; el **mock** además declara qué interacciones se esperan y comprueba que ocurrieron.

La confusión nace porque una misma biblioteca suele crear ambos con la misma llamada, por ejemplo `vi.fn()`. La categoría la decide el uso, no la función empleada.

## Stub

Un stub responde con un valor fijo o con una secuencia acordada de valores: `vi.fn().mockResolvedValue({ saldo: 10 })`. No evalúa si se le llamó ni cuántas veces. Si el código decide no usarlo, el test puede seguir pasando, porque la aserción se escribe sobre el resultado, no sobre la llamada.

Es la elección natural cuando la dependencia solo aporta datos: un reloj o una respuesta HTTP difícil de reproducir.

## Mock

Un mock parte de una expectativa escrita antes de ejecutar la acción: «esto debe llamarse una vez, con estos argumentos». Si la llamada no ocurre o llega con otros datos, el test falla aunque el resultado final parezca correcto.

Conviene cuando la interacción es lo que se quiere verificar: que se envíe el correo o se pase el identificador correcto. El riesgo es acoplar la prueba a detalles internos: un cambio inocuo en cómo se llama al colaborador puede romperla.

## Para qué sirve

Aíslan la unidad bajo test de red, reloj o sistema de archivos. Permiten ejercitar caminos difíciles de provocar —un error de red o una respuesta vacía— sin depender de servicios externos.

## Tipos de prueba

Aparecen sobre todo en pruebas unitarias, donde el colaborador se sustituye por completo; también en integración para controlar un adaptador y en componentes para simular peticiones.

## Ejemplo

```ts
const cliente = {
  obtener: vi.fn().mockResolvedValue({ saldo: 10 }),
};

const saldo = await consultarSaldo(cliente, "u-1");

expect(saldo).toBe(10);
expect(cliente.obtener).toHaveBeenCalledWith("u-1");
```

La primera aserción comprueba lo que entregó el stub; la segunda convierte el mismo doble en mock al verificar la interacción.

## Comparación

| Criterio | Stub | Mock |
|---|---|---|
| Qué aporta | Datos de entrada | Verificación de una interacción |
| Momento de la aserción | Sobre el resultado | Sobre la llamada |
| Si no se llega a usar | No avisa | Falla |
| Riesgo principal | Oculta una llamada incorrecta | Acopla el test a la implementación |

## Alternativas

- **Dummy**: solo ocupa la interfaz; no devuelve valores útiles ni registra llamadas.
- **Spy**: deja ejecutar la lógica real y anota cómo se llamó; la aserción se escribe después.
- **Fixture**: prepara el estado de partida, no sustituye a una dependencia.
