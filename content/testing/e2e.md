---
titulo: "E2E"
resumen: "Prueba de extremo a extremo que recorre un flujo completo del usuario a través de la interfaz y el navegador reales."
categoria: concepto
tags: ["tests","frontend"]
alias: []
relacionados: ["playwright", "estrategia-de-testing", "regresion", "cobertura"]
fuentes: []
autoenlace: true
alternativas: []
---

## Qué es

Una prueba E2E (*end to end*, de extremo a extremo) ejecuta un flujo completo desde la interfaz hasta los sistemas de los que depende. En lugar de llamar a una función, abre la aplicación, pulsa, escribe y comprueba lo que ve el usuario. El nombre describe el alcance, no una herramienta concreta.

No es lo mismo que una prueba unitaria: esta última aísla una pieza y controla sus entradas. Tampoco es una prueba de API, que habla directamente con el servidor sin pasar por la interfaz. La E2E comprueba que todas las capas encajan.

## Para qué sirve

Detecta fallos de integración que ningún test aislado ve: una ruta mal escrita, un formulario que no envía, un cambio de tema que no se aplica o un error que solo aparece al navegar con JavaScript en el navegador. Es la comprobación más cercana a la experiencia real.

Conviene reservarla para los flujos críticos —acceso, búsqueda, compra, publicación— porque cada ejecución es más lenta y más sensible a cambios de interfaz que una prueba unitaria.

## Tipos de prueba

- **De interfaz en navegador**: recorre páginas y controles; es la forma habitual de entender una E2E.
- **De flujo con API simulada**: mantiene la interfaz real pero sustituye el backend por respuestas controladas para reproducir estados difíciles.
- **De regresión visual**: compara el aspecto de una pantalla con una referencia guardada.
- **De accesibilidad**: comprueba en el navegador que los controles son alcanzables por teclado y tienen nombre accesible.

## Ejemplo

```ts
import { test, expect } from "@playwright/test";

test("busca una entrada y abre su ficha", async ({ page }) => {
  await page.goto("/buscar");
  await page.getByLabel("Buscar").fill("closure");
  await page.getByRole("link", { name: "Closure" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Closure");
});
```

El test falla tanto si la búsqueda no devuelve resultados como si el enlace no navega: por eso detecta problemas que una prueba de la función de búsqueda no vería.

## Matices

E2E es el **qué** y Playwright es uno de los **cómos**: la herramienta ejecuta el flujo, pero el alcance lo decide la estrategia de testing. Una suite sana combina muchas pruebas unitarias, algunas de integración y unas pocas E2E. Medir la cobertura total de una suite E2E suele ser engañoso: un flujo largo ejecuta mucho código, pero no comprueba cada rama que atraviesa.
