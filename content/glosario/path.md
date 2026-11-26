---
titulo: "Path"
resumen: "Ruta que identifica la posición de un archivo o recurso dentro de un sistema de archivos o de una URL."
categoria: concepto
tags: ["terminal","nivel-0"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Ruta que identifica la posición de un archivo o recurso dentro de un sistema de archivos o de una URL.

## Por qué importa

Es la frontera entre entornos: el mismo código funciona distinto en Windows y Linux si se construye a mano.

## Ejemplo

```js
import { join } from 'node:path'; join('content', 'glosario', 'slug.md');
```

## Se confunde con

No es URL: el path filesystem usa separadores del sistema; la URL usa `/` y puede incluir esquema y dominio.
