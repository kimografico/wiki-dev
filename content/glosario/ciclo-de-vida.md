---
titulo: "Ciclo de vida"
resumen: "Sucesión de fases por las que pasa un componente o una pieza de código desde que se crea hasta que se descarta."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: [componentizacion, lit, react, propagacion-de-eventos]
fuentes: []
autoenlace: true
---
## Definición

El ciclo de vida de un componente es la sucesión de fases por las que pasa desde que se crea hasta que se descarta: construcción, conexión al DOM, actualizaciones ante cambios de datos y desconexión final. Cada fase tiene un propósito y no todas se repiten. En frameworks como Lit se reconocen en métodos del componente; en React se expresan mediante efectos.

## Por qué importa

Inicializar en el momento equivocado es una fuente habitual de errores: suscribirse a eventos en cada render acumula listeners, y olvidar la limpieza deja temporizadores vivos después de desmontar. Saber qué fase garantiza qué permite colocar la lectura de medidas, la petición de datos y la liberación de recursos donde corresponden, sin depender de que el componente «parezca» funcionar.

## Ejemplo

```js
connectedCallback() {
  this._observer = new IntersectionObserver(() => {});
}
disconnectedCallback() {
  this._observer?.disconnect();
}
```

Lo que se crea al conectar se libera al desconectar.

## Se confunde con

Con el ciclo de vida de un producto: aquél describe fases de un proyecto —desarrollo, publicación, mantenimiento—; éste describe la vida de una instancia en ejecución. Tampoco es el ciclo de una petición HTTP, que termina con la respuesta.
