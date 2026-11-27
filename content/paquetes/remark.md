---
fecha: 2026-10-13
titulo: remark
resumen: Procesador de Markdown construido sobre el formato de sintaxis de mdast, extensible con plugins.
categoria: herramienta
tags: [frontend]
alias: []
relacionados: [unified, markdown, content-collection]
alternativas: []
web: https://remark.js.org
npm: remark
fuentes: [https://github.com/remarkjs/remark]
---

## Qué es

remark es el procesador de Markdown del ecosistema unified. Convierte el texto en un árbol de sintaxis llamado mdast, donde cada párrafo, enlace o bloque de código es un nodo. Los plugins recorren ese árbol y lo modifican antes de volver a serializar Markdown o HTML. Conviene separarlo de Markdown: Markdown es el formato de texto; remark es el programa que lo entiende y permite transformarlo.

## Para qué sirve

Sirve para automatizar cambios que con expresiones regulares salen mal. En esta wiki, el plugin de menciones recorre el mdast y convierte la primera aparición de un título o alias en un enlace interno, sin tocar el mismo texto dentro de bloques de código. También permite añadir clases a tablas para hacerlas accesibles o comprobar que los encabezados siguen un orden.

## Cuándo usarlo

Cuando el contenido se procesa en el build y necesita una transformación estructural: enlazar términos, insertar sumarios, quitar nodos o validar la forma del documento. Es una herramienta de pipelines, no de edición manual: se configura una vez y se ejecuta siempre igual.

## Cuándo no

Para un archivo estático que solo se publica tal cual, añadir remark y sus plugins es complejidad innecesaria. Tampoco conviene usarlo para validar datos del frontmatter: eso corresponde a los esquemas de la colección, que comprueban campos y tipos antes de que el Markdown se procese.

## Matices

### remark frente a unified

unified es el motor genérico que define el pipeline: analizador, transformadores y generador. remark es la capa que sabe de Markdown y produce mdast; rehype hace lo mismo para HTML. En Astro se fija un procesador unified y sobre él se montan los plugins de remark. Por eso en la configuración aparece unified, pero el código que recorre el documento trabaja con nodos mdast.

## Ejemplo

```js
import { remark } from "remark";

function mencionarAstro() {
  return (arbol) => {
    const recorrer = (padre) => {
      const nuevos = [];
      for (const nodo of padre.children ?? []) {
        if (nodo.type === "text" && nodo.value.includes("Astro")) {
          const [antes, ...resto] = nodo.value.split("Astro");
          if (antes) nuevos.push({ type: "text", value: antes });
          nuevos.push({
            type: "link",
            url: "/tecnologias/astro/",
            children: [{ type: "text", value: "Astro" }],
          });
          const despues = resto.join("Astro");
          if (despues) nuevos.push({ type: "text", value: despues });
        } else {
          recorrer(nodo);
          nuevos.push(nodo);
        }
      }
      padre.children = nuevos;
    };
    recorrer(arbol);
  };
}

const resultado = await remark().use(mencionarAstro).process("Astro genera HTML");
console.log(String(resultado));
```

La clave está en el nodo `link`: su `url` y sus `children` hacen que el serializador escriba `[Astro](/tecnologias/astro/)`. Si el marcado se metiera como texto en `nodo.value`, quedaría escapado y el lector vería los corchetes como caracteres normales. El plugin real de esta wiki aplica la misma idea con más precauciones: respeta `base`, omite encabezados, código y enlaces, y solo enlaza la primera mención de cada sección.
