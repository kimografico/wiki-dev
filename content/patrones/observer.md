---
titulo: Patrón observer
resumen: "Patrón de comportamiento en el que un sujeto mantiene una lista de dependientes y les avisa cuando cambia su estado."
categoria: concepto
tags: [frontend]
alias: [observador, patrón de suscripción]
relacionados: [react, zustand]
fuentes: ["https://en.wikipedia.org/wiki/Observer_pattern"]
autoenlace: true
familia: comportamiento
---

## Problema

Varios objetos necesitan enterarse de los cambios de otro sin acoplarse a él. Si cada consumidor llama directamente al productor (o viceversa), el código se llena de referencias cruzadas: cambiar un proveedor obliga a tocar a todos los que lo usan.

## Solución

El sujeto expone `subscribe`/`unsubscribe` y, cuando su estado cambia, notifica a los suscriptores. Quien se suscribe solo conoce la interfaz del sujeto, no su implementación, así que se puede sustituir sin reescribir a los suscriptores.

## Estructura

```
Sujeto
  ├─ lista de observadores
  ├─ subscribe(observador)
  ├─ unsubscribe(observador)
  └─ notify()  →  llama a update() de cada observador

Observador
  └─ update(datos)
```

## Ejemplo

Una tienda de estado con notificación a suscripciones (la idea que usan los stores de estado tipo Zustand):

```ts
type Observador = (estado: string) => void;

class Sujeto {
  private observadores = new Set<Observador>();
  private estado = "";

  subscribe(observador: Observador): () => void {
    this.observadores.add(observador);
    return () => this.observadores.delete(observador);
  }

  setState(estado: string): void {
    this.estado = estado;
    for (const observador of this.observadores) observador(estado);
  }
}

const tienda = new Sujeto();
const unsubscribe = tienda.subscribe((estado) => console.log("cambió:", estado));

tienda.setState("oscuro"); // "cambió: oscuro"
unsubscribe();
tienda.setState("claro");  // ya no imprime nada
```

## Cuándo usarlo

Cuando hay uno o muchos dependientes de un sujeto y el acoplamiento directo duele: stores de estado, sistemas de eventos del navegador, suscripciones a websockets o notificaciones entre capas. En React es el patrón tras `subscribe` de los stores y detrás de los propios eventos del DOM.

No hace falta construirlo a mano si ya usas un store o `EventTarget`; merece la pena implementarlo cuando el flujo es propio y pequeño.
