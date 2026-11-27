---
titulo: "Dashboard"
resumen: "Panel que reúne indicadores y datos relevantes en una sola vista para seguir el estado de un sistema."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: [core-web-vitals, auditoria, negocio, ci-cd]
fuentes: []
autoenlace: true
---

## Definición

Un dashboard es una vista que concentra indicadores clave en una sola pantalla para seguir el estado de un sistema. No es una base de datos ni una herramienta de diagnóstico por sí mismo: es una capa de presentación que elige qué señales merecen espacio y con qué periodicidad se actualizan.

## Por qué importa

Reduce el coste de estar al tanto. Un panel bien acotado responde en segundos a preguntas repetidas: ¿la build está en verde?, ¿cuál es la latencia?, ¿cuántos errores hay hoy? Mal acotado, se convierte en una colección de gráficos que nadie consulta porque no dice qué hacer con ellos.

## Ejemplo

Un panel de integración continua con tres tarjetas: estado del último build, número de incidencias abiertas y tiempo medio de ejecución de los tests. Cada tarjeta enlaza al detalle; el panel no sustituye al informe cuando hay que explicar la causa de un pico.

## Se confunde con

Con un informe. El informe es estático, narrativo y se lee de principio a fin; el panel es vivo, visual y se consulta por excepción. Tampoco es una alerta: el panel muestra el estado cuando alguien lo mira, mientras que la alerta interrumpe cuando el estado cruza un umbral.
