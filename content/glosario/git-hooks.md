---
titulo: "Git hooks"
resumen: "Scripts que Git ejecuta automáticamente en puntos concretos, como antes de un commit o antes de un push."
categoria: herramienta
tags: ["terminal"]
alias: []
relacionados: [husky, ci-cd, code-review, repositorio-git]
fuentes: []
autoenlace: true
---
## Definición

Un hook de Git es un script que Git ejecuta automáticamente en un punto concreto del flujo: antes de confirmar (`pre-commit`), al revisar el mensaje (`commit-msg`) o antes de subir (`pre-push`). Se guarda en `.git/hooks`, aunque Husky facilita versionarlo en el repositorio. Si termina con error, Git aborta la operación. Es local: cada persona debe tenerlo instalado.

## Por qué importa

Convierte una recomendación en una comprobación que ocurre siempre. Aquí, pre-commit revisa formato y lint antes del commit y pre-push ejecuta tests con cobertura antes de enviarlos; el error se ve en la máquina de quien lo introdujo, con el diff fresco. La integración continua vuelve a comprobarlo en el servidor, pero llega después.

## Ejemplo

```bash
#!/usr/bin/env sh
npm run format:check
npm run lint
```

Guardado como `.husky/pre-commit`, impide confirmar un archivo mal formateado: basta con que un comando devuelva un código de salida distinto de cero.

## Se confunde con

Con CI/CD: el hook corre en local; la CI corre en el servidor tras el push y es la última red de seguridad. Con Husky: instala y gestiona hooks, pero no es el hook. Con un alias de terminal: espera a que alguien lo escriba; el hook se dispara solo ante la acción de Git.
