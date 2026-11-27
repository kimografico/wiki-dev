---
titulo: "Bot"
resumen: "Programa que recibe mensajes y responde o ejecuta acciones automáticas según reglas, intenciones o un modelo."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: [agente, copilot, prompt, orquestador]
fuentes: []
autoenlace: true
alternativas: []
---

## Qué es

Un bot es un programa que recibe mensajes y responde o ejecuta acciones según unas reglas. Puede vivir en un chat, en un canal como Telegram o detrás de un comando de terminal. No es necesariamente inteligente: muchos bots siguen un árbol de decisiones fijo; otros combinan reglas con un modelo para interpretar lenguaje natural. Lo que lo define es la interfaz y el ciclo mensaje → respuesta, no el motor que haya detrás. Tampoco es una persona: no entiende el contexto que no se le entrega.

## Para qué sirve

Automatiza gestiones repetidas con una interfaz que cualquiera usa sin aprender una sintaxis nueva. El bot de Telegram de esta wiki recibe un término y lanza la creación de una entrada; un bot de soporte recoge un número de pedido y consulta su estado. Conviene cuando el flujo es conocido y se quiere filtrar, validar y registrar cada petición antes de actuar.

## Ejemplo

```js
const INTENCIONES = {
  entrada: (termino) => `Borrador de entrada para "${termino}"`,
  buscar: (termino) => `Buscando "${termino}" en la wiki`,
};

function responder(mensaje) {
  const [comando, ...resto] = mensaje.trim().split(/\s+/);
  const accion = INTENCIONES[comando];

  if (!accion) return "Comandos disponibles: entrada, buscar";
  if (resto.length === 0) return `Falta el término para ${comando}`;
  return accion(resto.join(" "));
}

console.log(responder("entrada spread rest"));
console.log(responder("desconocido"));
```

Antes de ejecutar una acción real, el bot debería validar el término, limitar su longitud y comprobar permisos.

## Limitaciones

Sin validación, un bot repite errores a gran velocidad: acepta textos vacíos, ejecuta acciones con permisos de más o responde lo mismo a intenciones distintas. El lenguaje natural es ambiguo, así que conviene pedir datos concretos y confirmar las acciones destructivas. Necesita límites de frecuencia, registro de lo que ejecutó y una salida clara para pasar a una persona. Si carece de memoria, cada mensaje empieza de cero.

## Matices

| Concepto | Dónde actúa | Quién decide el siguiente paso |
| -------- | ----------- | ------------------------------ |
| Bot | Canal de mensajes | El flujo definido o las reglas |
| Copilot | Editor de código | El desarrollador, que acepta o descarta |
| Agente | Bucle con herramientas | El propio agente dentro de límites |

Un bot puede tener un Agente detrás: la interfaz no determina la arquitectura.
