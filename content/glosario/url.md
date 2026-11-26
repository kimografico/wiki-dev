---
titulo: "URL"
resumen: "Uniform Resource Locator: dirección que identifica un recurso en la web e indica cómo acceder a él."
categoria: concepto
tags: ["nivel-0"]
alias: ["Uniform Resource Locator","uri"]
relacionados: [metodos-http]
fuentes:
  - "https://developer.mozilla.org/es/docs/Web/API/URLSearchParams"
  - "https://developer.mozilla.org/es/docs/Web/API/URL/search"
  - "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/getAll"
  - "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/set"
autoenlace: true
---
## Definición

Uniform Resource Locator: dirección que identifica un recurso en la web e indica cómo acceder a él.

## Por qué importa

Es la interfaz pública de una página: cambiarla rompe enlaces y marcadores existentes.

## Ejemplo

`https://kimografico.github.io/wiki-dev/glosario/closure/`

## Se confunde con

No es URI en sentido estricto: toda URL es URI, pero una URI puede identificar sin decir dónde está.

## Query string y `URLSearchParams`

La parte después de `?` es la query string: pares clave/valor que no forman parte de la ruta. Sirve para filtros, paginación y búsquedas que deben ser enlazables y recargables.

```js
const url = new URL("/pedidos", window.location.origin);
url.searchParams.set("pagina", "2");
const ruta = url.pathname + url.search; // "/pedidos?pagina=2"
```

Si solo tienes la query, `new URLSearchParams(window.location.search)` funciona igual. Concatenar texto a mano rompe los espacios, los acentos y los caracteres especiales: `URLSearchParams` codifica los valores y respeta los parámetros que ya existían. `url.search` incluye el `?` inicial y se lee codificado; `url.searchParams` es vivo, así que cambiarlo actualiza el objeto `URL`. Para navegar, usa `url.href` o `url.pathname + url.search`: mutar el objeto no cambia por sí solo la barra de direcciones.

La query es visible y modificable por el usuario: no es sitio para secretos ni para datos que deban permanecer intactos.

## Codificación y parámetros repetidos

Las dos APIs codifican distinto: `URL.search` usa `%20` para los espacios, mientras `URLSearchParams` serializa `+` (formato de formulario). Mezclar `params.toString()` con `encodeURIComponent` produce doble codificación.

Si una clave aparece varias veces, `.get()` devuelve la primera y `.getAll()` todas. `.set()` reemplaza todos los valores de esa clave; `.append()` añade uno sin borrar los anteriores. Saber cuál usar importa cuando la URL se usa como estado compartido: un filtro mal reemplazado deja parámetros viejos que nadie ve.
