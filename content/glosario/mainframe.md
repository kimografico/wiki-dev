---
titulo: "Mainframe"
resumen: "Ordenador de gran capacidad diseñado para operación continua y procesamiento transaccional de alto volumen."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: [cobol, host, host-layer, servidor]
fuentes:
  - "https://www.ibm.com/think/topics/mainframe"
autoenlace: true
---

## Definición

Un mainframe es un ordenador grande y de alto rendimiento, diseñado para operar de forma continua y procesar transacciones de alto volumen. IBM destaca su tolerancia a fallos, sus subsistemas de entrada/salida, el aislamiento de cargas y la compatibilidad de aplicaciones entre generaciones. Es una categoría de máquina, no un sistema operativo ni un lenguaje: z/OS es un sistema operativo para mainframes IBM Z y COBOL es un lenguaje que suele ejecutarse en ellos.

## Por qué importa

Explica por qué muchos sistemas bancarios siguen apoyándose en una máquina central en lugar de repartir la carga entre muchas pequeñas: el trabajo transaccional se consolida en un equipo preparado para no detenerse. La confusión habitual es usar «mainframe» como sinónimo de servidor o de Host; un mainframe puede ejercer de servidor, pero no todo servidor es un mainframe.

## Ejemplo

Una transferencia se procesa en el mainframe junto a miles de operaciones simultáneas, y las aplicaciones COBOL residentes aplican las reglas de negocio sobre esa carga. Quien llama al servicio ve una respuesta, sin conocer la máquina que ejecutó la transacción.

## Se confunde con

- **Servidor**: es un rol —programa o máquina que atiende peticiones—. Un mainframe puede serlo, pero IBM lo contrasta con el servidor commodity por la consolidación de carga y el volumen transaccional.
- **Host**: en documentación pública nombra el dispositivo o servicio que aloja una aplicación; en el vocabulario interno de BBVA, la capa host es una denominación de capa.
- **COBOL**: es un lenguaje compilado para procesamiento de datos empresariales, no la máquina que lo ejecuta.
- **z/OS**: es un sistema operativo que gestiona memoria, procesadores, dispositivos y sistemas de archivos en mainframes IBM, no el hardware.
