---
name: escribir-tests
description: Escribe o ajusta los tests unitarios colocados (*.test.ts) de la lógica TypeScript (src/lib/** y scripts/**) con Vitest y cobertura >= 90%. Úsala solo a petición explícita del autor, al cierre de un trabajo ya validado funcionalmente.
---

# escribir-tests

Cierra una fase o un cambio de lógica escribiendo los tests que falten, **solo cuando el autor lo pide** (spec.md §11). Nunca tras cada cambio.

## Dónde van

- **Colocados junto al módulo**, con extensión `.test.ts` (definido en `vitest.config.ts`):
  `src/lib/markdown/remark-menciones.test.ts` prueba `src/lib/markdown/remark-menciones.ts`.
- La cobertura se mide sobre `src/lib/**` y `scripts/**` (se excluyen `.astro`, páginas, stories, configuración).
- No se crea una carpeta `tests/` aparte.

## Cómo probar cada tipo de módulo

- **TS puro** (`esquemas.ts`, `tema.ts`): importa y ejercita la API; ramas de error incluidas.
- **`astro:content`** (`entradas.ts`, `glosario.ts`): `vi.hoisted` + `vi.mock("astro:content", …)` con `getCollection`/`render` falsos. Nunca ejecutes Astro real.
- **Sistema de archivos** (`indice-menciones.ts`): crea un directorio temporal (`mkdtemp`) con `content/<coleccion>/*.md` y pasa su ruta como `raiz`.
- **Plugins de remark** (`remark-menciones.ts`): pásale un `indice` construido a mano en las opciones y un árbol mdast mínimo `{ type: "root", children: [...] }`.
- **CLI** (`validate-content.ts`): llama a `validarContenido(raiz)` con un temporal; no ejecutes `process.exit`.
- **Globales del navegador** (`localStorage`, `matchMedia`, `document`): `vi.stubGlobal` con objetos falsos.

## Reglas

- Un test por comportamiento observable; nombres en español, en imperativo.
- No mocks de más: solo se sustituye lo externo (Astro, reloj, almacenamiento, fs).
- Al terminar: `npm run test:coverage` debe pasar con **cobertura >= 90 %** en las cuatro métricas, y `npm run check|lint|format:check` deben quedar limpios.
- Nunca uses `--no-verify`.
