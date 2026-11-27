---
titulo: "Binding"
resumen: "Enlace declarativo entre dato y vista que propaga cambios sin sincronizaciones manuales."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: [reactividad, lit, react, gestion-de-estado, dom]
fuentes: []
autoenlace: true
---
## Definición

Un binding es un enlace declarativo entre un dato y una vista, o entre dos componentes. Se define una vez y el marco de trabajo se encarga de propagar los cambios: cuando el dato cambia, la interfaz se actualiza. Es una relación, no una copia manual; por eso importa su dirección: hacia la vista, desde la vista o en ambos sentidos.

## Por qué importa

Evita sincronizaciones escritas a mano. En un formulario con diez campos, actualizar cada etiqueta a mano es propenso a olvidar una. Con un binding, el estado es la fuente de verdad y la vista lo refleja. En una wiki, el selector de tema es un caso claro: el valor elegido se guarda y el atributo del documento cambia sin tocar el DOM directamente.

## Ejemplo

```ts
@property({ type: Boolean, reflect: true })
oscuro = false;
```

En Lit, `@property` enlaza la propiedad con el atributo del elemento; al cambiar `oscuro`, el atributo y la plantilla se actualizan. En React, el equivalente es pasar props al componente.

## Se confunde con

Con un evento. El binding describe un vínculo continuo; un evento es una notificación puntual cuando algo ocurre. También se confunde con acceso a datos remotos: enlazar una vista con una propiedad local no implica llamar a una API.

## Matices

En otros contextos se habla de bindings entre servicios, por ejemplo en sistemas de mensajería; aquí el término se usa en sentido de interfaz.
