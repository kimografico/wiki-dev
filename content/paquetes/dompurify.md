---
titulo: "DOMPurify"
resumen: "Biblioteca que sanea HTML no confiable eliminando scripts y atributos peligrosos antes de insertarlo en el DOM."
categoria: herramienta
tags: ["seguridad","frontend"]
alias: []
relacionados: [xss, ciberseguridad, react, dom]
fuentes: ["https://github.com/cure53/DOMPurify"]
autoenlace: true
alternativas: []
web: "https://github.com/cure53/DOMPurify"
npm: "dompurify"
---
## Qué es

DOMPurify es una biblioteca que sanea HTML: toma una cadena que puede contener marcado malicioso y devuelve otra con solo las etiquetas y atributos que considera seguros. `script`, `onerror` y construcciones parecidas se eliminan. Se apoya en el DOM del navegador para decidir qué es válido, así que el resultado depende del entorno donde se ejecuta. No es un validador de esquemas ni una política de contenido: reduce una superficie concreta de ataque, la del HTML inyectado.

## Para qué sirve

Sirve cuando una aplicación debe mostrar HTML que viene de fuera —un comentario con formato, un fragmento guardado en base de datos, contenido de un gestor de contenidos— y no puedes limitarte a mostrar texto plano. Caso concreto: un visor de notas que permite algo de formato; antes de insertar el contenido con `innerHTML`, se pasa por el saneador y el usuario ve el formato sin que se ejecute código.

## Cuándo usarlo

- Justo antes de insertar HTML externo en el DOM, en el punto más cercano posible a la inserción.
- Cuando el contenido pasa por varios sistemas y no puedes garantizar que esté limpio en el origen.
- Cuando necesitas conservar un subconjunto de etiquetas y atributos y puedes declarar qué se permite.

## Cuándo no

- Si puedes mostrar el contenido como texto: escapar por defecto es más seguro y más simple que sanear después.
- Si el HTML viene de una fuente que controlas al cien por cien y no hay entrada del usuario: el saneado añade coste sin reducir riesgo real.
- Si esperas que sustituya a una política de seguridad de contenido (CSP) o a la validación en servidor: son capas distintas.

## Matices

El riesgo que aquí se evita es XSS: HTML confundido con código ejecutable. En frameworks como React, el contenido interpolado se escapa automáticamente y no hace falta sanear salvo que uses `dangerouslySetInnerHTML`. Ahí entra DOMPurify. En servidor, la misma biblioteca tiene una variante que usa un DOM simulado; conviene comprobar que el entorno ofrece lo que necesitas. Y importa el orden: sanear al guardar puede perder contexto, mientras que sanear al mostrar evita que un dato antes seguro se vuelva peligroso al cambiar de destino. Saneado y escapado se complementan, no se excluyen.

## Ejemplo

```js
import DOMPurify from "dompurify";

const htmlDelUsuario = '<img src="x" onerror="alert(1)">Hola';
const limpio = DOMPurify.sanitize(htmlDelUsuario);
// → '<img src="x">Hola'  (sin el atributo onerror)
const contenedor = document.querySelector("#notas");
contenedor.innerHTML = limpio;
```

El atributo del detector de errores desaparece; la imagen y el texto se conservan.
