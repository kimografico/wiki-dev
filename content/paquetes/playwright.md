---
titulo: Playwright
resumen: Herramienta de automatización del navegador para pruebas de extremo a extremo en Chromium, Firefox y WebKit.
categoria: herramienta
tags: [tests]
alias: []
relacionados: [vitest]
alternativas: []
web: https://playwright.dev
npm: playwright
fuentes: [https://playwright.dev/docs/intro]
---

## Qué es

Playwright controla navegadores reales (Chromium, Firefox y WebKit) desde código. Abre páginas, pulsa, escribe y comprueba resultados como lo haría una persona.

## Para qué sirve

Prueba la aplicación de extremo a extremo: que una página carga, que un enlace navega, que el interruptor de tema cambia de verdad. Aquí es la vía prevista para pruebas de UI y de accesibilidad en el navegador.

## Cuándo usarlo

Cuando quieres verificar flujos reales en un navegador de verdad, más allá de las unidades de Vitest.

## Cuándo no

Es más lento y frágil que una prueba unitaria: no conviene usarlo para lógica que se comprueba mejor de forma aislada.

## Alternativas

Cypress y Selenium cubren la automatización del navegador con otros modelos; aquí Playwright destaca por su soporte multi-navegador y su velocidad.

## Ejemplo

```ts
import { test, expect } from "@playwright/test";

test("cambia el tema", async ({ page }) => {
  await page.goto("/wiki-dev/");
  await page.getByRole("button", { name: /tema/i }).click();
});
```
