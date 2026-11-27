---
titulo: "Traza"
resumen: "Recorrido de una petición por la aplicación, formado por spans correlacionados con contexto y jerarquía."
categoria: concepto
tags: ["backend"]
alias: ["trace"]
relacionados: [span, semaas, metrica, auditoria]
fuentes:
  - "https://opentelemetry.io/docs/concepts/signals/traces/"
  - "https://opentelemetry.io/docs/specs/otel/overview/"
  - "https://opentelemetry.io/docs/concepts/signals/logs/"
autoenlace: true
---

## Definición

Una traza muestra el recorrido de una petición por la aplicación: la imagen global de qué ocurre cuando se hace una petición. Se define por sus spans —unidades de trabajo con inicio, fin y padre— y puede verse como un grafo de relaciones padre/hijo. OpenTelemetry la considera una señal de observabilidad, separada de las métricas y los logs aunque comparta con ellos la propagación de contexto.

## Por qué importa

Permite ver dónde se consume el tiempo dentro de una petición, no solo que la petición tardó. Sin la jerarquía de spans, una lista de mensajes con fecha no dice qué operación esperó a cuál. La correlación entre señales es lo que hace que el recorrido sea reconstruible.

## Ejemplo

Una petición abre el span raíz `GET /pedidos`; dentro aparece un span hijo para la consulta a la base de datos y otro para una llamada externa. Todos comparten el identificador de traza y el campo de padre dibuja la jerarquía. Un log emitido en medio puede incluir el mismo identificador y quedar así asociado a esa petición.

## Se confunde con

- **Span**: es una unidad de trabajo dentro de la traza, no el recorrido completo.
- **Log**: es un registro con marca de tiempo, estructurado o no; un log suelto no forma una traza por sí mismo.
- **Métrica**: agrega información estadística de muchas peticiones en lugar de seguir el ciclo de vida de una concreta.
- **Auditoría**: produce evidencia de una acción frente a una política; la traza describe un recorrido, no una responsabilidad.
