---
titulo: "Google Analytics"
resumen: "Servicio de analítica que registra visitas, origen del tráfico y recorridos por el sitio."
categoria: herramienta
tags: ["frontend"]
alias: []
relacionados: [lighthouse, core-web-vitals, cookies, accesibilidad-web]
fuentes: [https://developers.google.com/analytics/devguides/collection/gtagjs]
autoenlace: true
alternativas: []
---
## Qué es

Google Analytics es un servicio de analítica web que recibe eventos desde el sitio y los convierte en informes de visitas, origen del tráfico y páginas consultadas. Se instala con una etiqueta de script o mediante una integración del generador de sitio. No es un sistema de logs ni una herramienta de errores: trabaja con eventos agregados y sacrifica detalle a cambio de responder preguntas de uso a escala.

## Para qué sirve

Permite saber qué entradas se leen, por dónde llegan los lectores y en qué punto abandonan. En una wiki sirve para priorizar: si una entrada recibe muchas visitas y sigue siendo corta, es candidata a ampliación; si una sección nunca se abre, quizá sobra. También ayuda a comprobar si una publicación nueva trae tráfico de búsqueda.

## Cuándo usarla

Úsalo cuando necesites datos de uso agregados para decidir contenido o diseño, y cuando el sitio publicado tenga tráfico suficiente para que las cifras signifiquen algo. Antes de instrumentar conviene decidir qué se va a medir: páginas vistas, clics en enlaces o conversiones. Sin esa lista, el panel se llena de métricas que nadie consulta.

## Cuándo no

No es una herramienta de rendimiento ni de errores: para medir carga y Core Web Vitals sirve Lighthouse; para detectar excepciones hacen falta trazas o monitorización. Tampoco mide lo que ocurre antes de que cargue la página: si el script tarda en llegar, esa visita puede no contarse. Y no sustituye una decisión de privacidad: hay que informar del uso de cookies y respetar la configuración del navegador.

## Matices

| Lo que se quiere saber | Pieza adecuada |
|------------------------|----------------|
| Qué páginas se leen | Google Analytics |
| Cuánto tarda en cargar | Lighthouse |
| Si el contraste cumple | Accesibilidad web |
| Qué error lanzó el navegador | Trazas y monitorización |

Analítica y rendimiento se confunden porque ambos terminan en un panel de números, pero responden a cosas distintas: una describe el comportamiento de las personas, la otra describe el comportamiento del sitio.

## Ejemplo

```js
// Registro de un evento cuando se abre una entrada de la wiki.
function registrarLectura(slug) {
  gtag("event", "lectura_entrada", {
    pagina: slug,
    categoria: "wiki",
  });
}

registrarLectura("tecnologias/google-analytics");
```

El evento viaja con un nombre y unas etiquetas; el informe agrupa después todos los eventos con el mismo nombre. Conviene fijar esos nombres antes de publicar, porque cambiarlos rompe la serie histórica.
