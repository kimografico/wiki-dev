---
titulo: "BrowserStack"
resumen: "Plataforma en la nube que ofrece navegadores y dispositivos reales para ejecutar pruebas de compatibilidad sin mantener un laboratorio local."
categoria: herramienta
tags: ["tests", "rendimiento"]
alias: []
relacionados: ["playwright", "e2e", "chromium", "saucelabs"]
fuentes: ["https://www.browserstack.com/docs"]
autoenlace: true
alternativas: ["saucelabs"]
web: "https://www.browserstack.com/"
---
## Qué es

BrowserStack es una plataforma que expone navegadores y dispositivos en la nube para ejecutar pruebas de interfaz. En lugar de instalar Safari en una máquina con otro sistema operativo o comprar móviles, la prueba se envía a un navegador remoto y devuelve resultados, capturas y trazas. No es un framework de testing: las pruebas se siguen escribiendo con la herramienta habitual; BrowserStack sustituye el entorno donde se ejecutan.

## Para qué sirve

Permite comprobar si una página funciona igual en Safari, en Firefox y en un móvil Android. Los fallos de compatibilidad suelen aparecer fuera del navegador de desarrollo: un menú que no responde a eventos táctiles, una fuente que desborda o una API no soportada. Una matriz en la nube permite reproducirlos sin montar un laboratorio y compartir la evidencia con el equipo.

## Cuándo usarla

- La aplicación se usa en muchos navegadores y el soporte forma parte del requisito.
- Un fallo solo se reproduce en un dispositivo o versión que no tienes en local.
- Necesitas ejecutar la misma suite de E2E en varios entornos antes de publicar.

## Cuándo no

Para lógica unitaria o pruebas de componentes sin navegador real, no aporta nada: corre más rápido en local. Tampoco hace falta pagar por cobertura multi-navegador si el producto solo se usa en un entorno controlado. Si la regresión se reproduce en Chromium local, empieza por depurar ahí.

## Alternativas

| Opción | Criterio para elegirla |
| --- | --- |
| BrowserStack | Priorizas dispositivos reales, una amplia matriz y compartir resultados con el equipo. |
| Saucelabs | Buscas capacidades parecidas con otra integración y otro modelo de configuración. |
| Navegadores locales | El conjunto de navegadores es pequeño y los puedes instalar tú mismo. |

Compara primero qué navegadores necesitas de verdad; la matriz que no se usa es coste sin información.

## Ejemplo

Con Playwright, la misma suite se lanza en varios proyectos:

```bash
npx playwright test --project=chromium --project=firefox --project=webkit
```

En local esos proyectos usan navegadores instalados; con BrowserStack, el ejecutor envía las mismas pruebas a navegadores remotos configurando el proveedor en la configuración del proyecto. Cambia el destino, no el test.

## Matices

Dispositivo real no es lo mismo que emulador: un emulador simula tamaño y capacidades, pero un dispositivo real añade peculiaridades del navegador del fabricante. Para decisiones de compatibilidad, conviene reservar la nube para los casos donde esa diferencia importa y dejar el resto de la suite en ejecución local.
