---
titulo: "RxJS"
resumen: "Biblioteca para componer flujos de valores asíncronos y basados en eventos mediante Observables y operadores."
categoria: estado
tags: [frontend, backend]
alias: []
relacionados: [subject-rxjs, promesa, asincronia]
alternativas: [promesa]
web: "https://rxjs.dev"
npm: rxjs
fuentes:
  - "https://registry.npmjs.org/rxjs/latest"
  - "https://raw.githubusercontent.com/ReactiveX/rxjs/7.8.2/README.md"
  - "https://raw.githubusercontent.com/ReactiveX/rxjs/7.8.2/docs_app/content/guide/observable.md"
  - "https://raw.githubusercontent.com/ReactiveX/rxjs/7.8.2/docs_app/content/guide/glossary-and-semantics.md"
autoenlace: true
---

## Qué es

RxJS es la implementación de Reactive Extensions para JavaScript. Modela un flujo de valores con un `Observable`: ese flujo puede emitir cero, uno o muchos valores, en el momento o más adelante. Los operadores se encadenan con `pipe` y la ejecución empieza cuando alguien llama a `subscribe`.

`Observable`, `Subject`, `BehaviorSubject`, `ReplaySubject` y `AsyncSubject` son tipos exportados por el propio paquete; no son dependencias separadas ni se instalan aparte.

## Para qué sirve

Permite describir eventos que llegan en el tiempo —pulsaciones, clics, mensajes, respuestas cancelables— como una secuencia y combinarlos con operadores de filtrado, transformación o agrupación. La suscripción puede cancelarse con `unsubscribe`, algo que una Promesa no ofrece.

## Cuándo usarlo

Conviene cuando hay varios valores a lo largo del tiempo y la lógica se beneficia de composición: filtrar teclas, agrupar clics, reintentar peticiones o sincronizar varias fuentes.

## Cuándo no

Para una sola respuesta asíncrona, una Promesa resuelve el problema con menos conceptos. Tampoco aporta mucho usar RxJS como sustituto de un callback: el coste de conceptos —suscripción, operadores, cancelación— no se compensa si no hay flujos que combinar.

## Alternativas

Las alternativas directas son `promesa` para un único resultado y los iteradores o generadores cuando los valores se piden uno a uno. Existen además implementaciones de ReactiveX para otros lenguajes, como RxJava o Rx.NET.

## Ejemplo

```ts
import { of, map } from 'rxjs';

of(1, 2, 3)
  .pipe(map((n) => n * 2))
  .subscribe((n) => console.log(n)); // 2, 4, 6
```

En las versiones actuales los operadores se importan desde `'rxjs'`.

## Flujos fríos y calientes

Un flujo **frío** crea su productor dentro de cada `subscribe`: dos suscripciones ejecutan dos veces la misma lógica y cada una ve la secuencia completa. Un flujo **caliente** tiene el productor creado fuera de `subscribe`, por lo que lo normal es que varios suscriptores compartan emisiones y quien llega tarde se incorpore a mitad.

```ts
import { Observable, Subject } from 'rxjs';

const frio$ = new Observable<number>((suscriptor) => {
  console.log('creo productor');
  suscriptor.next(1);
  suscriptor.complete();
});
frio$.subscribe(); // creo productor
frio$.subscribe(); // creo productor de nuevo

const caliente$ = new Subject<number>();
caliente$.next(1); // nadie lo recibe todavía
caliente$.subscribe((n) => console.log(n));
caliente$.next(2); // 2
```

«Frío» no significa «asíncrono»: la documentación oficial muestra suscripciones frías que emiten de forma síncrona. La diferencia está en cuándo se crea el productor. Para convertir un flujo frío en compartido se usa un Subject de RxJS.
