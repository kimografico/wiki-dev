---
titulo: "Path"
resumen: "Ruta que identifica la posición de un archivo o recurso dentro de un sistema de archivos o de una URL."
categoria: concepto
tags: ["terminal","nivel-0"]
alias: []
relacionados: [url, terminal, slug, entornos]
fuentes: []
autoenlace: true
---
## Definición

Un path es la ruta que localiza un archivo o recurso dentro de un sistema de archivos o de una URL. Puede ser absoluta —parte de la raíz— o relativa —se interpreta desde el directorio actual—. Los segmentos se separan con `/` en sistemas tipo Unix y con `\` en Windows; qué separadores acepta una llamada depende de la API que se use: `node:path` sigue el separador del sistema, mientras que `node:path.posix` solo trata `/` como separador.

## Por qué importa

El mismo código se comporta distinto según el entorno. Concatenar `content + "/" + "glosario"` funciona en Linux y produce rutas incorrectas en Windows. Un path relativo depende de dónde se ejecute el proceso: `./datos.json` apunta a sitios distintos desde la raíz o desde `scripts/`. Usar la API adecuada a la plataforma elimina la primera ambigüedad; `resolve` y una ruta base explícita reducen la segunda.

## Ejemplo

```ts
import { join, resolve } from "node:path";

const archivo = join("content", "glosario", "path.md");
const absoluta = resolve(archivo);
```

`join` añade el separador correcto; `resolve` ancla la ruta al directorio de trabajo.

## Se confunde con

- **URL**: incluye esquema y dominio y usa siempre `/`, aunque el servidor traduzca esa ruta a un archivo.
- **Slug**: es el identificador legible de una entrada, no su ubicación en disco.
- **Nombre de archivo**: solo el último segmento del path.

Matiz: un path puede contener `..` para subir un nivel. Concatenarlo sin normalizar permite salirse del directorio previsto; por eso las rutas que llegan del exterior se validan antes de abrirlas.
