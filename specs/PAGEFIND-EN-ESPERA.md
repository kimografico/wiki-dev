# Pagefind: opción en espera

**Fecha:** 2026-11-25
**Estado:** En espera (*standby*) por decisión del autor. **No descartada.** **No es una tarea pendiente ni un trabajo sin terminar**: no hay implementación activa, no bloquea el build, el CI ni el despliegue, y solo se reactivaría con una orden explícita.

## Por qué existe este documento

El registro histórico de construcción (`specs/spec-construccion.md`, RF-08 y §10) describió una búsqueda de texto completo con Pagefind: índice generado tras el build sobre el HTML, alias indexables, filtros y una isla que usa la API JavaScript para poder ocultar aprendidas. La dependencia `pagefind` quedó en `package.json` (§8.1) y el paso de indexado está comentado en `.github/workflows/deploy.yml` (líneas 30–32). Nunca se instrumentó el HTML con `data-pagefind-*`.

Tras la adopción de Astro + islas nativas, el buscador vigente es `buscador.json`: un endpoint prerenderizado de ~15 KB que la isla pide con `fetch` y filtra en cliente. Este documento congela la comparación para que, si el tema vuelve a surgir, no haya que reconstruir el análisis. **No modifica las normas vigentes ni reabre un trabajo**: deja constancia de una opción tecnológica en espera.

## Qué aportaría Pagefind

| Ventaja | Ganancia concreta | Situación con `buscador.json` |
| ------- | ----------------- | ----------------------------- |
| Texto completo | Encontrar términos que solo viven en el cuerpo, p. ej. «base de datos» o «cacheable» en *Generación de sitio estático*. | El JSON solo lleva título, resumen, categoría, `tags` y `alias`; el cuerpo no se indexa. |
| Alias y título como metadata | «SSG» ↔ «Static Site Generation» indexado como metadata, con refuerzo del título (×5 por defecto). | Coincidencia literal por substring sobre `alias`; sin ponderación. |
| Idioma y acentos | `lang="es"` ya existe: Pagefind aplica stemming en español y normaliza diacríticos (`cafe` → `café`). | `includes()` es exacto: no empareja derivados ni acentos. |
| Relevancia y fragmentos | Orden BM25, fragmento con `<mark>` y subresultados que enlazan al `h2` más cercano. | Orden fijo de construcción del JSON y siempre el mismo resumen. |
| Facetas | `data-pagefind-filter` para colección, categoría y etiquetas, combinables con la consulta. | Solo existen los chips de colección. |
| Índice por fragmentos | Chunks cargados bajo demanda, `pagefind.preload()` mientras se escribe y búsqueda en Web Worker. | Un único fichero de 15 KB filtrado en el hilo principal; suficiente para 53 entradas. |

## Lo que ya está resuelto

- Las entradas **no** se serializan como props en el HTML de la portada (antes ~16 KB).
- No hay runtime de React: la búsqueda vive en un custom element nativo.
- Sigue siendo un sitio estático, sin backend ni servicio externo.
- El filtro actual ya incluye alias y respeta «solo pendientes».

## Límites conocidos del alcance actual

- No busca en el cuerpo de las fichas.
- No hay stemming ni normalización de acentos.
- No hay filtros por categoría ni por etiqueta.
- No hay fragmentos resaltados ni salto a secciones.
- La errata del ejemplo de RF-08 («zustnad» → Zustand) **no está garantizada**: Pagefind ofrece *prefix fallback* y similitud de términos en el ranking, pero el caso concreto habría que probarlo en el playground sobre el índice real.

## Si algún día se reactiva

1. Ejecutar `npx pagefind --site dist` tras `npm run build` (descomentar el `build-cmd` de `deploy.yml`).
2. Instrumentar las plantillas: `data-pagefind-body` en el `<article>` de las fichas, alias como texto oculto y `data-pagefind-filter` para colección/categoría/etiquetas. Ojo: si aparece `data-pagefind-body`, las páginas sin ese atributo dejan de indexarse.
3. Adaptar la isla a la API asíncrona: importar `${base}pagefind/pagefind.js`, ajustar `baseUrl`/`basePath` para `/wiki-dev/`, usar `debouncedSearch` + `result.data()`, `preload` y derivar el slug de la URL para ocultar aprendidas.
4. Verificar el caso «zustnad» en el playground antes de darlo por bueno.
5. Solo entonces revisar `specs/MANUAL.md`, `package.json`, el workflow de deploy y `specs/ANALISIS-ASTRO-VS-REACT.md` para reflejar la decisión.

**Criterio de reactivación:** tiene sentido si el corpus crece o si se quiere buscar dentro del contenido; no tiene sentido si se mantiene una búsqueda superficial sobre unas pocas decenas de entradas.

## Fuentes

- [Pagefind: indexado](https://pagefind.app/docs/indexing/)
- [Pagefind: API JavaScript](https://pagefind.app/docs/api/)
- [Pagefind: búsqueda multilingüe](https://pagefind.app/docs/multilingual/)
- [Pagefind: ranking](https://pagefind.app/docs/ranking/)
- [Pagefind: changelog](https://github.com/Pagefind/pagefind/blob/main/CHANGELOG.md)
