---
name: diseno-ui
description: Diseño visual y UX de la wiki (Astro + Tailwind) con tema claro/oscuro, accesibilidad WCAG 2.2 AA y animaciones sutiles. Úsala siempre que se cree o modifique cualquier interfaz - páginas, layouts, componentes, estilos, tokens, tipografía, colores, modo oscuro, animaciones o transiciones - y cuando se pida "mejorar el aspecto", "hacerlo más bonito", revisar accesibilidad o contraste, aunque el usuario no mencione "diseño". No la uses para redactar contenido de las entradas.
---

# Diseño UI de la wiki

Esta skill guía cómo se ve y se siente la interfaz. Se apoya en la skill `frontend-design` (dirección estética propia, tipografía deliberada, contención) y añade lo específico de este proyecto: una wiki de **lectura**, con tema claro y oscuro, accesibilidad AA y movimiento discreto.

## Principio rector

La wiki existe para que un junior entienda algo rápido. Por eso el orden de prioridades es: **legibilidad → accesibilidad → coherencia → personalidad**. La personalidad importa, pero se gasta en un solo sitio (por ejemplo, el tratamiento tipográfico de los títulos o la identidad visual de cada tipo de entrada) y el resto se mantiene silencioso y disciplinado. Antes de dar un diseño por terminado, quita un elemento decorativo.

## Proceso

### 0. Contexto
Lee, si existen: `AGENTS.md`, `specs/spec.md`, `src/styles/tokens.css` y cualquier documento de dirección visual (`docs/design/`). Respeta lo que ya esté decidido: la palabra del autor manda sobre los valores por defecto de esta skill.

### 1. Identidad visual (ya decidida: "Studio Edition")
La wiki comparte identidad con el portfolio del autor (kimografico.com): grises piedra fríos, bermellón como acento y tinta profunda, con DM Sans y JetBrains Mono. **No propongas otra paleta ni otras familias.** Los valores y los nombres de variable están en `assets/tokens.css` (copiar a `src/styles/tokens.css`).

Lo que sí decides en cada tarea es la composición: jerarquía, layout y dónde gastar la audacia. Si la tarea exige algo que los tokens no cubren (un color nuevo, una familia extra), pregunta antes al autor y nómbralo con la misma convención (`--color-*`, `--font-*`).

**Uso de los acentos en la wiki** (propuesto; confirmar con el autor la primera vez):

| Token | Uso |
|-------|-----|
| `--color-accent` | Acento principal: enlaces, foco, botón principal, elemento activo |
| `--color-dev` | Entradas y categorías técnicas (frameworks, librerías, estado, herramientas) |
| `--color-design` | Categorías de estilos, UI y UX; avisos de atención |
| `--color-cta` | Acciones positivas: confirmaciones, consejos, «copiado» |

**Regla de contraste de la paleta.** Los colores base sirven para rellenos, iconos, bordes y texto grande. Para texto normal usa siempre la variante `-text` (`--color-accent-text`, `--color-design-text`, `--color-cta-text`, `--color-muted-text`; `--color-dev-text` ya cumple). En claro, `--color-design` (≈ 2,9:1) y `--color-cta` (≈ 3,4:1) no llegan a AA como texto, y `--color-accent` y `--color-muted` se quedan justo por debajo sobre `--color-bg`. En oscuro, el texto sobre el acento es `--color-on-accent` (tinta, no blanco).

### 2. Tokens, nunca valores sueltos
Todo color, espaciado, radio, duración y easing sale de variables CSS semánticas (`--color-bg`, `--color-text`, `--color-accent`, `--dur-2`…), no de hex en los componentes. Así el tema oscuro funciona sin tocar nada y un cambio de identidad se hace en un solo archivo. Con Tailwind, los nombres `--color-*` y `--font-*` coinciden con los del tema de Tailwind v4: no hace falta duplicarlos ni usar variantes `dark:` en componentes (ver `references/temas-claro-oscuro.md`).

### 3. Construir
Aplica las reglas de abajo y consulta las referencias según el caso. Construye primero el HTML semántico y funcional con teclado; después el estilo; al final el movimiento.

### 4. Verificar (obligatorio antes de dar por hecho)
- [ ] Contraste de cada par nuevo (`node scripts/contrast.mjs <texto> <fondo>`), en claro **y** oscuro.
- [ ] Navegación solo con teclado: orden lógico, foco siempre visible y no tapado por cabeceras fijas.
- [ ] Reflujo a 320 px de ancho y zoom 200 %: sin scroll horizontal (salvo código y tablas, que tienen su propio contenedor).
- [ ] `prefers-reduced-motion: reduce` activado: no hay desplazamiento ni escalado.
- [ ] Ambos temas revisados a ojo (no solo contraste: imágenes, bordes, código, avisos).
- [ ] Una herramienta automática (axe o Lighthouse) sin errores. Detecta solo una parte de los problemas, así que no sustituye a los puntos anteriores.

