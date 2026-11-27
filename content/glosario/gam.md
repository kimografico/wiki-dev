---
titulo: "GAM"
resumen: "Nombre interno de BBVA para un repositorio de configuraciones que consume la aplicación móvil."
categoria: concepto
tags: ["backend", "bbva"]
alias: ["Green Army Men"]
relacionados: [semaas, feature-flag, repositorio-git]
fuentes: []
autoenlace: true
---

## Definición

GAM (*Green Army Men*) es la denominación interna de BBVA para un repositorio de configuraciones que consume la aplicación móvil. No es una librería pública ni el código de la app: es el sitio donde se publican los valores que la app lee. Las notas internas citan las rutas `.../mobilepublicconfig1.1` y `.../mobileprivateconfig1.0`.

## Por qué importa

Reconocer GAM evita tratar un valor leído de configuración como una constante compilada. Cuando un comportamiento no coincide con el código fuente, la configuración consumida es el primer sitio que hay que comprobar. Separa qué está fijo en la app de qué se obtiene en tiempo de ejecución.

## Ejemplo

La app solicita la configuración pública a `.../mobilepublicconfig1.1` y la privada a `.../mobileprivateconfig1.0`. La consulta de ese canal aparece en SEMAAS como `semaasGamDispatcher`.

## Se confunde con

- **Feature flag**: describe variaciones y reglas de acceso. GAM es el repositorio del que se leen valores; un flag puede viajar como configuración, pero no todo valor es un flag.
- **Repositorio Git**: versiona código fuente. GAM es un repositorio de configuraciones: ambos guardan archivos, pero no cumplen la misma función.
- **Configuración remota**: Firebase Remote Config y Azure App Configuration son servicios públicos con ese patrón. GAM solo comparte la idea; no se afirma que use esos productos ni que aplique cambios sin actualizar la app.

## Fuente interna

> Nombre, rutas y dispatcher proceden de documentación privada de BBVA. Las comparaciones públicas son analogías, no equivalencias.
