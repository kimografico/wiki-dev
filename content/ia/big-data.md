---
fecha: 2026-11-26
titulo: Big Data
resumen: "Conjuntos de datos tan grandes o complejos que las herramientas convencionales no pueden almacenarlos, procesarlos y analizarlos con normalidad."
categoria: concepto
tags: [backend]
alias: [macrodatos]
relacionados: [machine-learning, data-layer, base-de-conocimiento, llm]
fuentes:
  - "https://www.ibm.com/think/topics/big-data"
autoenlace: true
alternativas: []
---

## Qué es

Big Data designa conjuntos de datos cuyo tamaño, velocidad de llegada o variedad de formatos superan lo que una base de datos o una herramienta de análisis convencional maneja con comodidad. No es solo «muchos datos»: también importa que lleguen rápido y que no tengan siempre la misma forma.

La descripción habitual se resume en las cinco V: *volume* (volumen), *velocity* (velocidad), *variety* (variedad), *veracity* (veracidad o calidad) y *value* (valor). Las tres primeras describen el tamaño del problema; la cuarta, si se puede confiar en los datos; la quinta, si compensa explotarlos.

## Para qué sirve

Para encontrar patrones que no aparecen en una muestra pequeña: caídas que solo afectan a un navegador concreto, fraudes que se repiten entre millones de operaciones o el comportamiento real de los usuarios a lo largo de mucho tiempo.

También es la materia prima de muchos sistemas de Machine Learning: un modelo necesita ejemplos suficientes y variados para generalizar. Tener muchos datos no basta si la calidad es mala.

## Ejemplo

Un servicio que recibe millones de eventos al día quiere saber por qué fallan algunos pagos. Guarda los eventos en bruto, los agrega por navegador y versión, y entrena un clasificador con los casos fallidos etiquetados. El análisis no cabe en una hoja de cálculo ni en una sola consulta interactiva sobre la base de datos transaccional.

## Limitaciones

- **Coste:** almacenar, mover y procesar grandes volúmenes tiene un coste económico y de latencia.
- **Calidad:** la veracidad es una de las cinco V; datos duplicados, incompletos o mal medidos producen conclusiones equivocadas.
- **Privacidad:** cuanto más se agrega, más fácil es que aparezcan datos personales; hay que anonimizar y limitar el acceso.
- **No es un sinónimo de «mucho»:** una tabla grande que una consulta resuelve en segundos no necesita un pipeline de Big Data.

Las cinco V proceden de una sola fuente; otras clasificaciones usan un número distinto de dimensiones.

## Alternativas

- **Muestreo:** trabajar con una muestra representativa cuando la pregunta no necesita cada registro.
- **Agregación previa:** guardar totales o resúmenes en lugar del detalle si después solo se consultan métricas.
- **Base de datos convencional:** si los datos caben y las consultas responden a tiempo, añadir infraestructura de Big Data es sobre-ingeniería.
- **Machine Learning sobre datos pequeños:** para problemas acotados, unos cientos de ejemplos bien etiquetados pueden bastar.
