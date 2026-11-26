---
fecha: 2026-11-26
titulo: "Source map"
resumen: "Archivo que relaciona el código minificado o compilado con el código fuente original para poder depurarlo."
categoria: herramienta
tags: [frontend, rendimiento]
alias: [source maps, sourcemap]
relacionados: [bundler, vite, debug, build, stack]
fuentes:
  - "https://tc39.es/source-map-spec/"
  - "https://web.dev/articles/source-maps"
  - "https://developer.chrome.com/docs/devtools/javascript/source-maps"
  - "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/SourceMap"
autoenlace: true
terminoEn: Source map
---

## Definición

Un source map es un fichero de metadatos que dice a las herramientas de desarrollo qué línea del archivo generado corresponde a qué línea del archivo original. Se referencia al final del bundle con `//# sourceMappingURL=...`.

## Por qué importa

Sin él, un error en producción apunta a una línea de un archivo minificado donde las variables se llaman `a`, `b` y `c`. Con él, el navegador muestra el archivo y la línea que escribiste. Es la diferencia entre «el bundle ha fallado» y «esta función ha fallado».

## Ejemplo

```js
// Al final del archivo generado:
//# sourceMappingURL=app.js.map
```

Los bundlers generan el mapa cuando se activa la opción correspondiente; en desarrollo suele estar activo y en producción se elige si se publica o se envía solo al sistema de errores.

## Se confunde con

Con el código fuente: el mapa no contiene por defecto tu código, sino posiciones. Algunas herramientas añaden `sourcesContent` con el contenido original; si se publica, cualquiera puede leerlo desde la pestaña de red. Para código privado, publica el mapa solo al servicio de errores.

## Estructura y descubrimiento

El mapa es un JSON (revisión 3) con `version`, `sources`, `names` y `mappings`; si se generó, incluye también `sourcesContent` con el código original. El navegador lo encuentra por el comentario final `//# sourceMappingURL=...` o por la cabecera HTTP `SourceMap`, que tiene prioridad cuando ambas están presentes.

En DevTools hay que tener activados los source maps de JavaScript y CSS: si están desactivados, se ve el bundle minificado aunque el `.map` exista.

## En el día a día

Si el stack trace en staging no coincide con lo que ves en tu editor, comprueba tres cosas: que el mapa se generó en ese build, que la URL del mapa es accesible y que la versión desplegada es la que estás mirando. Un mapa de un build anterior señala líneas que ya no existen. Aquí «stack trace» es la pila de llamadas del error, no el conjunto de tecnologías del proyecto.
