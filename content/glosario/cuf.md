---
titulo: "CUF"
resumen: "Código único de firma: cabecera HTTP que correlaciona los pasos de una firma multistep en BBVA."
categoria: concepto
tags: [backend, bbva]
alias: ["código único de firma"]
relacionados: [otp, cabeceras-http, api, traza, auditoria]
fuentes: []
autoenlace: true
---

## Definición

CUF («código único de firma») es un término interno de BBVA: el identificador con el que el banco correlaciona los pasos de una operación de firma multistep. El backend lo devuelve como cabecera HTTP al crear la orden y el cliente lo conserva y lo reenvía en las llamadas siguientes. No es una credencial ni una prueba de firma: es un identificador de contexto que dice a qué operación pendiente pertenece cada petición.

## Por qué importa

HTTP es sin estado: cada petición puede tratarse de forma aislada. En un flujo de varios pasos hace falta un hilo que una el primer `PUT`, la consulta de documentos pendientes y la confirmación final; ese hilo es el CUF. Sin él, el backend no podría enlazar la confirmación con la orden inicial. Viaja en las cabeceras, así que forma parte del contrato de la API: se lee de la respuesta y se devuelve tal cual.

## Ejemplo

Esquema simplificado en `signatures.js`:

```js
const cuf = await crearOrdenDeFirma(); // valor leído de la cabecera de respuesta

await getPendingSignature(cuf);
await retrieveSignatureDocuments(cuf);

await updatePlan({ cuf }); // segundo PUT: confirma la orden creada
```

El nombre exacto de la cabecera y el formato del valor son internos; aquí solo se muestra el papel del CUF.

## Se confunde con

- **OTP**: es un secreto de un solo uso que demuestra posesión de un autenticador. El CUF no demuestra nada: solo relaciona peticiones.
- **Identificador de documento o número de serie de certificado**: distingue un objeto dentro de un ámbito. El CUF distingue una operación de firma, que puede abarcar varios documentos.
- **Firma o certificado**: vinculan una clave pública con un sujeto y permiten verificar integridad. El CUF es un correlacionador, no evidencia criptográfica.
- **Traza**: correlaciona señales de observabilidad; el CUF pertenece al contrato de negocio y el backend lo usa para localizar una orden pendiente.
- **Auditoría**: produce evidencia de una acción frente a una política; el CUF solo identifica el flujo que luego se auditará.

## Fuente interna

> La expansión «código único de firma», el flujo de firma y los nombres `getPendingSignature`, `retrieveSignatureDocuments` y `updatePlan()` proceden de notas internas facilitadas por el autor y no son verificables desde documentación pública. Los contrastes con OTP, traza y certificados son analogías didácticas: HTTP no define una cabecera de correlación estándar y los mecanismos públicos de trazabilidad cubren la observabilidad, no la confirmación de una orden.
