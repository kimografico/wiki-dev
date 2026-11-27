---
titulo: "COBOL"
resumen: "Lenguaje compilado orientado a procesamiento de datos empresarial, presente en sistemas financieros."
categoria: lenguaje
tags: ["backend"]
alias: []
relacionados: [java, negocio, migracion, deuda-tecnica]
alternativas: []
web: "https://www.ibm.com/think/topics/cobol"
fuentes:
  - "https://www.ibm.com/think/topics/cobol"
  - "https://www.ibm.com/products/cobol-compiler-zos"
  - "https://www.ibm.com/docs/en/c-and-ji?topic=cobol-java-interoperability"
autoenlace: true
---

## Qué es

COBOL (*Common Business-Oriented Language*) es un lenguaje compilado, de sintaxis parecida al inglés, diseñado para procesamiento de datos empresariales. IBM lo describe como un lenguaje de alto nivel creado para necesidades de negocio y destaca su soporte para cálculos decimales de alta precisión, útiles cuando el dinero no puede redondearse como un `float`.

## Para qué sirve

Se usa para mantener y ampliar aplicaciones de negocio que llevan décadas en producción: gestiones financieras, administrativas y transaccionales. IBM documenta que sigue presente en organizaciones públicas y privadas y que los esfuerzos de modernización buscan conservar la lógica central y mejorar la interoperabilidad con tecnologías actuales. No es un lenguaje interpretado: se compila.

## Cuándo usarla

Cuando hay que modificar un sistema existente escrito en COBOL o integrarlo con servicios nuevos. IBM ofrece interoperabilidad documentada entre COBOL y Java en z/OS, así que convivir con Java es una opción real. También conviene cuando el requisito es precisión decimal exacta en operaciones de negocio.

## Cuándo no

Como elección para un servicio nuevo desacoplado de ese entorno, no es la opción natural: la documentación de IBM centra el valor de COBOL en la lógica de negocio existente y en la plataforma, no en sustituir cualquier proyecto nuevo. Modernizar no significa solo traducir el lenguaje: IBM advierte que centrarse solo en la traducción ignora el componente de plataforma.

## Ejemplo

```cobol
IDENTIFICATION DIVISION.
PROGRAM-ID. SALUDO.
PROCEDURE DIVISION.
    DISPLAY "Hola".
    STOP RUN.
```

Las divisiones identifican el programa y separan la lógica; `DISPLAY` escribe en la salida. La estructura es explícita y verbosa, como corresponde a un lenguaje pensado para leerse en equipos grandes.