### 5. Crítica
Mira el resultado como un diseñador externo: ¿hay algo repetido sin motivo, algo que compita con el contenido, algo que no aporte información? Corrígelo antes de entregar.

## Reglas de diseño

**Tipografía**
- Cuerpo ≥ 1 rem (17 px por defecto), interlineado 1,6–1,7, medida de 60–75 caracteres (`max-width: 68ch`). Las serif llevan algo más de interlineado.
- Escala definida en tokens; jerarquía con tamaño y peso, no solo con color.
- Familias fijas: **DM Sans** (`--font-sans`) para texto e interfaz y **JetBrains Mono** (`--font-mono`) para código. Autoalojadas (por ejemplo con Fontsource; comprueba el nombre de familia que declara el paquete), woff2, solo los pesos y subconjuntos necesarios, `font-display: swap` y precarga de la fuente del cuerpo.
- Código en monoespaciada con ligaduras desactivadas; tamaño ≥ 0,9 rem.

**Color**
- Paleta Studio Edition (§1). Los significados (consejo, nota, atención, peligro) reutilizan los acentos y **nunca** se transmiten solo con color: llevan icono y etiqueta de texto. No se crean colores semánticos nuevos.
- No uses negro puro sobre blanco puro para texto largo ni blanco puro sobre negro: usa los tokens.

**Layout**
- Columna de lectura centrada o con índice lateral (tabla de contenidos) en pantallas anchas; una columna en móvil.
- Estructura visual = información: bordes, separadores y etiquetas solo si codifican algo. No numeres si no hay secuencia real.
- Radios y sombras con intención: en oscuro, la elevación se expresa con superficies más claras, no con sombras.
- Evita convertir todo en tarjetas idénticas; la jerarquía se construye con espacio y tipografía.

**Componentes propios de la wiki**
- *Ficha:* título, `resumen`, insignias de categoría y nivel (texto visible, no solo color), contenido, relacionados, "Mencionado en".
- *Aviso* (`<Aviso>`): icono + etiqueta textual + color: Consejo → `--color-cta`, Nota → `--color-dev`, Atención → `--color-design`, Peligro → `--color-accent`; el texto usa la variante `-text`. Contraste AA en ambos temas.
- *Bloque de código:* resaltado con tema claro y oscuro, desplazable con teclado, botón de copiar con nombre accesible y confirmación en región `aria-live`.
- *Tabla comparativa:* `<caption>`, `scope`, contenedor con scroll horizontal alcanzable por teclado.
- *Búsqueda:* `role="search"`, etiqueta visible o accesible, número de resultados anunciado de forma educada.
- *Selector de tema:* tres estados (sistema, claro, oscuro), accesible, con persistencia.

**Microcopy** (de `frontend-design`): español claro, voz activa, frase con mayúscula inicial solo al principio, el mismo nombre para la misma acción en todo el flujo, errores que explican qué pasó y cómo arreglarlo, estados vacíos que invitan a actuar.

## Referencias (léelas cuando toque)
- `references/accesibilidad-wcag-aa.md` — criterios WCAG 2.2 AA aplicados a la wiki, patrones por componente y cómo probarlos.
- `references/temas-claro-oscuro.md` — arquitectura de temas, sin parpadeo, selector, Tailwind, código resaltado e imágenes.
- `references/animacion.md` — catálogo de movimientos sutiles, tokens de duración y easing, `prefers-reduced-motion`.
- `assets/tokens.css` — tokens Studio Edition (los del portfolio + variantes `-text` accesibles, foco, espaciado, movimiento).
- `scripts/contrast.mjs` — calculadora de contraste WCAG.

## Integración con el proyecto
- Todo uso de algo específico de Astro (`<ClientRouter />`, `is:inline`, `define:vars`, `<style is:global>`, directivas `client:*`) lleva el comentario `ASTRO: … / REACT+VITE: …` (skill `equivalencia-react`).
- La lógica de estilo vive en `src/components/`, `src/layouts/` y `src/styles/`; no se importa `astro:content` desde componentes visuales (regla de `design-pattern.md`).
- Si el diseño introduce un concepto nuevo del proyecto (token, `prefers-reduced-motion`, contraste AA…), se añade al glosario del README (skill `actualizar-glosario-readme`).

## Evitar (tics de diseño genérico)
- Fondo crema + serif de contraste + acento terracota, o negro con un único verde ácido: solo si el autor lo pide.
- Una etiqueta en mayúsculas espaciadas sobre cada título; cadenas con puntos medios (`A · B · C`); flechas `→` añadidas a todos los enlaces.
- Resaltar una sola palabra del titular con color o cursiva.
- Entradas con fundido y desplazamiento hacia arriba en cada sección, o `hover` animado en cada tarjeta.
- Degradados decorativos y sombras idénticas bajo todo.
- Texto gris claro sobre blanco "por elegancia": si no pasa AA, no se usa.
