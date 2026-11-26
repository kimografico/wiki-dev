---
titulo: "Mock y stub"
resumen: "Dobles de prueba que sustituyen dependencias reales: el stub devuelve valores fijos y el mock además registra cómo se usó."
categoria: concepto
tags: ["tests"]
alias: []
relacionados: [dummy, spy, fixture, dobles-de-prueba]
fuentes:
  - "https://martinfowler.com/bliki/TestDouble.html"
  - "https://martinfowler.com/articles/mocksArentStubs.html"
autoenlace: true
alternativas: []
---
## Qué es

Dobles de prueba que sustituyen dependencias reales: el stub devuelve valores fijos y el mock además registra cómo se usó.

## Para qué sirve

Aíslan la unidad bajo test y permiten comprobar interacciones sin llamar a servicios externos.

## Tipos de prueba

Unitarias con dependencias de red, reloj o sistema de archivos.

## Ejemplo

```ts
const fetch = vi.fn().mockResolvedValue({ ok: true });
```

## Alternativas

- **Dummy**: solo ocupa la interfaz; no devuelve valores ni registra llamadas.
- **Spy**: deja ejecutar la lógica real y anota cómo se llamó; la aserción se escribe después.
- **Fixture**: prepara el estado de partida, no sustituye a una dependencia.

- **Fake**: implementación con un atajo que funciona, pero no es apta para producción; la comparativa Dobles de prueba lo describe junto a los demás.

La comparativa Dobles de prueba reúne las opciones con criterios para elegir.
