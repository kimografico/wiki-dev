---
titulo: "E2E"
resumen: "Prueba de extremo a extremo que recorre un flujo completo del usuario a través de la interfaz real."
categoria: concepto
tags: ["tests","frontend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
alternativas: ["playwright"]
---
## Qué es

Prueba de extremo a extremo que recorre un flujo completo del usuario a través de la interfaz real.

## Para qué sirve

Detecta fallos de integración que ningún test unitario ve: rutas, formularios y navegador.

## Tipos de prueba

Flujo de acceso, búsqueda y apertura de una ficha ejecutado en un navegador real.

## Ejemplo

```js
test('busca una entrada', async ({ page }) => {
  await page.goto('/buscar'); await page.getByLabel('Buscar').fill('closure');
});
```

## Alternativas

Las alternativas directas son `playwright`. Conviene compararlas antes de elegir.
