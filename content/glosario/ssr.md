---
titulo: "SSR"
resumen: "Server-Side Rendering: generación del HTML en el servidor para cada petición, antes de llegar al navegador."
categoria: concepto
tags: ["frontend","rendimiento"]
alias: ["Server-Side Rendering"]
relacionados: ["csr", "static-site-generation", "hidratacion", "nextjs"]
fuentes: []
autoenlace: true
---

## Definición

SSR (*Server-Side Rendering*) es generar el HTML de una página en el servidor cuando llega una petición. El navegador recibe ya el marcado con los datos principales, no un contenedor vacío que debe rellenar después. Ese HTML se hidrata en el cliente para añadir interactividad.

## Por qué importa

Un rastreador y una persona con JavaScript desactivado ven contenido real en la primera respuesta. En una ficha con precio y descripción procedentes de una base de datos, SSR evita el parpadeo inicial de "cargando…". El coste es un servidor que trabaja en cada visita: conviene vigilar el tiempo hasta la primera respuesta y decidir qué se puede cachear.

## Ejemplo

```jsx
const html = renderToString(<Ficha producto={producto} />);
return new Response(html, { headers: { "content-type": "text/html" } });
```

En código real, los datos se escapan o se interpolan mediante la plantilla del framework; concatenar texto directamente abre XSS.

## Se confunde con

No es CSR: en CSR el servidor envía un HTML casi vacío y el navegador construye la interfaz. Tampoco es Generación de sitio estático: SSG produce el HTML una vez durante el build, no en cada petición. La Hidratación es el paso posterior que conecta los eventos al HTML ya recibido, no una forma alternativa de generarlo.

## Matices

Una página con HTML en servidor pero con datos clave inyectados después por JavaScript pierde gran parte de la ventaja.
