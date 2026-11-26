---
fecha: 2026-10-13
titulo: Repository (patrón)
resumen: Patrón estructural que centraliza el acceso a los datos en un único módulo, de modo que el resto del código no consulta la fuente directamente.
categoria: concepto
tags: []
alias: [repositorio, patrón repository]
relacionados: [facade, content-collection, data-layer, adapter, provider]
familia: estructural
fuentes: ["https://martinfowler.com/eaaCatalog/repository.html"]
autoenlace: true
---

## Problema

Si cada página llama directamente a la fuente de datos, la forma de obtenerlos queda repetida en veinte sitios. Cambiar de API, añadir caché o meter un filtro obliga a tocarlos todos.

## Solución

Se concentra en un solo módulo las operaciones de lectura y escritura. El resto del código pide datos a ese módulo y nunca toca la fuente. Así se desacopla *qué* datos se necesitan de *cómo* se obtienen.

No es un patrón canónico de refactoring.guru: aquí se clasifica como estructural por analogía, porque separa el acceso a datos del resto del código. Su origen es el catálogo de patrones de empresa de Martin Fowler.

## Estructura

```
Páginas y componentes
        │  getEntrada(slug)
        ▼
   Repository  ──  único punto que conoce la fuente
        │
        ▼
   API / base de datos / sistema de archivos
```

## Ejemplo

```ts
// Único punto que conoce la fuente (astro:content):
export async function getEntrada(slug: string) {
  const todas = await getTodasLasEntradas();
  return todas.find((e) => e.slug === slug);
}
```

La regla del patrón es que nadie salta el repository: si una página importa la fuente directamente, la separación ya no existe.

## Cuándo usarlo

Cuando la fuente puede cambiar, cuando hay varias formas de acceder a los mismos datos o cuando conviene tests que sustituyan la fuente por un doble. No aporta gran cosa en un script pequeño con una sola lectura: la abstracción se paga y aquí no se amortiza.

## En esta wiki

La capa de contenido funciona como repository: `src/lib/content/` es el único sitio que importa `astro:content`. Se confunde con Facade: el repositorio encapsula el acceso a los datos; la fachada simplifica cualquier sistema complejo, no solo el dato.

## Se confunde con

- **Adapter**: el repositorio define una interfaz de acceso a datos y concentra las operaciones; el adaptador traduce una interfaz incompatible. Un repositorio puede apoyarse en un adaptador para hablar con la fuente.
- **Provider**: entrega una instancia ya creada a quien la pide; el repositorio agrupa las operaciones de lectura y escritura.
- **Data Layer**: es la responsabilidad amplia de obtener y preparar datos; el repositorio es una forma de organizar esa responsabilidad.
