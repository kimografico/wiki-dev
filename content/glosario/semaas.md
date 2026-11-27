---
titulo: "SEMAAS"
resumen: "Subsistema interno de trazabilidad y telemetría que envía spans, mediciones y eventos al backend del proyecto."
categoria: concepto
tags: ["backend", "bbva"]
alias: []
relacionados: [auditoria, data-layer, dashboard, feature-flag, gam, otp, span]
fuentes: []
autoenlace: true
---

## Definición

SEMAAS es el subsistema interno de trazabilidad y telemetría del proyecto. Registra operaciones como spans —unidades de trabajo con inicio, fin y padre—, genera mediciones y eventos y los envía al backend para monitorización y análisis. Tiene canales especializados para OTP, GAM y promociones.

## Por qué importa

Permite responder qué ocurrió y cuánto tardó una operación sin reconstruir el flujo a mano. Un span con padre, inicio, fin y atributos se anida en una traza; las mediciones agrupan valores. Frente a un registro de texto, aporta jerarquía y correlación.

## Componentes internos

Los *dispatchers* (`semaasDispatcher`, `semaasOtpDispatcher`, `semaasGamDispatcher` y `semaasPromoDispatcher`) envían las señales de cada canal. `generate-properties.js` y `measurements.js` construyen propiedades y mediciones, y hay repositorios para token y offset. El ciclo `startSemaas`/`stopSemaas` se controla desde la ruta principal y se inyecta vía `instance-initializers`.

## Ejemplo

Una llamada a una API se instrumenta como span hijo de la petición que la origina; al cerrarse, el dispatcher envía la duración y propiedades como identificador de consumidor y dispositivo.

## Se confunde con

- **Auditoría**: usa registros como evidencia frente a una política; SEMAAS produce señales para observar el servicio.
- **OpenTelemetry**: marco público para generar y exportar telemetría, no un backend donde consultarla.
- **Un log**: registro con marca de tiempo. Un span parece un log estructurado, pero añade contexto y jerarquía.

## Fuente interna

> Descripción basada en notas internas facilitadas por el autor; los nombres de los dispatchers, las utilidades y el ciclo de arranque no son verificables desde documentación pública.
