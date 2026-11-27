---
titulo: "Base64"
resumen: "Codificación que representa bytes como texto; es reversible y no cifra ni comprime el contenido."
categoria: datos-api
tags: ["nivel-0"]
alias: []
relacionados: [hash, binario, formatos-de-datos, cabeceras-http]
fuentes: []
autoenlace: true
---
## Definición

Base64 es una codificación que representa datos binarios como texto usando 64 símbolos: letras, dígitos y dos caracteres especiales. Agrupa los bytes de tres en tres y los reparte en cuatro caracteres; cuando sobran bytes se añade `=` como relleno. El resultado es una cadena más larga, pero formada solo por caracteres seguros para transportar.

## Por qué importa

Muchos formatos aceptan texto pero no bytes arbitrarios: un JSON, una cabecera HTTP o un correo. Codificar en Base64 permite meter ahí una imagen pequeña, un certificado o un Hash sin que los bytes se rompan al pasar por intermediarios. El coste es tamaño: la cadena crece alrededor de un tercio. Por eso se usa para transportar, no para almacenar archivos grandes.

## Ejemplo

```js
btoa('hola');     // 'aG9sYQ=='
atob('aG9sYQ=='); // 'hola'
```

En Node.js se usa `Buffer.from('hola').toString('base64')`; conviene no mezclar ambos entornos sin querer.

## Se confunde con

Con cifrado. Base64 es reversible con `atob` o cualquier decodificador: cualquiera puede leer el contenido. Tampoco es compresión: la salida ocupa más, no menos. Para proteger datos hace falta cifrado con clave; para reducir tamaño, compresión. Codificar y cifrar son pasos distintos que pueden combinarse, pero no se sustituyen.
