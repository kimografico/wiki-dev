---
titulo: "Loader"
resumen: "Indicador visual de carga que comunica que una operación sigue en curso y aún no hay resultado."
categoria: rendimiento-ux
tags: ["frontend","rendimiento"]
alias: []
relacionados: [skeleton, lazy-load, fallback, frontend]
fuentes: []
autoenlace: true
---

## Definición

Un loader es un indicador visual —normalmente un círculo animado o una barra— que aparece mientras una operación está en curso y aún no hay resultado que mostrar. Su función es responder a la persona usuaria: «sigo trabajando, espera».

## Por qué importa

Una búsqueda que tarda dos segundos sin feedback parece colgada; la reacción natural es pulsar otra vez, lo que duplica peticiones. Un loader bien colocado reduce esa incertidumbre. Pero importa cuánto dura: si la respuesta llega en 100 ms, el spinner parpadea y distrae, así que conviene esperar un pequeño umbral antes de mostrarlo. Para listas donde ya se conoce la forma del contenido, un Skeleton informa mejor que un círculo genérico.

## Ejemplo

```js
async function buscar() {
  mostrarLoader();
  const datos = await fetch("/api/resultados").then(r => r.json());
  ocultarLoader();
  return datos;
}
```

Conviene ocultarlo también en `finally` si la petición puede fallar.

## Se confunde con

Con el loader de un bundler. En Webpack o Vite, un *loader* es un módulo que transforma archivos durante el build, por ejemplo TypeScript a JavaScript. Aquí hablamos del indicador de la interfaz, que vive en el navegador. Tampoco es un Fallback: el fallback es contenido alternativo cuando algo falla; el loader anuncia que todavía está cargando.
