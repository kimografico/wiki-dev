---
fecha: 2026-11-26
titulo: Correcciones en producción
resumen: "Bugfix, hotfix y pullback: cómo corregir un fallo según el impacto y cómo evitar que reaparezca en la siguiente versión."
categoria: concepto
tags: [terminal]
alias: []
relacionados: [bugfix, hotfix, pullback]
fuentes:
  - "https://nvie.com/posts/a-successful-git-branching-model/"
autoenlace: true
entidades: [bugfix, hotfix, pullback]
contexto: "Decidir por dónde entra una corrección y qué pasos la acompañan cuando el defecto ya afecta a producción."
---

## Contexto

No toda corrección sigue el mismo camino. Un defecto detectado a tiempo entra con el flujo habitual; uno que ya afecta a usuarios exige actuar sobre la versión desplegada. En ese segundo caso, arreglar producción no basta: el cambio debe volver a desarrollo.

## Criterios

| Criterio | Bugfix | Hotfix | Pullback |
| --- | --- | --- | --- |
| Momento | Antes de la próxima release | Con producción ya afectada | Justo después del hotfix |
| Rama de partida | Rama de trabajo normal | Versión desplegada | Versión desplegada hacia desarrollo |
| Ceremonia | PR, CI y revisión completas | Comprobación mínima y despliegue inmediato | Integración del cambio ya revisado |
| Riesgo si se omite | El fallo llega a producción | El fallo sigue visible | La siguiente versión reintroduce el fallo |

## Cuándo elegir cada una

- **Bugfix** cuando el defecto puede esperar al próximo despliegue planificado.
- **Hotfix** cuando el impacto en producción justifica saltarse el ciclo normal.
- **Pullback** siempre después de un hotfix, para que desarrollo y producción no divergan.

No son alternativas excluyentes: un hotfix suele implicar después un pullback, y un bugfix puede incluir una prueba de regresión.

## Ejemplos

- Un error de formato detectado en staging: bugfix en una rama `fix/`, con su PR y su prueba.
- Un fallo de pago en producción: hotfix sobre `main`, despliegue inmediato y pullback a `develop`.
- Un parche que se aplicó solo en producción y se olvidó de integrar: la versión siguiente rompe otra vez; el pullback evita exactamente ese caso.

## Información incompleta

> **Aviso: información incompleta.** «Bugfix» y «pullback» son convenciones de equipo sin definición normativa pública. La práctica de fusionar el hotfix de vuelta a `develop` sí está documentada en git-flow.
