---
fecha: 2026-11-24
titulo: "Concurrencia"
resumen: "Capacidad de un sistema para gestionar y ejecutar múltiples tareas en periodos de tiempo superpuestos no necesariamente simultáneos."
categoria: "concepto"
tags: ["backend", "rendimiento"]
alias: ["programación concurrente", "multitarea"]
relacionados: ["nodejs"]
fuentes: ["https://en.wikipedia.org/wiki/Concurrency_(computer_science)"]
autoenlace: true
terminoEn: "Concurrency"
---

## Definición

La concurrencia es la cualidad de un sistema informático para procesar o avanzar en múltiples tareas durante el mismo intervalo de tiempo. No debe confundirse con la paralelización real: mientras que el paralelismo implica la ejecución física simultánea en múltiples núcleos de CPU, la concurrencia se refiere a la estructura de un programa que descompone operaciones para intercalar su ejecución.

En entornos mono-núcleo o en bucles de eventos (event loops), la concurrencia se logra alternando rápidamente entre tareas mediante llamadas asíncronas o cambios de contexto, dando la apariencia de ejecución simultánea.

## Por qué importa

La concurrencia es fundamental para el diseño de aplicaciones modernas, especialmente en servidores web y sistemas interactivos:

- **Eficiencia de E/S**: Permite que una aplicación continúe atendiendo peticiones mientras espera operaciones lentas de lectura/escritura en disco o red (E/S no bloqueante).
- **Responsividad**: Evita que la interfaz de usuario o el hilo principal se congelen al procesar operaciones complejas.
- **Escalabilidad**: Optimiza el uso del procesador y los recursos del sistema para manejar miles de conexiones simultáneas.

## Ejemplo

Un caso común de concurrencia se da en Node.js, donde un único hilo maneja múltiples peticiones de red simultáneamente mediante el uso de llamadas asíncronas y promesas:

```js
import http from 'node:http';

// El servidor atiende múltiples solicitudes entrantes de forma concurrente
const server = http.createServer(async (req, res) => {
  // La lectura a la base de datos se delega y no bloquea otras peticiones
  const data = await consultarBaseDeDatos();
  res.end(JSON.stringify(data));
});

server.listen(3000);
```

## Se confunde con

- **Paralelismo**: El paralelismo requiere hardware multinúcleo para ejecutar dos o más instrucciones exactamente en el mismo instante. La concurrencia es sobre la *estructura* del código para lidiar con muchas cosas a la vez; el paralelismo es sobre la *ejecución* física de muchas cosas a la vez.
- **Asincronía**: La asincronía es un mecanismo de programación (como callbacks, promesas o async/await) que facilita la concurrencia al liberar el hilo de ejecución mientras se espera el resultado de un evento externo.