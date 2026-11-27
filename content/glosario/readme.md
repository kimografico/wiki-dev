---
titulo: "README"
resumen: "Archivo de texto que sirve como puerta de entrada de un proyecto: qué es, cómo se ejecuta y dónde está el detalle."
categoria: concepto
tags: ["nivel-0"]
alias: []
relacionados: [documentacion, markdown, repositorio-git, sdd]
fuentes: []
autoenlace: true
---

## Definición

Un README es el archivo que abre un repositorio y explica qué contiene el proyecto, cómo prepararlo y por dónde empezar. Suele escribirse en Markdown y llamarse `README.md`; el nombre es una convención, no una exigencia del lenguaje.

## Por qué importa

Es la primera puerta de entrada: quien llega al proyecto decide en minutos si puede ejecutarlo. Un README útil incluye requisitos, comandos de arranque, una comprobación mínima de que funciona y dónde vive la documentación larga. En esta wiki, `npm run dev` y `npm run validate` ahorran preguntas, mientras que las normas de contenido están en `specs/MANUAL.md`. Un README desactualizado es peor que ninguno: da por buenos comandos que ya no funcionan. Conviene revisarlo cuando cambia el arranque del proyecto.

## Ejemplo

```md
# Wiki de desarrollo

npm install
npm run dev

Normas de contenido: specs/MANUAL.md
```

## Se confunde con

Con la documentación completa: el README orienta y enlaza, pero no sustituye al manual ni a la referencia de la API. Tampoco es un registro de cambios: ese responde a qué se modificó; el README responde a qué es el proyecto y cómo arrancar.
