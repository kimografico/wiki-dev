---
titulo: "AAP"
resumen: "Identificador numérico interno de consumidor o aplicación (consumerId) usado para identificar el canal en peticiones, telemetría y configuración."
categoria: concepto
tags: [backend, bbva]
alias: ["consumerId"]
relacionados: [semaas, data-layer, traza, metrica, api, autenticacion, token]
fuentes: []
autoenlace: true
---

## Definición

AAP es la denominación interna de BBVA para el identificador numérico de consumidor o aplicación que en el código aparece como `consumerId`. Señala qué canal o aplicación hace la llamada —HTML, Android, iOS— o qué consumidor del backend está detrás. La expansión de las siglas no está documentada, así que el término se define por su función. Los valores vistos en el proyecto son `00000074` y `00000269`.

## Por qué importa

La misma persona puede operar desde la web y desde la app móvil; el backend y la telemetría necesitan saber desde dónde llega cada petición. El AAP responde a esa pregunta sin identificar al usuario ni autorizar la llamada. Aparece en sesiones y `tsec`, en payloads de API, en la trazabilidad de `datalayer`, en las mediciones de SEMAAS, en autenticación pública, en tests y grabaciones, y en configuraciones como `CONSUMER_IDS` y `config.session.public.consumerId`. Al ser un valor de configuración, cambiarlo cambia el comportamiento observado.

## Ejemplo

```js
const consumidor = config.session.public.consumerId; // "00000074"

semaasDispatcher.send({
  consumerId: consumidor,
  evento: "login",
});
```

El mismo número llega en el payload de la API y queda como propiedad en la métrica; no se genera por petición.

## Se confunde con

- **ID de usuario**: identifica a la persona o a la cuenta. El AAP identifica a la aplicación que llama; un mismo usuario puede usar varios AAP.
- **Token de sesión y autenticación**: son credenciales que prueban una identidad y mantienen la sesión. El AAP es un dato público de clasificación, no una prueba.
- **Traza o `traceId`**: identifica el recorrido de una petición concreta y cambia en cada traza. El AAP permanece estable para el mismo consumidor.
- **API key**: es una credencial secreta que autoriza el uso de un servicio. El AAP solo nombra al consumidor; en términos públicos se parece a un identificador de cliente OAuth, que identifica al cliente pero no basta para autenticarlo.
- **Métrica o Data Layer**: la métrica agrega mediciones y `datalayer` registra propiedades; el AAP es una dimensión que viaja en ellas, no la medición ni el registro.

## Fuente interna

> El nombre AAP, su papel como `consumerId`, los canales, los identificadores internos (`tsec`, `datalayer`), los dispatchers, el uso en tests y grabaciones, los ejemplos `00000074` y `00000269`, y las claves de configuración proceden de notas internas facilitadas por el autor. No hay fuente pública verificable que defina AAP ni su expansión, que no se ha inventado. Las comparaciones con el identificador de cliente OAuth, `traceId` y API key son analogías didácticas: solo aclaran qué identifica el valor y qué no.
