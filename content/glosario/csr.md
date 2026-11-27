---
titulo: "CSR"
resumen: "Client-Side Rendering: generación del HTML en el navegador mediante JavaScript."
categoria: concepto
tags: ["frontend","rendimiento"]
alias: ["Client-Side Rendering"]
relacionados: [ssr, hidratacion, static-site-generation, virtual-dom]
fuentes: []
autoenlace: true
---

## Definición

CSR (Client-Side Rendering) es la generación del HTML en el navegador: el servidor envía un documento casi vacío junto con los scripts, y es JavaScript quien construye la interfaz. El HTML inicial no contiene el contenido final; este aparece después de descargar, analizar y ejecutar los bundles.

## Por qué importa

Determina qué ve el usuario en el primer instante y qué ve un rastreador que no ejecuta JavaScript. En una SPA con CSR, el archivo HTML puede pesar poco, pero la página parece vacía hasta que llegan los datos. También traslada coste de CPU al dispositivo del visitante: en móviles modestos, el tiempo hasta la interacción puede crecer aunque la red sea rápida.

## Ejemplo

```html
<div id="root"></div>
<script type="module" src="/assets/app.js"></script>
```

Al ejecutarse, React u otra biblioteca monta la interfaz dentro de `#root`. Hasta entonces, la pestaña muestra esa etiqueta vacía.

## Se confunde con

Con SSR. En SSR el servidor entrega HTML con contenido ya renderizado y después se añade interactividad; en CSR no existe esa primera entrega útil. Tampoco es lo mismo que hidratación: hidratar es reutilizar el HTML que ya envió el servidor, no generarlo desde cero.
