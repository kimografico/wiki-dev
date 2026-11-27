---
titulo: "Dependabot"
resumen: "Servicio de GitHub que abre pull requests al actualizar dependencias y avisa de vulnerabilidades conocidas."
categoria: herramienta
tags: ["seguridad","terminal"]
alias: []
relacionados: [github-actions, ci-cd, vulnerabilidad, npm]
fuentes: [https://docs.github.com/en/code-security/dependabot]
autoenlace: true
alternativas: []
---
## Qué es

Dependabot es un servicio integrado en GitHub que vigila las dependencias de un repositorio. Cuando detecta una versión nueva o una vulnerabilidad conocida, abre una *pull request* con el cambio y, si los avisos están activados, genera una alerta. No modifica tu código directamente: propone cambios que alguien debe revisar y fusionar. No es un gestor de paquetes; trabaja sobre el manifiesto y el lockfile que ya tienes.

## Para qué sirve

Evita que la actualización dependa de que alguien recuerde mirarla. Caso concreto: un proyecto con `package.json` y su lockfile versionado recibe un PR automático cuando sale una versión nueva de una librería; el equipo ve el diff, pasan los tests y se fusiona. La otra mitad, las alertas de seguridad, avisa aunque nadie esté pendiente del calendario de publicaciones.

## Cuándo usarlo

- En repositorios con manifiestos versionados donde quieras actualizaciones periódicas sin trabajo manual.
- Cuando además quieres una señal temprana de dependencias vulnerables y ya usas GitHub para el código.
- Cuando el equipo tiene automatizada la validación de PRs y puede fusionar cambios pequeños con confianza.

## Cuándo no

- Si no hay un workflow que ejecute tests y build sobre el PR que abre: un PR sin verificar puede romper la rama. El servicio no corre tus pruebas por sí solo.
- Si tus actualizaciones requieren decisiones de negocio o cambios de código amplios: la cola de PRs se convierte en ruido.
- Si el proyecto vive fuera de GitHub, tendrás que buscar otra herramienta.

## Alternativas

Renovate es la alternativa real del ecosistema: permite más ajustes —agrupar actualizaciones, fijar horarios, reglas por paquete— y funciona también fuera de GitHub. Dependabot gana en integración: no hay que instalar nada y sus pull requests conviven con el resto de flujos de GitHub Actions. El criterio de decisión es si necesitas esa configuración fina o te basta con lo que viene incluido; Renovate todavía no tiene entrada en esta wiki, por lo que no se declara como slug en el frontmatter.

## Matices

En ningún caso sustituye la revisión humana: ambas herramientas proponen, no fusionan. Tampoco sustituye a la vigilancia de vulnerabilidades en producción: avisa sobre dependencias, no sobre código que ya está desplegado.

## Ejemplo

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
```

Con este archivo, cada semana se revisan las dependencias de npm. Para que el PR sea útil, un workflow de GitHub Actions debe ejecutar `npm ci` y los tests antes de darlo por bueno.
