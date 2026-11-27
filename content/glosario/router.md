---
titulo: "Router"
resumen: "Componente o módulo que decide qué contenido mostrar según la ruta de la URL."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: [url, path, ssr, csr]
fuentes: []
autoenlace: true
---

## Definición

Un router es el componente que asocia una ruta de la URL con el contenido que debe mostrarse y con la navegación entre páginas. Mantiene la correspondencia entre la barra de direcciones, el historial del navegador y la vista activa.

## Por qué importa

Sin router, cada enlace obligaría a recargar la página y la URL dejaría de representar el estado. En un sitio estático, `/glosario/closure` se resuelve en un archivo generado; en una SPA, el router decide qué componente monta sin recargar. Así se puede compartir un enlace, volver atrás con el botón del navegador y abrir una ruta directamente sin pasar por la página de inicio. Una ruta estable es valiosa: cambiarla rompe enlaces compartidos y marcas de entradas aprendidas.

## Ejemplo

```js
// Rutas lógicas de una SPA
const rutas = {
  "/glosario/closure": fichaClosure,
  "/glosario/router": fichaRouter,
};
```

## Se confunde con

Con el servidor: el router puede vivir en el cliente, en el servidor o en ambos; el servidor decide qué bytes enviar y el router, qué vista corresponde. Tampoco es el path: el path es una parte de la URL; el router es quien la interpreta.
