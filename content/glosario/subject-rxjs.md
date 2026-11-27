---
titulo: "Subject de RxJS"
resumen: "Observable que reparte valores entre varios suscriptores y permite emitirlos con next; BehaviorSubject conserva el valor actual."
categoria: concepto
tags: [frontend]
alias: ["BehaviorSubject", "Behavior Subject"]
relacionados: [rxjs, gestion-de-estado, observer]
fuentes:
  - "https://raw.githubusercontent.com/ReactiveX/rxjs/7.8.2/docs_app/content/guide/subject.md"
  - "https://raw.githubusercontent.com/ReactiveX/rxjs/7.8.2/src/internal/Subject.ts"
  - "https://raw.githubusercontent.com/ReactiveX/rxjs/7.8.2/src/internal/BehaviorSubject.ts"
  - "https://reactivex.io/documentation/subject.html"
autoenlace: true
---

## Definición

Un Subject es un tipo especial de Observable que reparte cada valor entre varios suscriptores. Es Observable, porque admite `subscribe`, y Observer, porque expone `next(valor)`, `error(err)` y `complete()`. Al suscribirse no se inicia una nueva ejecución: el suscriptor se añade a una lista de observadores, como quien registra un `addEventListener`.

BehaviorSubject es una variante que exige un valor inicial, guarda el valor actual y lo entrega de inmediato a quien se suscribe.

## Por qué importa

Un Observable normal es *unicast*: cada suscripción ejecuta su propio productor. El Subject es *multicast*: el productor vive fuera de `subscribe` y sus emisiones se comparten. Por eso es el mecanismo que convierte un flujo frío en caliente dentro de RxJS.

La consecuencia práctica está en el momento de la suscripción: un Subject solo reenvía lo que ocurre **después** de suscribirse, mientras que BehaviorSubject puede responder con el estado que ya existía.

## Ejemplo

```ts
import { Subject } from 'rxjs';

const clic$ = new Subject<string>();
const suscripcion = clic$.subscribe((s) => console.log(s));

clic$.next('click'); // click
suscripcion.unsubscribe();
clic$.next('ignorado'); // nadie lo recibe
```

El `next` de un Subject no conserva el valor: recorre los observadores presentes y les entrega el valor. Un suscriptor nuevo no recibe lo que ya pasó.

## BehaviorSubject

```ts
import { BehaviorSubject } from 'rxjs';

const sesion$ = new BehaviorSubject<{ logueado: boolean }>({ logueado: false });

sesion$.subscribe((s) => console.log(s.logueado)); // false inmediato
sesion$.next({ logueado: true }); // true
console.log(sesion$.value.logueado); // true

const soloLectura$ = sesion$.asObservable();
```

El valor inicial es obligatorio. `value` y `getValue()` permiten leer el estado actual, y `next` lo actualiza antes de propagarlo. Cuando el estado debe ser compartido pero no modificado desde fuera, se expone `asObservable()`.

## Se confunde con

| Tipo | Qué guarda | Qué recibe un suscriptor nuevo |
|---|---|---|
| Subject | Nada | Solo emisiones posteriores a la suscripción |
| BehaviorSubject | El valor actual, con valor inicial obligatorio | El valor actual de inmediato y las emisiones posteriores |
| ReplaySubject | Varios valores recientes, con límite opcional por tiempo | Los valores guardados y las emisiones posteriores |
| AsyncSubject | El último valor | Ese último valor solo cuando se llama a `complete()` |

RxJS es el paquete; Subject es una de sus clases. Tampoco debe confundirse con el Patrón observer en general: Subject es una implementación concreta de ese patrón dentro de la biblioteca. Y «caliente» describe cuándo se crea el productor, no si las emisiones son asíncronas.
