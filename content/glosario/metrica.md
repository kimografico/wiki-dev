---
titulo: "Métrica"
resumen: "Medición de un servicio capturada en tiempo de ejecución, normalmente agregada para análisis estadístico."
categoria: concepto
tags: ["backend"]
alias: ["metric"]
relacionados: [traza, span, semaas, dashboard]
fuentes:
  - "https://opentelemetry.io/docs/concepts/signals/metrics/"
  - "https://opentelemetry.io/docs/specs/otel/overview/"
  - "https://opentelemetry.io/docs/concepts/signals/logs/"
autoenlace: true
---

## Definición

Una métrica es una medición de un servicio capturada en tiempo de ejecución. El instante de captura es un evento de métrica y lleva la medición, la hora y metadatos. OpenTelemetry la graba con instrumentos y la contrasta con el trazado de peticiones: mientras la traza capta el ciclo de vida de cada petición y su contexto, la métrica busca información estadística agregada.

## Por qué importa

Resume el comportamiento de un servicio sin conservar cada petición por separado: permite responder cuántas peticiones llegan, cuánto tarda una operación o cuántos errores aparecen. Esa visión agregada es la que alimenta paneles y alertas, y por eso es la primera señal que se consulta ante una subida de latencia.

## Ejemplo

Un contador registra el número de pedidos por minuto y un histograma reparte las duraciones en rangos. El panel muestra la tasa y la distribución de tiempos; si la curva se desplaza, la traza ayuda después a encontrar la petición concreta que explica el cambio.

## Se confunde con

- **Traza**: sigue el recorrido de una petición concreta; la métrica reúne muchas mediciones.
- **Span**: describe una operación con inicio, fin y jerarquía, no un valor agregado.
- **Log**: es un registro con marca de tiempo; los eventos son un tipo especial de log. Una medición no es un registro de texto.
- **Dashboard**: es la vista que presenta métricas, no la señal en sí.
