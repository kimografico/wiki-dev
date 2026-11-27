---
titulo: "Códigos HTTP"
resumen: "Números de tres cifras que indican el resultado de una petición: 1xx informativo, 2xx éxito, 3xx redirección, 4xx error del cliente y 5xx error del servidor."
categoria: datos-api
tags: ["nivel-0","backend"]
alias: ["códigos de estado HTTP"]
relacionados: [metodos-http, cabeceras-http, cors, api]
fuentes: ["https://developer.mozilla.org/es/docs/Web/HTTP/Status"]
autoenlace: true
---
## Definición

Los códigos HTTP son números de tres cifras que indican el resultado de una petición. Se agrupan en cinco familias: 1xx informativo, 2xx éxito, 3xx redirección, 4xx error del cliente y 5xx error del servidor. El código resume qué ocurrió; el cuerpo puede aportar detalles, pero no cambia la clase del resultado.

## Por qué importa

Permiten diagnosticar una incidencia sin leer el cuerpo ni reproducirla a ciegas. Un 401 exige revisar credenciales o autenticación; un 403 indica que la identidad es conocida pero no tiene permisos; un 404 apunta a una ruta inexistente; un 422 a un cuerpo con errores de validación; un 503 a un servicio que no puede atender ahora. Cada código sugiere una acción distinta y evita culpar al servidor de un fallo del cliente.

## Ejemplo

```http
HTTP/1.1 422 Unprocessable Content
Content-Type: application/json

{"error":"email no válido"}
```

La petición llegó, pero el contenido no cumple las reglas.

## Se confunde con

Con el método HTTP: el método dice qué se quiere hacer (GET, POST...); el código dice qué pasó. Tampoco con el estado de la red: una respuesta 500 significa que hubo respuesta; una petición sin respuesta es un fallo de transporte, no un código HTTP.
