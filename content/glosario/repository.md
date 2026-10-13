---
titulo: Repository (patrón)
resumen: Patrón que centraliza el acceso a los datos en un único módulo, de modo que el resto del código no consulta la fuente directamente.
categoria: concepto
tags: []
alias: [repositorio, patrón repository]
relacionados: [facade, content-collection]
terminoEn: Repository pattern
---

## Definición

El patrón *repository* concentra en un solo lugar las operaciones de lectura (y escritura) de datos. El resto del código pide datos a ese módulo y nunca toca la fuente original.

## Por qué importa

Desacopla *qué* datos se necesitan de *cómo* se obtienen. Si mañana se cambia de framework o de fuente, se reescribe el repository y las páginas apenas se tocan.

## Ejemplo

```ts
// Único punto que conoce la fuente (astro:content):
export async function getEntrada(slug: string) {
  const todas = await getTodasLasEntradas();
  return todas.find((e) => e.slug === slug);
}
```

## Se confunde con

Con consultar la fuente desde cualquier parte. La regla del patrón es que **nadie** salta el repository: así el acoplamiento queda en un solo archivo.
