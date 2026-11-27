---
titulo: "Saucelabs"
resumen: "Nube de navegadores y dispositivos para ejecutar tests E2E reales; cuándo compensa frente a BrowserStack."
categoria: herramienta
tags: ["tests"]
alias: []
relacionados: ["browserstack", "e2e", "playwright", "cobertura"]
fuentes: ["https://docs.saucelabs.com/"]
autoenlace: true
alternativas: ["browserstack"]
web: "https://saucelabs.com/"
---

## Qué es

Sauce Labs es una plataforma en la nube que ofrece navegadores y dispositivos reales para ejecutar pruebas automatizadas. Tu suite sigue en el repositorio; lo que cambia es dónde se lanza: en una máquina remota en lugar del portátil. No es un framework de pruebas ni un sustituto de los tests unitarios: hace falta un ejecutor compatible, como Playwright o WebdriverIO, para definir los escenarios. La confusión habitual es creer que contratar la nube ya produce pruebas; sin tests escritos no hay nada que ejecutar.

## Para qué sirve

Un caso reconocible: un fallo que solo aparece en Safari o en un móvil con iOS. En lugar de instalar y mantener esos dispositivos, se apunta la misma prueba a ese navegador y se recibe el resultado con capturas, grabación de la sesión y trazas. 

## Cuándo usarla

Cuando la aplicación tiene usuarios en navegadores que el equipo no tiene instalados; cuando un error depende de un dispositivo real; cuando la integración continua necesita comprobar varias combinaciones de sistema y navegador; o cuando diagnosticar un fallo requiere ver exactamente qué hizo el usuario antes de que apareciera.

## Cuándo no

Para lógica pura, donde un test unitario local es más rápido y preciso. Tampoco conviene enviar toda la suite a la nube en cada cambio: las pruebas remotas son más lentas y pueden volverse inestables si dependen de redes externas. Conviene mantener un bucle local rápido y reservar la nube para la cobertura que de verdad aporta señal.

## Ejemplo

```js
import { remote } from "webdriverio";

const navegador = await remote({
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  capabilities: { browserName: "safari", platformName: "macOS" },
});

await navegador.url("https://ejemplo.test");
await navegador.$("#buscar").setValue("astro");
await navegador.deleteSession();
```

Las credenciales llegan como variables de entorno desde el sistema de secretos de CI; nunca se escriben en el repositorio. El código de la prueba es el mismo que se ejecutaría en local: solo cambia la sesión remota.

## Frente a BrowserStack

| Criterio | Sauce Labs | BrowserStack |
| --- | --- | --- |
| Foco | Automatización y grabación de sesiones | Prueba manual y automatizada en muchos dispositivos |
| Decisión | Elegirla si el flujo de CI ya encaja con su modelo | Elegirla si se necesita explorar dispositivos desde el navegador |

Ambas resuelven el mismo problema de fondo: obtener navegadores que no tienes. La elección suele depender de la integración con el ejecutor de pruebas y del flujo de trabajo del equipo, no de una lista de características.

## Matices: cobertura útil

Ejecutar más navegadores no significa tener mejores pruebas. Conviene elegir las combinaciones que representan a los usuarios reales y dejar fuera las que nunca fallan. Las grabaciones ayudan a depurar, pero no sustituyen buenos selectores.
