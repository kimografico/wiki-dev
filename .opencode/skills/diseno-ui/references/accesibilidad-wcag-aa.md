# Accesibilidad WCAG 2.2 AA aplicada a la wiki

Objetivo: cumplir **WCAG 2.2 nivel AA** (incluye los criterios de 2.0 y 2.1). Contenido:

1. [Criterios y cómo se cumplen aquí](#1-criterios-y-cómo-se-cumplen-aquí)
2. [Patrones por componente](#2-patrones-por-componente)
3. [Cómo probar](#3-cómo-probar)

---

## 1. Criterios y cómo se cumplen aquí

### Perceptible
| Criterio | Qué exige | En esta wiki |
|----------|-----------|--------------|
| 1.1.1 Contenido no textual | Alternativa textual a imágenes | `alt` descriptivo; `alt=""` si es decorativa; diagramas con descripción en el texto |
| 1.3.1 Información y relaciones | La estructura se expresa en el marcado | Un solo `<h1>`, jerarquía sin saltos, `<nav>`, `<main>`, `<article>`, listas y tablas semánticas |
| 1.3.2 Secuencia con significado | El orden del DOM tiene sentido | Contenido antes que elementos accesorios; no reordenar con CSS lo que cambie el sentido |
| 1.3.4 Orientación | No bloquear vertical/horizontal | Sin `orientation` forzada |
| 1.3.5 Propósito de la entrada | `autocomplete` en datos personales | Aplica solo si hay formularios con datos del usuario |
| 1.4.1 Uso del color | El color no es el único canal | Insignias y avisos con texto e icono; enlaces subrayados |
| 1.4.3 Contraste (mínimo) | Texto 4,5:1 (grande 3:1) | Texto con las variantes `-text`; pares verificados con `scripts/contrast.mjs`, en ambos temas |
| 1.4.4 Cambio de tamaño | Hasta 200 % sin perder contenido | Unidades `rem`/`ch`, nunca `px` para texto |
| 1.4.5 Imágenes de texto | Evitarlas | Texto real; el logotipo es la excepción |
| 1.4.10 Reflujo | Sin scroll en 2 dimensiones a 320 px | Una columna en móvil; código y tablas con contenedor propio con `overflow-x: auto` |
| 1.4.11 Contraste no textual | 3:1 en controles y estados | `--color-border-strong`, `--color-focus` y los iconos informativos cumplen 3:1 |
| 1.4.12 Espaciado del texto | Soportar interlineado 1,5, párrafos 2 em, letras 0,12 em, palabras 0,16 em | Sin alturas fijas en bloques de texto; probar con un marcador de espaciado |
| 1.4.13 Contenido al pasar el ratón o foco | Descartable, "hoverable", persistente | Tooltips y menús: se cierran con `Esc`, el puntero puede entrar en ellos |

### Operable
| Criterio | Qué exige | En esta wiki |
|----------|-----------|--------------|
| 2.1.1 Teclado | Todo es operable con teclado | Elementos nativos (`button`, `a`, `details`); sin `div` con `onclick` |
| 2.1.2 Sin trampas | Se puede salir con teclado | Menús y diálogos se cierran con `Esc` y devuelven el foco |
| 2.2.2 Pausar, detener, ocultar | Movimiento automático > 5 s necesita control | No hay animaciones infinitas; si las hubiera, botón de pausa |
| 2.3.1 Tres destellos | Nada parpadea más de 3 veces por segundo | Sin parpadeos |
| 2.4.1 Saltar bloques | Mecanismo para saltar la navegación | Enlace "Saltar al contenido" (`.skip-link`) |
| 2.4.2 Título de página | Títulos descriptivos | `<title>`: «Entrada — Wiki» |
| 2.4.3 Orden del foco | Lógico | Orden del DOM = orden visual |
| 2.4.4 Propósito del enlace | Claro por su texto | Nada de «pulsa aquí»; el texto del enlace dice a dónde va |
| 2.4.5 Varias vías | Más de una forma de llegar | Navegación por categorías + búsqueda + índices |
| 2.4.6 Encabezados y etiquetas | Descriptivos | Encabezados que describen su sección |
| 2.4.7 Foco visible | Indicador visible | `:focus-visible` con contorno de 2 px y desplazamiento de 2 px |
| **2.4.11 Foco no oculto (mínimo)** (2.2) | El foco no queda tapado por contenido fijo | `scroll-padding-top` ≥ altura de la cabecera fija |
| **2.5.7 Movimientos de arrastre** (2.2) | Alternativa a arrastrar | No hay interacciones de arrastre |
| **2.5.8 Tamaño del objetivo (mínimo)** (2.2) | ≥ 24×24 px (o separación suficiente) | Controles de 44 px de mínimo |

### Comprensible
| Criterio | Qué exige | En esta wiki |
|----------|-----------|--------------|
| 3.1.1 Idioma de la página | `lang` | `<html lang="es">` |
| 3.1.2 Idioma de las partes | Marcar cambios de idioma | Términos y títulos en inglés con `lang="en"` cuando sean frases (no hace falta en nombres propios de tecnología) |
| 3.2.1 / 3.2.2 Al recibir foco / entrada | Sin cambios inesperados | Filtros y búsqueda no navegan al cambiar un valor sin aviso |
| 3.2.3 / 3.2.4 Navegación e identificación coherentes | Mismo orden y mismos nombres | Cabecera y pie idénticos; mismo nombre para la misma acción |
| **3.2.6 Ayuda coherente** (2.2, A) | Ayuda en el mismo lugar | Si hay enlace de ayuda o contacto, siempre en el mismo sitio |
| 3.3.1 / 3.3.2 Errores y etiquetas | Identificar errores, etiquetar campos | El campo de búsqueda tiene etiqueta |
| **3.3.7 Entrada redundante** (2.2, A) | No pedir dos veces lo mismo | No aplica salvo formularios futuros |

### Robusto
| Criterio | Qué exige | En esta wiki |
|----------|-----------|--------------|
| 4.1.2 Nombre, función, valor | Los controles exponen nombre y estado | `aria-pressed`, `aria-expanded`, `aria-current` donde corresponda; etiquetas en botones con solo icono |
| 4.1.3 Mensajes de estado | Anunciar cambios sin mover el foco | Región `aria-live="polite"` para «N resultados» y «Copiado» |

> El criterio 4.1.1 (Análisis sintáctico) se eliminó en WCAG 2.2. Los criterios de nivel AAA (por ejemplo, 2.3.3) no son obligatorios, pero respetar `prefers-reduced-motion` ya cubre su espíritu.

---

## 2. Patrones por componente

### Estructura de página
```html
<html lang="es">
  <body>
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
    <header>…<nav aria-label="Principal">…</nav></header>
    <main id="contenido" tabindex="-1">
      <nav aria-label="Ruta de navegación">
        <ol>…<li><a aria-current="page" href="…">Zod</a></li></ol>
      </nav>
      <article>…</article>
    </main>
    <footer>…</footer>
  </body>
</html>
```
Cada `<nav>` repetido lleva `aria-label` distinto (Principal, Ruta de navegación, En esta página).

### Bloque de código
- Si el `<pre>` es desplazable, debe poder recibir foco: `tabindex="0"` y una etiqueta (`role="region"` + `aria-label="Código TypeScript"`). Verifica qué genera el resaltador antes de añadirlo.
- Botón de copiar: `<button type="button" aria-label="Copiar código">`; al pulsar, el texto cambia a «Copiado» en una región `aria-live="polite"` visualmente oculta.
- Resaltado con contraste AA en ambos temas (comprobar cada color de token del tema elegido).

### Tablas comparativas
```html
<div role="region" aria-labelledby="t1" tabindex="0" style="overflow-x:auto">
  <table>
    <caption id="t1">React frente a Vue: criterios principales</caption>
    <thead><tr><th scope="col">Criterio</th><th scope="col">React</th>…</tr></thead>
    <tbody><tr><th scope="row">Curva de aprendizaje</th><td>…</td>…</tr></tbody>
  </table>
</div>
```

### Avisos (`<Aviso>`)
Icono (SVG con `aria-hidden="true"`) + etiqueta de texto visible («Consejo», «Atención», «Nota») + color. El significado nunca depende solo del color. Usa `role="note"`; reserva `role="alert"` para mensajes dinámicos urgentes.

### Insignias (categoría, nivel)
Texto visible; si se usa color, que sea refuerzo. Contraste AA entre texto e insignia en ambos temas.

### Búsqueda
```html
<form role="search">
  <label for="q">Buscar en la wiki</label>
  <input id="q" type="search" autocomplete="off">
</form>
<p id="estado" role="status" aria-live="polite"></p>  <!-- «12 resultados» -->
```
Los resultados son una lista de enlaces; no mover el foco al cargarlos.

### Selector de tema
Control de tres opciones (sistema, claro, oscuro): un grupo de radios o un botón que cicla con `aria-label` que incluya el estado actual. Debe funcionar con teclado y no depender de un icono sin nombre. Detalle en `temas-claro-oscuro.md`.

### Enlaces
Dentro de texto, subrayados y con contraste 3:1 respecto al texto que los rodea además de 4,5:1 contra el fondo. Los enlaces externos pueden indicarlo con texto, no solo con un icono.

### Tabla de contenidos
`<nav aria-label="En esta página">` con enlaces a los encabezados. El elemento activo se marca con `aria-current="location"`, no solo con color.

---

## 3. Cómo probar

1. **Contraste:** `node scripts/contrast.mjs <texto> <fondo>` para cada par nuevo, en claro y oscuro.
2. **Teclado:** recorrer la página con `Tab`/`Shift+Tab`, `Enter`, `Espacio`, `Esc`. Comprobar el orden, el foco visible y que no queda tapado por la cabecera.
3. **Zoom y reflujo:** 200 % de zoom y ventana de 320 px de ancho: sin scroll horizontal salvo en código y tablas.
4. **Movimiento reducido:** activar la preferencia del sistema y comprobar que desaparecen los desplazamientos.
5. **Lector de pantalla:** una pasada con NVDA (Windows) o VoiceOver (macOS/iOS) sobre una ficha, el buscador y el selector de tema.
6. **Automático:** axe (extensión o `@axe-core/playwright`) y Lighthouse. Detectan una parte de los problemas; no sustituyen los pasos anteriores.
7. **Espaciado de texto:** aplicar el marcador de espaciado de 1.4.12 y comprobar que nada se corta ni se superpone.
