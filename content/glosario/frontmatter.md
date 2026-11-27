---
fecha: 2026-10-13
titulo: Frontmatter
resumen: Bloque de metadatos YAML al inicio de un archivo Markdown, delimitado por `---`, que describe la entrada sin formar parte del texto visible.
categoria: concepto
tags: [nivel-0]
relacionados: [markdown, content-collection, schema-first, gray-matter]
terminoEn: Frontmatter
---

## Definición

El frontmatter es la cabecera de metadatos de un archivo Markdown: dos líneas con `---` y pares `clave: valor` en YAML entre ellas. No se muestra en la página: lo consume el generador antes de convertir el archivo en HTML. En esta wiki declara título, resumen, categoría, etiquetas y relaciones. El delimitador debe ir en la primera línea; más abajo, el documento es prosa y esas claves no existen.

## Por qué importa

Separar los datos de la prosa permite tratar una entrada como información estructurada: listar las de una categoría, ordenar por fecha, construir la navegación o comprobar que `categoria` pertenece al catálogo antes de publicar. Renombrar una entrada exige cambiar solo `titulo:`. Sin ese bloque, la página perdería su título, sus etiquetas y los enlaces automáticos generados a partir de las relaciones.

## Ejemplo

```md
---
titulo: Zod
categoria: datos-api
tags: [backend]
---

Contenido del artículo...
```

Las claves quedan fuera del cuerpo; el texto posterior sí se renderiza.

## Se confunde con

Con YAML: YAML es el formato de serialización; el frontmatter es el sitio donde se aplica, la cabecera de un documento Markdown. Tampoco es un comentario: no se ignora, lo interpreta el generador (`gray-matter` fuera de Astro, una Content collection dentro). Y no es el título visible: ese lo pinta la plantilla leyendo el dato.
