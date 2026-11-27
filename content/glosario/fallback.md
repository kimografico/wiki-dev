---
titulo: "Fallback"
resumen: "Valor, ruta o comportamiento alternativo que se usa cuando la opción principal falla o no está disponible."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: ["feature-flag", "cabeceras-http", "cache", "frontend"]
fuentes: []
autoenlace: true
---
## Definición

Un fallback es un valor, una ruta o un comportamiento alternativo que se usa cuando la opción principal no está disponible. Es una decisión tomada por adelantado: ante la ausencia de algo, el sistema sigue funcionando con una versión menos completa en lugar de detenerse.

## Por qué importa

Evita que una dependencia externa o una función sin soporte deje la interfaz rota. Si una fuente no carga, mostrar la tipografía del sistema mantiene el texto legible; si una imagen falla, un texto alternativo conserva el significado. Sin fallback, un fallo pequeño se convierte en una página vacía o en un error que bloquea a la persona usuaria.

## Ejemplo

```css
font-family: 'Inter', system-ui, sans-serif;
```

El navegador prueba en orden y se queda con la primera fuente que puede mostrar. En JavaScript, el patrón equivalente es `const tema = opciones.tema ?? 'claro';`: si no hay valor, se usa el predeterminado.

## Se confunde con

No es un error: el fallback es la respuesta prevista ante la ausencia; el error es la condición que lo dispara. Tampoco es una caché: la caché reutiliza una respuesta anterior, mientras que el fallback elige una alternativa declarada. Ojo con los fallbacks silenciosos: si siempre se usa el valor por defecto, el problema real pasa desapercibido. Conviene registrar cuándo se activan.
