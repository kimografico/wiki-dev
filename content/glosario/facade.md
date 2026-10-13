---
titulo: Facade
resumen: Patrón que ofrece una interfaz simple sobre un conjunto complejo de módulos, ocultando los detalles a quien la usa.
categoria: concepto
tags: []
alias: [fachada]
relacionados: [repository]
terminoEn: Facade
---

## Definición

Un *facade* («fachada») es una capa que presenta una API sencilla delante de un sistema más complicado. Quien la usa pide lo que necesita con nombres de dominio y no conoce cómo se resuelve por dentro.

## Por qué importa

Reduce el acoplamiento: si cambia la forma de obtener los datos, solo se reescribe la fachada. El resto del código sigue llamando a las mismas funciones.

## Ejemplo

```ts
// Los componentes no saben de dónde salen los datos:
const relacionados = await getRelacionados(slug);
```

## Se confunde con

Con el patrón *repository*. El repository encapsula el **acceso a los datos**; el facade es una idea más general: cualquier fachada que simplifica algo complejo. Aquí suelen aparecer juntos.
