# Animación sutil y elegante

Contenido: [Principios](#1-principios) · [Tokens](#2-tokens-de-movimiento) · [Catálogo](#3-catálogo-de-patrones) · [Movimiento reducido](#4-movimiento-reducido) · [Accesibilidad](#5-accesibilidad-y-rendimiento) · [Checklist](#6-checklist)

## 1. Principios

La wiki es de lectura: el movimiento no es protagonista. Debe **explicar un cambio** (algo se abrió, se copió, se cambió de tema) o dar **una sola** entrada cuidada. Criterio de `frontend-design`: el movimiento que responde a una acción de la persona es bienvenido; el que ocurre solo se usa con moderación y para dirigir la atención.

1. **Útil antes que bonito.** Si quitar la animación no pierde información, pregúntate si hace falta.
2. **Corto y con inercia.** Entradas con `ease-out` (rápidas al inicio, suaves al final); salidas más cortas que las entradas.
3. **Un momento orquestado** por página como máximo. Nada de desvanecer y subir cada sección al hacer scroll.
4. **Solo propiedades baratas:** `opacity` y `transform` (y cambios de color en elementos pequeños). No animar `width`, `height`, `top`, `left`, `margin` ni sombras grandes.
5. **Sin extras que distraigan:** nada de rebotes, elásticos, paralaje, bucles infinitos ni parpadeos.
6. **Todo respeta `prefers-reduced-motion`.**

## 2. Tokens de movimiento

Definidos en `assets/tokens.css`:

| Token | Valor | Uso |
|-------|-------|-----|
| `--dur-1` | 120 ms | Hover, foco, pulsado |
| `--dur-2` | 200 ms | Abrir/cerrar, confirmaciones, cambio de tema |
| `--dur-3` | 320 ms | Entrada de página (único momento) |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entradas y casi todo |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Cambios de posición o tamaño |

Regla: nada por encima de 400 ms salvo la entrada de página, y nunca por encima de 500 ms.

## 3. Catálogo de patrones

### 3.1 Estados interactivos (hover, foco, pulsado)
Cambios de color y de borde en `--dur-1`; desplazamiento de como mucho 1–2 px. El foco **no** se anima: aparece al instante.

```css
.btn {
  transition: background-color var(--dur-1) var(--ease-out),
              border-color var(--dur-1) var(--ease-out),
              transform var(--dur-1) var(--ease-out);
}
.btn:hover  { background-color: var(--color-bg); }
.btn:active { transform: translateY(1px); }
```
Las acciones con `hover` nunca deben ser la única forma de acceder a algo (en táctil no existe).

### 3.2 Desplegables (acordeón, tabla de contenidos móvil, menú)
La técnica de filas de rejilla evita animar `height`:

```css
.desplegable { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur-2) var(--ease-in-out); }
.desplegable[data-abierto="true"] { grid-template-rows: 1fr; }
.desplegable > .contenido { overflow: hidden; }
```
Sincroniza `aria-expanded` en el botón. Si se usa `<details>`, puede abrirse sin animación; la animación es opcional.

### 3.3 Entrada de página (el único momento orquestado)
Título, resumen e insignias aparecen con un fundido y un desplazamiento de 8 px, escalonados como máximo 60 ms entre sí y solo tres elementos. Solo en la carga de la ficha o de la portada, no en cada sección.

```css
@media (prefers-reduced-motion: no-preference) {
  .entrada > * { animation: aparecer var(--dur-3) var(--ease-out) both; }
  .entrada > :nth-child(2) { animation-delay: 60ms; }
  .entrada > :nth-child(3) { animation-delay: 120ms; }
}
@keyframes aparecer { from { opacity: 0; transform: translateY(8px); } }
```
El contenido nunca debe quedar invisible si el CSS de animación falla: el estado final es el estado normal.

### 3.4 Transición entre páginas
Mejora progresiva: si el navegador no la soporta, la navegación funciona igual.

```css
/* Transiciones entre documentos (MPA). Verifica el soporte actual de los navegadores. */
@view-transition { navigation: auto; }
::view-transition-old(root), ::view-transition-new(root) { animation-duration: var(--dur-2); }
@media (prefers-reduced-motion: reduce) { @view-transition { navigation: none; } }
```
```astro
---
// ASTRO: <ClientRouter /> (antes <ViewTransitions />) activa las transiciones y la navegación sin recarga completa.
// REACT+VITE: lo equivalente es React Router (+ la API View Transitions del navegador) en una SPA.
// Verifica el nombre del componente en la versión instalada de Astro.
---
```
Usa una de las dos vías, no ambas. Con `<ClientRouter />` hay que revisar que los scripts (selector de tema, búsqueda) se reinicien tras cada navegación.

### 3.5 Confirmaciones (copiar código, tema cambiado)
Pequeño fundido (`--dur-2`) del texto «Copiado», que se mantiene visible unos 2 s y desaparece. El anuncio para lectores de pantalla va en una región `aria-live="polite"` aparte, sin depender de la animación.

### 3.6 Cambio de tema
Suavizado de color solo cuando lo provoca el usuario:

```css
html.cambiando-tema, html.cambiando-tema *, html.cambiando-tema *::before, html.cambiando-tema *::after {
  transition: background-color var(--dur-2) var(--ease-in-out), color var(--dur-2) var(--ease-in-out),
              border-color var(--dur-2) var(--ease-in-out) !important;
}
```
```js
// Al cambiar el tema: añadir la clase, aplicar el tema y quitar la clase tras ~250 ms.
// Nunca en la carga inicial: provocaría un destello de transición.
```

### 3.7 Búsqueda
Los resultados aparecen con un fundido muy corto (≤ `--dur-2`) sin desplazamiento. El recuento («12 resultados») se actualiza sin animar y se anuncia por `aria-live`.

### 3.8 Indicador de progreso de lectura (opcional)
Decorativo, con `aria-hidden="true"`. Mejora progresiva con animación guiada por scroll:

```css
@supports (animation-timeline: scroll()) {
  .progreso { transform-origin: left; animation: crecer linear both; animation-timeline: scroll(root); }
  @keyframes crecer { from { transform: scaleX(0); } to { transform: scaleX(1); } }
}
@media (prefers-reduced-motion: reduce) { .progreso { display: none; } }
```

## 4. Movimiento reducido

`tokens.css` incluye una red de seguridad global que reduce duraciones a ~0 con `prefers-reduced-motion: reduce`. Además, en cada patrón:

- **Entradas:** envolverlas en `@media (prefers-reduced-motion: no-preference)` (el estado por defecto es "sin animación").
- **Movimiento → fundido o nada:** si se mantiene algo, que sea un cambio de opacidad, sin desplazamiento ni escala.
- **Scroll suave:** solo con `no-preference`.
- **JavaScript:** `window.matchMedia('(prefers-reduced-motion: reduce)').matches` antes de lanzar animaciones programáticas.

## 5. Accesibilidad y rendimiento

- **WCAG 2.2.2:** sin movimiento automático de más de 5 s sin control para pausarlo (por eso no hay bucles).
- **WCAG 2.3.1:** nada parpadea más de 3 veces por segundo.
- **WCAG 2.3.3** (AAA, no obligatorio): respetar `prefers-reduced-motion` ya cubre su espíritu.
- No transmitir información solo con movimiento.
- `will-change` solo de forma puntual y retirado al terminar; abusar de él consume memoria.
- Probar en un equipo modesto o con la CPU ralentizada en las herramientas del navegador: si no va a 60 fps, se simplifica.

## 6. Checklist

- [ ] Solo `opacity`/`transform` (o color en elementos pequeños).
- [ ] Duraciones y easings salen de los tokens; ninguna supera 500 ms.
- [ ] A lo sumo un momento orquestado por página.
- [ ] Con `prefers-reduced-motion: reduce` no hay desplazamiento ni escalado.
- [ ] El contenido es visible y funcional si la animación falla o no se soporta.
- [ ] Ninguna animación es la única señal de un cambio de estado (hay texto o `aria-live`).
- [ ] Sin bucles, rebotes ni parpadeos.
- [ ] Todo uso específico de Astro (`ClientRouter`, `is:inline`, etc.) lleva su comentario `ASTRO / REACT+VITE`.
