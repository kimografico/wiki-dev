---
titulo: "Span"
resumen: "Unidad de trabajo con inicio, fin y contexto dentro de una traza distribuida."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: [semaas, dashboard, auditoria, data-layer]
fuentes:
  - "https://opentelemetry.io/docs/concepts/signals/traces/"
  - "https://opentelemetry.io/docs/concepts/signals/logs/"
  - "https://opentelemetry.io/docs/concepts/signals/metrics/"
  - "https://opentelemetry.io/docs/concepts/context-propagation/"
autoenlace: true
---

## Definición

Un span es una unidad de trabajo u operación dentro de una traza. OpenTelemetry lo describe como el bloque básico de las trazas: lleva nombre, span padre, marcas de inicio y fin, contexto, atributos, eventos, enlaces y estado. Los spans anidados forman una jerarquía que muestra el recorrido de una petición.

## Por qué importa

Permite ver qué parte de una petición consumió el tiempo, no solo que la petición tardó. El contexto —identificador de traza y de span padre— asocia cada operación con las demás y con los registros de la misma petición. Sin esa jerarquía, una lista de líneas con fecha no dice dónde se produjo la espera.

## Ejemplo

Una petición abre el span `GET /pedidos`. Dentro, otro span mide la consulta a la base de datos. Si el total tarda 800 ms y la consulta 700 ms, la traza señala la consulta. La decisión de guardar un dato como atributo o como evento depende de si su marca de tiempo es relevante.

## Se confunde con

- **Traza**: es el camino completo de la petición; el span es una operación dentro de ella.
- **Log**: es un registro con marca de tiempo, estructurado o no. Un span se parece a un log estructurado, pero añade jerarquía, contexto, estado y correlación.
- **Métrica**: es una medición agregada en tiempo de ejecución. Resume muchas operaciones; el span describe una concreta.
- **Auditoría**: usa registros como evidencia frente a una política; la telemetría observa el comportamiento del servicio.
