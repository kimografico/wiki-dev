---
fecha: 2026-11-26
titulo: Binario
resumen: "Archivo cuyo contenido son bytes que no representan texto legible y que debe interpretarse con un formato concreto."
categoria: concepto
tags: [terminal]
alias: [archivo binario]
relacionados: [base64, blob, build, ipa]
fuentes:
  - "https://en.wikipedia.org/wiki/Binary_file"
autoenlace: true
---

## Definición

Un archivo binario guarda bytes que no están pensados para leerse como texto. Una imagen, un ejecutable o un archivo comprimido son binarios: para entenderlos hace falta conocer su formato y abrirlos con la herramienta adecuada.

Abrir un binario con un editor de texto muestra caracteres sin sentido, no porque esté corrupto, sino porque esos bytes no codifican letras.

## Por qué importa

Determina cómo se transporta, se versiona y se depura. Un binario no se puede revisar línea a línea en un diff, y si hay que enviarlo por un canal de texto hay que codificarlo antes, por ejemplo con Base64.

## Ejemplo

Una imagen PNG subida a una web, el `IPA` generado al compilar una app de iOS y el resultado de un build son archivos binarios. Git puede guardarlos, pero el diff solo indicará que el archivo cambió.

## Se confunde con

- **Sistema binario (base 2)**: es la representación numérica con ceros y unos; el archivo binario se define por su formato, no por la base numérica.
- **Texto plano**: un `.md` o un `.ts` sí se lee como caracteres; un binario no.
- **Blob**: es un objeto binario grande tratado como una unidad opaca; no todo archivo binario es un blob.

## Información incompleta

> **Aviso: información incompleta.** La fuente disponible es única y lleva aviso de insuficiencia de citas. La frontera entre texto y binario depende del formato y del uso concreto.
