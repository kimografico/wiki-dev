---
titulo: "PAT"
resumen: "Personal Access Token: credencial de larga duración emitida por una plataforma para actuar en nombre de una cuenta."
categoria: concepto
tags: ["seguridad","terminal"]
alias: ["Personal Access Token"]
relacionados: [token, secreto, autenticacion, jwt, github-actions]
fuentes: [https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens]
autoenlace: true
---
## Definición

Un PAT (Personal Access Token) es una credencial de larga duración emitida por una plataforma para actuar en nombre de una cuenta de usuario. Viaja en una cabecera y la plataforma comprueba los permisos asociados antes de autorizar cada acción. No representa a un servicio autónomo: representa a esa persona.

## Por qué importa

Permite automatizar tareas que una persona haría a mano: clonar repositorios, abrir issues o publicar una página desde un workflow. Su conveniencia es también el riesgo: al copiarlo en un script o en un log, cualquiera que lo lea puede actuar con los mismos permisos. Conviene emitirlo con el ámbito mínimo y guardarlo como secreto, nunca en el repositorio.

## Ejemplo

```bash
curl -H "Authorization: Bearer $PAT" https://api.github.com/user
```

El valor de `$PAT` se inyecta desde un secreto del entorno y no aparece en el código fuente.

## Se confunde con

- **JWT de sesión**: se emite tras autenticarse y suele caducar pronto; el PAT se crea manualmente y dura más.
- **Token de OAuth**: se negocia para un alcance concreto y se administra desde la cuenta.
- **Contraseña**: el PAT se revoca por separado y puede limitarse por permisos.

Matiz: la caducidad depende de la política de cada plataforma. GitHub elimina automáticamente los tokens clásicos que no se han usado en un año y permite configurar una fecha de caducidad; otros sistemas mantienen el token válido hasta que se revoca. Conviene revisar esa configuración al emitirlo y no suponer que un token olvidado seguirá siendo válido.
