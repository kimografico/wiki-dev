---
titulo: "Chromium"
resumen: "Navegador de código abierto en el que se basan Chrome y Edge; motor habitual de las pruebas E2E."
categoria: herramienta
tags: ["frontend","tests"]
alias: []
relacionados: [playwright, e2e, browserstack]
fuentes: []
autoenlace: true
alternativas: [browserstack, saucelabs]
web: "https://www.chromium.org/"
---
## Qué es

Chromium es un navegador de código abierto y, sobre todo, el **motor** que hay debajo de otros navegadores: Google Chrome y Microsoft Edge lo usan como base. Conviene separar motor y producto. El motor interpreta HTML, CSS y JavaScript y pinta la página; el producto añade interfaz, sincronización y servicios del fabricante. Cuando una prueba dice «abre Chromium», normalmente está lanzando una compilación automatizada de ese motor, sin la interfaz de Chrome.

## Para qué sirve

Sirve como navegador de uso general y como objetivo por defecto de las pruebas automatizadas. Al ser el motor más extendido, casi todas las herramientas de E2E lo incluyen y pueden arrancarlo sin instalar un navegador del sistema. Eso permite comprobar que un formulario envía datos, que un menú responde a clics o que una regla de estilos se aplica, siempre en el mismo entorno en que se ejecuta el test.

## Cuándo usarla

Elige Chromium cuando buscas velocidad y repetibilidad: arranca rápido, se comporta de forma estable entre ejecuciones y se integra con Playwright sin configuración adicional. Es la opción natural para la batería diaria de pruebas en integración continua y para depurar con las herramientas de desarrollo del navegador. También es el objetivo correcto cuando tu audiencia usa mayoritariamente Chrome o Edge.

## Cuándo no

No cubre por sí solo el comportamiento de otros motores: WebKit —Safari— y Gecko —Firefox— interpretan algunas reglas de forma distinta. Un layout impecable en Chromium puede romperse en iOS. Tampoco sirve para validar la experiencia real en un móvil: reducir el viewport de un navegador de escritorio no emula el sistema operativo ni sus gestos.

## Alternativas

Cuando la duda es cómo cubrir otros motores sin mantener una granja de navegadores, BrowserStack y Saucelabs ofrecen navegadores remotos bajo demanda. El criterio de decisión es operativo: Chromium local es más rápido y más barato de mantener en el día a día; estas plataformas aportan cobertura real de Safari, Firefox y dispositivos, a cambio de depender de la red, de colas de ejecución y de más configuración. No sustituyen al motor: son otra forma de ejecutar las mismas pruebas.

## Ejemplo

```js
import { chromium } from "playwright";

const navegador = await chromium.launch();
const pagina = await navegador.newPage();
await pagina.goto("https://example.com/acceso");
await pagina.getByLabel("Correo").fill("usuario@example.com");
await pagina.getByRole("button", { name: "Entrar" }).click();
console.log(await pagina.title());
await navegador.close();
```

Ese guion abre una instancia sin interfaz, rellena un campo, pulsa el botón y cierra el navegador. Es la unidad mínima que después se convierte en una prueba E2E con aserciones.

## Matices

| Necesidad | Pieza adecuada |
|-----------|----------------|
| Velocidad en integración continua | Chromium local |
| Comprobar Safari o Firefox | BrowserStack o Saucelabs |
| Verificar perfil y sincronización reales | Chrome |
