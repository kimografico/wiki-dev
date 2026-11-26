---
fecha: 2026-11-26
titulo: Pullback
resumen: "Tras un hotfix, acción de traer a la rama de desarrollo los cambios que ya se aplicaron en producción."
categoria: concepto
tags: [terminal]
alias: [traer cambios de producción a desarrollo]
relacionados: [hotfix, bugfix, git-flow, git, despliegue, correcciones-en-produccion]
fuentes:
  - "https://nvie.com/posts/a-successful-git-branching-model/"
autoenlace: true
---

## Definición

Un pullback es el paso que sigue a un hotfix: el parche ya vive en producción, pero aún no está en la rama desde la que salen las siguientes versiones. Traer ese cambio a desarrollo evita que la próxima release reintroduzca el fallo corregido.

Es una operación de integración, no una nueva corrección. Si el hotfix se aplicó en una rama de producción, esa rama se fusiona o se traslada a la rama de desarrollo.

## Por qué importa

Sin este paso, la corrección existe solo en el entorno desplegado. El siguiente despliegue construye desde desarrollo, donde sigue el código antiguo, y el mismo incidente vuelve a aparecer. Es el complemento obligatorio de cualquier hotfix.

## Ejemplo

Se aplica `hotfix/importe` sobre `main` y se despliega. A continuación se fusiona ese cambio en `develop` (pullback). Cuando se publique `1.6`, el importe seguirá calculado bien porque desarrollo ya contiene el arreglo.

## Se confunde con

- **Hotfix**: corrige producción; el pullback solo replica esa corrección en desarrollo.
- **Bugfix**: entra por el flujo normal; el pullback nace de un cambio que ya se saltó ese flujo.
- **Pull request**: es el mecanismo de revisión; el pullback describe el movimiento del cambio entre ramas y suele hacerse mediante un PR.

## Información incompleta

> **Aviso: información incompleta.** El término «pullback» no aparece documentado públicamente como concepto de Git. La práctica que describe sí está documentada en git-flow con los nombres «merge back into develop» o «back-merging»; el uso del nombre aquí es una convención del equipo.
