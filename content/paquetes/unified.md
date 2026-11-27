---
fecha: 2026-10-13
titulo: unified
resumen: Ecosistema para procesar texto con plugins; encadena analizadores y transformadores sobre un árbol de sintaxis.
categoria: herramienta
tags: [frontend]
alias: []
relacionados: [remark, markdown, content-collection]
alternativas: []
web: https://unifiedjs.com
npm: unified
fuentes: [https://github.com/unifiedjs/unified]
---

## Qué es

unified es un marco para procesar texto con plugins. Define un pipeline de tres partes: un analizador que convierte el texto en un árbol, transformadores que recorren ese árbol y un generador que lo vuelve a escribir. Los proyectos remark y rehype se construyen sobre él para Markdown y HTML respectivamente. No es un formato ni un editor: es la infraestructura que permite encadenar transformaciones pequeñas de forma predecible.

## Para qué sirve

Sirve a los proyectos de Astro para fijar un único procesador de Markdown. Cuando la configuración declara `markdown.processor`, los plugins de remark se ejecutan de verdad tanto al construir como al previsualizar. En esta wiki, ese pipeline es el que enlaza menciones y prepara las tablas accesibles sin modificar los archivos de `content/`.

## Cuándo usarlo

Cuando se necesitan varios pasos que comparten el mismo árbol: primero analizar, después transformar y por último serializar. Encaja si las transformaciones se reutilizan en distintos lugares o si conviene probarlas por separado. Un pipeline también hace explícito el orden: enlazar menciones antes de generar HTML evita encontrar texto dentro de etiquetas.

## Cuándo no

Para una sustitución puntual de una cadena, montar un pipeline es excesivo. Tampoco conviene introducirlo solo para leer un archivo Markdown: si el contenido ya viene convertido por Astro, basta con consumirlo. Y no debe usarse para validar un esquema de datos; para eso están los esquemas de contenido.

## Matices

### unified frente a remark

remark es el proyecto que entiende Markdown y produce el árbol mdast; unified es el motor que ejecuta el pipeline. Elegir entre ellos no es una disyuntiva: se usa unified como base y se le añaden plugins de remark. Si se trabaja con HTML, se cambia la capa de análisis por rehype; el resto del pipeline se mantiene.

## Ejemplo

```js
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";

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

const procesador = unified()
  .use(remarkParse)
  .use(mencionarAstro)
  .use(remarkStringify);

console.log(String(await procesador.process("Astro genera HTML")));
```

El transformador no escribe marcado dentro de un nodo `text`: inserta un nodo `link` con `url` y `children`, que es la forma que tiene mdast de representar un enlace. Así `remark-stringify` produce `[Astro](/tecnologias/astro/)` en lugar de escapar los corchetes. Es el mismo patrón que usa `remark-menciones.ts` en esta wiki.

## En el build

Si el procesador se configura en un entorno pero no en otro, el mismo plugin puede funcionar en local y no en producción. Por eso la configuración del pipeline debe vivir en un solo archivo y ser la que usen todos los comandos.
