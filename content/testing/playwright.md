---
fecha: 2026-11-23
titulo: Playwright
resumen: Herramienta de automatización del navegador para pruebas de extremo a extremo en Chromium, Firefox y WebKit.
categoria: herramienta
tags: [tests]
alias: []
relacionados: [e2e, estrategia-de-testing, cobertura]
alternativas: [vitest]
web: https://playwright.dev
npm: playwright
fuentes: [https://playwright.dev/docs/intro]
---

## Qué es

Playwright controla navegadores reales (Chromium, Firefox y WebKit) desde código. Abre páginas, pulsa, escribe y comprueba resultados como lo haría una persona. Es una herramienta: el alcance de lo que se prueba se decide con la estrategia de testing, no con la herramienta en sí.

Cada prueba recibe un contexto y una página aislados, de modo que la sesión, las cookies y el almacenamiento de un caso no se filtran al siguiente. Además, espera automáticamente a que un elemento esté visible y listo antes de interactuar, lo que reduce los fallos intermitentes.

## Para qué sirve

Prueba la aplicación de extremo a extremo: que una página carga, que un enlace navega, que el interruptor de tema cambia de verdad. Es la vía prevista en este proyecto para pruebas de interfaz y de accesibilidad en el navegador.

También sirve para inspeccionar un fallo con las herramientas del navegador, grabar la ejecución o repetirla contra distintos motores para detectar diferencias de compatibilidad.

## Tipos de prueba

- **Extremo a extremo (E2E):** flujos completos en un navegador real.
- **De API:** peticiones HTTP directas contra el servidor, sin pasar por la interfaz.
- **Visuales:** capturas comparadas con una referencia para detectar cambios de aspecto no previstos.
- **De accesibilidad:** comprobaciones de roles, nombres accesibles y navegación por teclado sobre la página real.

## Cuándo usarlo

Cuando interesa verificar flujos reales en un navegador de verdad, más allá de las unidades que se comprueban de forma aislada. Encaja especialmente en los recorridos críticos: acceso, búsqueda, formularios y cambio de tema.

## Cuándo no

Es más lento y frágil que una prueba unitaria: no conviene usarlo para lógica pura ni para enumerar todas las ramas de una validación. Tampoco es la mejor herramienta para comprobar una respuesta HTTP concreta sin interfaz; en ese caso basta una prueba de API.

## Alternativas

| Opción | Para qué sirve |
|---|---|
| Playwright | Flujos completos en navegadores reales |
| Vitest | Lógica unitaria y de componentes con ejecución rápida en Node.js |

No compiten en el mismo nivel: Vitest cubre las unidades y Playwright comprueba que esas unidades funcionan juntas en la pantalla. Una suite equilibrada usa las dos, con pocos flujos E2E bien elegidos.

## Ejemplo

```ts
import { test, expect } from "@playwright/test";

test("cambia el tema", async ({ page }) => {
  await page.goto("/wiki-dev/");
  await page.getByRole("button", { name: /tema/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
```

Buscar por rol en lugar de por clase hace que la prueba siga funcionando si cambia el CSS, y comprueba algo que el usuario realmente percibe.
