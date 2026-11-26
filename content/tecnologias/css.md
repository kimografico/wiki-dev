---
titulo: "CSS"
resumen: "Lenguaje de estilos que describe cómo se presenta un documento HTML."
categoria: estilos
tags: ["frontend","nivel-0"]
alias: []
relacionados: [tailwindcss, responsive-web, accesibilidad-web]
fuentes:
  - "https://developer.mozilla.org/es/docs/Web/CSS"
  - "https://developer.mozilla.org/es/docs/Web/CSS/Guides/Cascade/Introduction"
  - "https://developer.mozilla.org/es/docs/Web/CSS/Guides/Cascade/Specificity"
  - "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer"
autoenlace: true
alternativas: []
web: "https://www.w3.org/Style/CSS/"
---
## Qué es

Lenguaje de estilos que describe cómo se presenta un documento HTML.

## Para qué sirve

Controla layout, color, tipografía y adaptación a distintos tamaños de pantalla.

## Cuándo usarla

Úsalo siempre que haya interfaz; empieza por propiedades base antes de buscar frameworks.

## Cuándo no

No es un lenguaje de programación: no tiene lógica de negocio, aunque soporte variables y reglas.

## Alternativas

No hay una alternativa directa dentro del catálogo: la decisión depende del requisito concreto.

## Ejemplo

```css
.contenedor { display: grid; gap: 1rem; }
```

## Cascada y especificidad

El orden de decisión es **origen + importancia → capas → especificidad → orden de aparición**. Por eso subir la especificidad no puede vencer a una capa de mayor prioridad. Dentro de una misma capa gana la regla más específica (ID > clase > tipo), no la que esté más abajo.

`@layer` fija la prioridad entre grupos: una capa declara su orden una vez y las reglas de una capa posterior ganan aunque sean menos específicas. Las declaraciones normales que están **fuera** de capa ganan a las de dentro. Con `!important` la precedencia de capas se invierte, así que usarlo para «ganar» una capa suele ser síntoma de un orden de capas mal pensado: `!important` no es especificidad.

La regla práctica es mantener la especificidad baja: una clase por regla, pocos selectores anidados y `!important` solo para casos de fuerza mayor. Si necesitas `!important` seguido, la estructura de selectores o de capas es la que hay que arreglar.

## Unidades que cambian con el contexto

- `rem` se mide siempre respecto al `font-size` de la raíz. `em` depende de la propiedad: en `font-size` se mide respecto al padre, pero en `padding` o `margin` respecto al `font-size` del propio elemento. Por eso `em` se multiplica al anidar.
- `dvh` sigue al viewport dinámico y cambia cuando aparecen o desaparecen las barras del navegador; `vh` equivale al viewport grande (`lvh`) en los navegadores que lo implementan así. Para pantallas completas en móvil usa `dvh`.
- `clamp(min, preferido, max)` acota un valor entre dos límites y evita media queries cuando solo quieres que crezca dentro de un rango: `font-size: clamp(1rem, 2vw, 1.5rem)`.

Mezclar unidades sin criterio es una fuente frecuente de desbordamientos que solo aparecen en un tamaño de pantalla concreto.
