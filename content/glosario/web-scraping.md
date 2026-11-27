---
titulo: "Web scraping"
resumen: "Extracción automatizada de campos de páginas web cuando no hay API, con límites legales y técnicos."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: [api, cabeceras-http, formatos-de-datos, proxy]
fuentes: []
autoenlace: true
---
## Definición

El web scraping es un programa que pide páginas por HTTP, lee su HTML y extrae campos concretos para convertirlos en datos estructurados. Recibe el texto que devuelve el servidor, salvo que use un navegador automatizado. Depende del marcado: mover una tabla rompe el extractor sin avisar.

## Por qué importa

Sirve cuando la información existe pero no ofrece **API**. Un caso reconocible: recopilar fechas o precios de un catálogo público para compararlos. Hay que comprobar si el sitio lo permite y no saturarlo: muchas peticiones bloquean la IP. Con API oficial, el contrato cambia con aviso; el HTML no. Conviene aislar el extractor en un módulo.

## Ejemplo

```js
const respuesta = await fetch(url);
const html = await respuesta.text();
// Extraer campos con un analizador de HTML y guardarlos como JSON.
```

En el navegador sirve el **DOM**; en Node, un analizador. El resultado estructurado se guarda como JSON para el siguiente paso.

## Se confunde con

Con consultar una **API** y con el *crawling*. La API entrega datos ya estructurados y usa **Cabeceras HTTP** pensadas para clientes; el scraping interpreta una página escrita para personas. El crawling recorre enlaces para descubrir páginas; el scraping extrae campos de las que ya conoce. Tampoco es copiar un sitio: se toman datos concretos, no se republica la web. Un **Proxy** cambia por dónde salen las peticiones, pero no arregla un extractor roto.
