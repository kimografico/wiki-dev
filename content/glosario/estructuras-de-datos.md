---
titulo: "Estructuras de datos"
resumen: "Formas organizadas de guardar y acceder a información: listas, pilas, colas, árboles, grafos y tablas hash."
categoria: concepto
tags: ["nivel-0"]
alias: []
relacionados: ["array", "algoritmo", "hash", "entidad"]
fuentes: []
autoenlace: true
---
## Definición

Una estructura de datos es una forma organizada de guardar y acceder a la información: listas, pilas, colas, árboles, grafos y tablas hash, entre otras. El nombre describe cómo se relacionan los elementos y qué operaciones resultan baratas, no qué contienen. Es un paraguas, no el nombre de una clase concreta.

## Por qué importa

La elección determina el coste de insertar, buscar o recorrer antes de escribir la lógica. Buscar por clave en un array obliga a recorrerlo; en una tabla hash, la búsqueda es directa casi siempre. Saberlo evita optimizar prematuramente y también el error contrario: usar una estructura compleja donde una lista ordenada bastaba.

## Ejemplo

- Cola: quien llega primero sale primero; útil para un buffer de tareas.
- Pila: sale lo último que entró; útil para deshacer cambios.
- Tabla hash: `Map` en JavaScript, para buscar por clave.

```js
const vistos = new Map();
vistos.set('a', 1);
vistos.has('a'); // búsqueda por clave, sin recorrer
```

## Se confunde con

No es un array específico: el Array es una estructura concreta; este término cubre todas. Tampoco es un algoritmo: la estructura es el contenedor, el algoritmo es el procedimiento que opera sobre él. Y no decide el rendimiento por sí sola: una tabla hash es rápida buscando por clave pero no mantiene orden; si necesitas recorrer en orden, un array ordenado puede ser la respuesta correcta.
