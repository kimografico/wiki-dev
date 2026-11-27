---
titulo: "SessionStorage"
resumen: "Almacén del navegador ligado a una pestaña: vive mientras esa pestaña siga abierta y no se envía al servidor."
categoria: concepto
tags: ["frontend","seguridad"]
alias: ["sessionStorage"]
relacionados: ["localstorage", "cookies", "almacenamiento-en-el-navegador"]
fuentes: ["https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage"]
autoenlace: true
---

## Definición

`SessionStorage` es un almacén clave-valor del navegador ligado a un origen y a una pestaña. Guarda cadenas de texto, no viaja en las peticiones HTTP y desaparece al cerrar esa pestaña. Abrir una pestaña nueva desde la actual copia el estado inicial, pero después cada una evoluciona por separado: escribir en una no se refleja en la otra.

## Por qué importa

Encaja con estados que solo tienen sentido durante la visita en curso: un filtro de búsqueda, el paso de un asistente o el borrador de un formulario. Tras recargar, el valor sigue ahí; al cerrar la pestaña, no queda rastro. Así un dato temporal no se arrastra semanas en localStorage. El espacio está sujeto a cuota y el acceso puede fallar en modo privado: conviene preverlo.

## Ejemplo

```js
sessionStorage.setItem("wiki:filtro", "backend");
const filtro = sessionStorage.getItem("wiki:filtro") ?? "todos";
// Para objetos, hay que serializar: setItem("filtros", JSON.stringify({ etiqueta: "tests" }));
```

`getItem` devuelve texto o `null`; nunca devuelve el objeto original.

## Se confunde con

Con localStorage: comparten API y origen, pero localStorage sobrevive al cierre y se comparte entre pestañas. También con las Cookies, que sí se envían al servidor en cada petición; aquí nada sale del navegador. Y no es una sesión de servidor: este último no conoce el valor salvo que el cliente se lo envíe.
