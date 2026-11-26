---
titulo: "Base64"
resumen: "Codificación que representa datos binarios como texto usando 64 símbolos."
categoria: datos-api
tags: ["nivel-0"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Codificación que representa datos binarios como texto usando 64 símbolos.

## Por qué importa

Permite transportar bytes en campos que solo aceptan texto, por ejemplo dentro de un JSON o una cabecera HTTP.

## Ejemplo

```js
btoa('hola'); // 'aG9sYQ=='
```

## Se confunde con

No es cifrado: cualquiera puede decodificarlo; solo cambia la representación, no protege el contenido.
