---
titulo: Lighthouse
resumen: Herramienta de auditoría que puntúa rendimiento, accesibilidad, buenas prácticas y SEO de una página.
categoria: herramienta
tags: [rendimiento, terminal]
alias: []
relacionados: [accesibilidad-web, responsive-web]
alternativas: []
web: https://developer.chrome.com/docs/lighthouse
npm: lighthouse
fuentes: [https://developer.chrome.com/docs/lighthouse/overview]
---

## Qué es

Lighthouse analiza una página y produce un informe con puntuaciones y recomendaciones sobre rendimiento, accesibilidad, buenas prácticas y SEO. Se ejecuta desde las DevTools del navegador o por línea de comandos.

## Para qué sirve

Da una visión objetiva de la salud de una página y señala mejoras concretas. Aquí sirve para comprobar que la wiki carga rápido y cumple umbrales razonables de accesibilidad.

## Cuándo usarlo

Cuando quieras medir y vigilar la calidad de una página tras un cambio importante, o antes de publicar.

## Cuándo no

No es una prueba funcional ni sustituye a la revisión manual con teclado y lector de pantalla. Un 100 no garantiza buena accesibilidad.

## Alternativas

WebPageTest profundiza en rendimiento de red; axe se centra en accesibilidad; Playwright puede lanzar auditorías automatizadas en CI.

## Ejemplo

```bash
npx lighthouse https://kimografico.github.io/wiki-dev/ --view
```
