---
fecha: 2026-10-13
titulo: Lighthouse
resumen: Herramienta de auditoría que puntúa rendimiento, accesibilidad, buenas prácticas y SEO de una página.
categoria: herramienta
tags: [rendimiento, terminal]
alias: []
relacionados: [accesibilidad-web, responsive-web, core-web-vitals, wcag]
alternativas: [playwright]
web: https://developer.chrome.com/docs/lighthouse
npm: lighthouse
fuentes: [https://developer.chrome.com/docs/lighthouse/overview]
---

## Qué es

Lighthouse es una herramienta de auditoría que abre una página y emite un informe con puntuaciones y recomendaciones en cuatro ejes: rendimiento, accesibilidad, buenas prácticas y SEO. Se ejecuta desde las DevTools de Chromium o desde línea de comandos y produce un informe reproducible. Mide una sesión concreta, no el comportamiento de todos los usuarios: el resultado depende del dispositivo y la red simulados.

## Para qué sirve

Obtener una fotografía objetiva de la salud de una página y una lista priorizada de mejoras. Caso concreto: tras cambiar el sistema de estilos de la wiki, se lanza la auditoría sobre la dirección publicada y se comprueba que la carga y los umbrales de accesibilidad no han empeorado.

## Cuándo usarlo

- Cuando quieres medir antes y después de un cambio relevante, con las mismas condiciones de ejecución.
- Cuando necesitas un informe que se pueda adjuntar a una incidencia o a una revisión.
- Cuando vas a publicar y quieres una comprobación rápida de regresiones visibles en rendimiento o SEO.

## Cuándo no

- No es una prueba funcional: no verifica que un formulario envíe los datos ni que un menú abra.
- No sustituye la revisión manual con teclado y lector de pantalla; una puntuación alta no garantiza accesibilidad real.
- No mide a tus usuarios reales: para eso hacen falta datos de campo como los Core Web Vitals.

## Alternativas

WebPageTest profundiza en la cadena de red y permite comparar ubicaciones y navegadores. axe se centra solo en accesibilidad y encaja bien en pruebas automatizadas. Playwright puede lanzar auditorías dentro de una pipeline. La elección depende de la pregunta: red, accesibilidad o integración continua.

## Matices

Las puntuaciones son una guía, no un objetivo ciego: optimizar una métrica puede empeorar otra. Conviene fijar las condiciones de la medición —mismo dispositivo simulado, misma red— y comparar tendencias, no cifras aisladas. El informe señala el peso de los recursos y las oportunidades de mejora; decide el equipo cuáles merecen la pena. Un informe de laboratorio nunca sustituye a la observación de usuarios reales.

## Ejemplo

```bash
npx lighthouse https://kimografico.github.io/wiki-dev/ --view
```

Para integrarlo en una pipeline se usa la interfaz de línea de comandos con un presupuesto que hace fallar la tarea cuando una métrica supera el umbral acordado.
