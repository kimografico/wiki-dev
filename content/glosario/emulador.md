---
titulo: "Emulador"
resumen: "Herramienta que reproduce el comportamiento de otro dispositivo o sistema en la máquina de desarrollo."
categoria: herramienta
tags: ["frontend","tests"]
alias: []
relacionados: ["frontend", "debug", "e2e", "playwright"]
fuentes: []
autoenlace: true
---
## Definición

Un emulador reproduce en la máquina de desarrollo el comportamiento de otro dispositivo o sistema: arranca un sistema operativo móvil, con su pila de red, permisos y ciclo de vida, dentro de una ventana. No es una captura ni una maqueta: ejecuta el mismo tipo de código que el aparato real, aunque con hardware simulado.

## Por qué importa

Permite probar una app en varios tamaños y versiones sin comprar cada modelo. El caso típico es un formulario que funciona en escritorio pero se rompe cuando el teclado del móvil reduce el viewport: con un emulador se reproduce en segundos y se puede depurar mientras se observa el resultado, sin esperar a tener el dispositivo a mano.

## Ejemplo

Iniciar un emulador de Android desde Android Studio, instalar la app y abrirla. En la web, el modo dispositivo de DevTools permite cambiar el viewport y simular una red lenta. En ambos casos comprueba cómo se ve y cómo responde, no solo cómo quedó el código.

## Se confunde con

No es un simulador: el emulador reproduce el sistema completo; el simulador suele imitar solo una parte del comportamiento y no ejecuta el mismo entorno. Tampoco sustituye al dispositivo real: la latencia, la cámara, los gestos y el consumo de batería se comportan distinto en hardware. Úsalo para iterar rápido y reserva el móvil físico para la comprobación final.
