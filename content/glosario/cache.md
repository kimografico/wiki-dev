---
titulo: "Cache"
resumen: "Copia temporal de un resultado costoso guardada para reutilizarlo sin repetir el trabajo."
categoria: rendimiento-ux
tags: ["frontend","rendimiento"]
alias: []
relacionados: [cabeceras-http, codigos-http, core-web-vitals, localstorage]
fuentes: []
autoenlace: true
---
## Definición

Una caché es una copia temporal de un resultado costoso —una imagen, una respuesta de API, un módulo compilado— guardada para reutilizarla sin repetir el trabajo. Vive en un nivel concreto: memoria del proceso, navegador, CDN o disco. Toda caché necesita una clave que identifique el resultado y una regla de caducidad que diga cuándo deja de ser válida.

## Por qué importa

Es la palanca más directa para bajar latencia y reducir peticiones repetidas: una imagen servida desde la caché del navegador no viaja por la red. El coste es la invalidación. Si el contenido cambia y la regla de caducidad es larga, el usuario ve una versión antigua. Por eso se usan nombres de archivo con hash: cambiar el contenido cambia la URL y renueva la caché sin borrar la anterior.

## Ejemplo

```http
Cache-Control: public, max-age=31536000, immutable
```

Esa cabecera conviene para archivos con hash en el nombre, no para un `index.html` que debe poder actualizarse.

## Se confunde con

Con persistencia: una caché puede caducar o ser desalojada en cualquier momento, mientras que una base de datos o localStorage guardan el dato de forma duradera. Tampoco es guardar en memoria sin control: sin política de invalidación, el ahorro se convierte en contenido obsoleto.
