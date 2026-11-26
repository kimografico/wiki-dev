---
fecha: 2026-10-13
titulo: TypeScript
resumen: Superconjunto de JavaScript que añade tipos estáticos y se comprueba antes de ejecutar.
categoria: lenguaje
tags: [frontend, backend, nivel-0]
alias: [TS]
relacionados: [zod, bundler, tipos, interfaz]
alternativas: []
web: https://www.typescriptlang.org
fuentes:
  - "https://www.typescriptlang.org/docs/"
  - "https://www.typescriptlang.org/docs/handbook/2/generics.html"
  - "https://www.typescriptlang.org/docs/handbook/utility-types.html"
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
type Tema = "light" | "dark";

function alternar(tema: Tema): Tema {
  return tema === "light" ? "dark" : "light";
}
```

## Genéricos y tipos derivados

Un genérico es un parámetro de tipo: deja que quien llama decida el tipo concreto sin perder la relación entre entrada y salida.

```ts
function primero<T>(lista: T[]): T | undefined {
  return lista[0];
}
const nombre = primero(["Ada", "Grace"]); // string | undefined
```

El comprobador infiere `T` desde el argumento, así que escribir `primero<string>(...)` suele ser redundante. `extends` limita la familia admitida, por ejemplo `T extends { length: number }` para funciones que solo necesitan medir.

Para derivar tipos de otros tipos están las utilidades del propio TypeScript: `Partial<T>` hace opcionales las propiedades, `Pick<T, K>` selecciona claves reales de `T`, `Omit<T, K>` filtra las que se quitan, y `Record<K, V>` construye un objeto con **todas** las claves `K` y valores `V`. No son magia: se apoyan en `keyof`, tipos mapeados y condicionales.

```ts
type Pedido = { id: string; cliente: string; total: number };
type Resumen = Pick<Pedido, "id" | "total">;
type Borrador = Partial<Pedido>;
```

Son útiles para describir formularios y respuestas parciales sin copiar la interfaz entera. pedir una clave inexistente a `Pick` y a `Omit` no se comporta igual, así que conviene comprobar el resultado en el editor en lugar de darlo por sentado.

`type` permite uniones, intersecciones y tipos calculados; `interface` es más cómoda para contratos que se extienden o se reabren. Para casos equivalentes, la diferencia es sobre todo de estilo; la regla útil es elegir una y no mezclarlas en el mismo modelo.
