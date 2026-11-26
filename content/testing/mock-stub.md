---
titulo: "Mock y stub"
resumen: "Dobles de prueba que sustituyen dependencias reales: el stub devuelve valores fijos y el mock además registra cómo se usó."
categoria: concepto
tags: ["tests"]
alias: []
relacionados: []
fuentes: []
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

No hay una alternativa directa dentro del catálogo: la decisión depende del requisito concreto.
