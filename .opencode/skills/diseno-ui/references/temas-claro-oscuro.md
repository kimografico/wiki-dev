# Temas claro y oscuro

Contenido: [Arquitectura](#1-arquitectura) · [Sin parpadeo](#2-sin-parpadeo-al-cargar) · [Selector](#3-selector-de-tema) · [Tailwind](#4-tailwind) · [Código resaltado](#5-código-resaltado) · [Imágenes y elevación](#6-imágenes-elevación-y-color) · [Checklist](#7-checklist)

## 1. Arquitectura

Tres estados: **sistema** (por defecto), **claro** y **oscuro**.

1. Los componentes solo usan tokens semánticos (`--color-bg`, `--color-text`, `--color-accent`…), nunca colores sueltos.
2. `assets/tokens.css` define los valores:
   - `:root` → claro.
   - `@media (prefers-color-scheme: dark) { :root:not([data-theme='light']) { … } }` → oscuro si el sistema lo pide y el usuario no ha forzado claro.
   - `[data-theme='dark'] { … }` → oscuro forzado por el usuario.
3. `color-scheme: light dark` en `:root` hace que controles nativos, barras de scroll y el fondo por defecto sigan el tema.
4. En el `<head>`:
   ```html
   <meta name="color-scheme" content="light dark">
   <meta name="theme-color" content="#f4f4f2" media="(prefers-color-scheme: light)">
   <meta name="theme-color" content="#111110" media="(prefers-color-scheme: dark)">
   ```

> Los valores oscuros están duplicados (en el `@media` y en `[data-theme='dark']`) porque CSS no permite compartir un bloque entre ambos selectores sin un preprocesador. Si molesta, genéralos desde un único origen con un script de build o una mixin de Sass. Mientras tanto, cualquier cambio de un token se hace en **los dos** sitios.

## 2. Sin parpadeo al cargar

Si el usuario eligió un tema explícito, hay que aplicarlo **antes del primer pintado**. Un script síncrono y diminuto en el `<head>`:

```astro
<script is:inline>
  // ASTRO: is:inline evita que Astro procese o empaquete el script y lo deja tal cual en el <head>,
  //   de modo que se ejecuta antes de pintar (si no, habría un destello del tema equivocado).
  // REACT+VITE: lo pondrías como <script> en index.html, antes del bundle.
  (() => {
    try {
      const guardado = localStorage.getItem('tema'); // 'claro' | 'oscuro' | null (sistema)
      if (guardado === 'claro') document.documentElement.dataset.theme = 'light';
      if (guardado === 'oscuro') document.documentElement.dataset.theme = 'dark';
    } catch { /* localStorage no disponible: se usa el tema del sistema */ }
  })();
</script>
```

Con "sistema" no se escribe `data-theme`: manda el `@media`.

## 3. Selector de tema

Requisitos: tres opciones, operable con teclado, estado anunciado, persistencia en `localStorage`, nombre accesible.

```html
<fieldset class="theme-switch">
  <legend class="visually-hidden">Tema de color</legend>
  <label><input type="radio" name="tema" value="sistema" checked> Sistema</label>
  <label><input type="radio" name="tema" value="claro"> Claro</label>
  <label><input type="radio" name="tema" value="oscuro"> Oscuro</label>
</fieldset>
```

```js
// Es una isla pequeña (o un script) que se ejecuta en el cliente.
// ASTRO: un <script> de página se empaqueta y se ejecuta en el cliente sin hidratar componentes.
// REACT+VITE: sería un componente con useState/useEffect.
const raiz = document.documentElement;
const aplicar = (valor) => {
  if (valor === 'claro') raiz.dataset.theme = 'light';
  else if (valor === 'oscuro') raiz.dataset.theme = 'dark';
  else delete raiz.dataset.theme;           // sistema
  try { valor === 'sistema' ? localStorage.removeItem('tema') : localStorage.setItem('tema', valor); } catch {}
};
document.querySelectorAll('input[name="tema"]').forEach((r) =>
  r.addEventListener('change', () => aplicar(r.value)));
```

Transición del cambio: opcional y breve (ver `animacion.md`), solo cuando el usuario cambia el tema, nunca en la carga inicial.

## 4. Tailwind

Los nombres de las variables (`--color-bg`, `--color-text`, `--color-accent`, `--font-sans`, `--font-mono`…) siguen la convención de espacios de nombres del tema de Tailwind v4, así que el mismo archivo hace de tema:

```css
/* Ejemplo orientativo para Tailwind v4: verifica la sintaxis en la versión instalada */
@import 'tailwindcss';

@theme {
  /* Valores del tema claro. Las utilidades (bg-bg, text-text, border-border…)
     leen var(--color-*) en tiempo de ejecución. */
  --color-bg: #f4f4f2;
  --color-surface: #ffffff;
  /* …resto de tokens claros de assets/tokens.css */
}

/* Los overrides del tema oscuro se quedan como CSS normal, fuera de @theme:
   [data-theme='dark'] { --color-bg: #111110; … } */
```

Como las utilidades referencian la variable, cambiarla bajo `[data-theme='dark']` (o bajo el `@media`) cambia todo sin variantes `dark:`. Uso: `class="bg-bg text-text border-border"`. Si el portfolio ya declara estos tokens en `@theme`, reutiliza ese archivo en lugar de duplicarlo.

## 5. Código resaltado

Astro usa Shiki. Para soportar ambos temas con variables CSS (comprueba los nombres de opciones en la versión instalada):

```js
// astro.config.mjs — orientativo
export default defineConfig({
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false, // genera variables CSS en vez de fijar un color
    },
  },
});
```
```css
/* Con defaultColor: false, cada token expone --shiki-light y --shiki-dark */
.astro-code, .astro-code span { color: var(--shiki-light); background-color: var(--color-surface); }
[data-theme='dark'] .astro-code,
[data-theme='dark'] .astro-code span { color: var(--shiki-dark); }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) .astro-code,
  :root:not([data-theme='light']) .astro-code span { color: var(--shiki-dark); }
}
```
Después de elegir los temas, **comprueba el contraste de cada color de token** sobre `--color-surface`: algunos temas populares no llegan a 4,5:1 en comentarios o cadenas. Si fallan, ajusta o elige otro tema.

## 6. Imágenes, elevación y color

- **Diagramas y capturas:** preferir SVG con `currentColor` o variables CSS; si es un PNG con fondo blanco, ponerlo sobre un panel claro en oscuro (con borde) en lugar de dejarlo "flotando" brillante.
- **Elevación en oscuro:** se expresa con superficies más claras (`--color-surface`, `--color-bg`) y bordes, no con sombras.
- **Acento en oscuro:** más claro y algo menos saturado que en claro, para evitar vibración sobre fondo oscuro.
- **Blancos y negros:** ni `#000` ni `#fff` para texto largo; usa los tokens.
- **Semánticos:** mismos significados en ambos temas, con ajuste de luminosidad (los del tema oscuro son más claros).

## 7. Checklist

- [ ] Ningún componente usa un hex suelto.
- [ ] Todo texto normal usa colores `-text` (`--color-muted-text`, `--color-accent-text`…), no los colores base.
- [ ] Cada token nuevo existe en claro **y** en oscuro (en el `@media` y en `[data-theme='dark']`).
- [ ] Contraste verificado en ambos temas (texto 4,5:1; controles y estados 3:1).
- [ ] Sin parpadeo al recargar con tema forzado.
- [ ] Selector con tres estados, teclado y persistencia.
- [ ] Código resaltado legible en ambos temas.
- [ ] Imágenes y diagramas revisados en oscuro.
- [ ] `meta color-scheme` y `theme-color` presentes.
