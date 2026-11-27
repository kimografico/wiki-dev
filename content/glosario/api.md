---
titulo: "API"
resumen: "Contrato que define qué se puede pedir a otro programa y qué devuelve, sin exponer su implementación."
categoria: datos-api
tags: ["nivel-0"]
alias: []
relacionados: [libreria, metodos-http, url, codigos-http]
fuentes: []
autoenlace: true
---
## Definición

Una API (Application Programming Interface) es el contrato por el que un programa ofrece funciones o datos a otro. Define qué se puede pedir, con qué forma y qué se devuelve; no dice cómo se calcula internamente. Puede ser una función, una ruta HTTP o un evento, pero siempre separa quien usa la interfaz de quien la implementa.

## Por qué importa

Es el límite donde se rompen las aplicaciones. Si un servicio cambia el nombre de un campo de `nombre` a `nombreCompleto`, su código interno puede seguir siendo correcto y aun así fallar todos los clientes. Por eso una API estable permite cambiar implementaciones, bases de datos o marcos de trabajo sin avisar a quien la consume, siempre que se respete el contrato. Los Métodos HTTP forman parte de ese lenguaje común.

## Ejemplo

```js
const respuesta = await fetch('/api/usuarios/42');
const usuario = await respuesta.json();
console.log(usuario.nombre);
```

El cliente solo necesita saber que esa URL devuelve un objeto con `nombre`; no necesita conocer la consulta que lo obtiene.

## Se confunde con

La Librería se enlaza dentro del proceso y se actualiza en el proyecto; una API remota se consume a través de la red y puede fallar por latencia o indisponibilidad. Tampoco es lo mismo que una URL: la dirección identifica un recurso, mientras que la API es el conjunto de reglas que permiten usarlo.
