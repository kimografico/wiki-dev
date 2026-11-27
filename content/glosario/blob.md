---
titulo: "Blob"
resumen: "Secuencia de bytes opaca con tipo y tamaño, pensada para transportar archivos sin convertirlos a texto."
categoria: datos-api
tags: ["frontend"]
alias: []
relacionados: [base64, binario, url, formatos-de-datos]
fuentes: []
autoenlace: true
---
## Definición

Un Blob (Binary Large Object) es una secuencia de bytes tratada como una unidad opaca. Tiene tipo MIME y tamaño, pero no interpreta su contenido: para el programa es una bolsa de datos. Se usa para representar imágenes, PDF, audio o texto que se quiere manejar como archivo antes de guardarlo o enviarlo.

## Por qué importa

Es la pieza que conecta el navegador con archivos sin pasar por una cadena intermedia. Al recibir un `File` de un input, se trabajan sus bytes directamente; al crear una URL temporal con `URL.createObjectURL`, se puede previsualizar una imagen sin subirla. Convertir Binario a texto para transportarlo obliga a codificarlo y ocupa más espacio.

## Ejemplo

```js
const archivo = new File(['hola'], 'nota.txt', { type: 'text/plain' });
const url = URL.createObjectURL(archivo);
// usar url como src de una imagen o enlace de descarga mientras siga siendo válida
// solo al terminar, liberar la referencia:
URL.revokeObjectURL(url);
```

Liberar la URL evita retener el archivo en memoria cuando ya no se necesita.

## Se confunde con

Con un objeto de dominio. Un blob no tiene campos ni reglas de negocio: no sabe si contiene una factura válida. Tampoco es lo mismo que Base64: Base64 es una representación textual de esos bytes, no el binario en sí. Y un `File` es un tipo de Blob con nombre y fecha; todo File es Blob, pero no al revés.
