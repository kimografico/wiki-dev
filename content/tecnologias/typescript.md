---
titulo: TypeScript
resumen: Superconjunto de JavaScript que añade tipos estáticos y se comprueba antes de ejecutar.
categoria: lenguaje
tags: [frontend, backend]
alias: [TS]
relacionados: [zod, bundler]
alternativas: []
web: https://www.typescriptlang.org
fuentes: [https://www.typescriptlang.org/docs/]
---

## Qué es

TypeScript es JavaScript con tipos. El código se escribe en `.ts` (o `.tsx` con React) y un comprobador verifica que los tipos encajen antes de ejecutar nada; después se compila a JavaScript normal.

## Para qué sirve

Detecta errores de tipos mientras escribes, documenta la forma de los datos y hace que refactorizar sea más seguro: el editor avisa de lo que se rompe al cambiar una pieza.

## Cuándo usarla

En casi cualquier proyecto que vaya a crecer o a tocar varias personas. Aquí sostiene los esquemas de contenido, las islas y los scripts de build.

## Cuándo no

En prototipos desechables o scripts de una sola línea, los tipos añaden ceremonia sin aprovecharse. En este proyecto no aplica: los tipos son parte de las reglas.

## Alternativas

JavaScript puro es la alternativa directa (sin comprobación de tipos); el tipado con JSDoc permite anotar sin compilar, a costa de menos potencia.

## Ejemplo

```ts
type Estado = "light" | "dark";

function alternar(tema: Tema): Tema {
  return tema === "light" ? "dark" : "light";
}
```
