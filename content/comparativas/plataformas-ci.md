---
titulo: "Plataformas de CI"
resumen: "Bamboo, Bitbucket, GitHub y GitLab mezclan alojamiento de código y automatización: la elección sigue al lugar donde ya viven las incidencias."
categoria: despliegue
tags: ["terminal"]
alias: []
relacionados: [bamboo, bitbucket, github, gitlab, github-actions]
fuentes: []
autoenlace: true
entidades: [bamboo, bitbucket, github, gitlab]
contexto: "Elegir dónde ejecutar la automatización cuando el código, las revisiones y los despliegues ya viven en una plataforma concreta."
---

## Contexto

Estos cuatro nombres no describen exactamente lo mismo. **Bamboo** es un servidor de integración y **Entrega continua** de Atlassian; **Bitbucket**, **GitHub** y **GitLab** alojan código y además ejecutan automatización. En la práctica la decisión suele seguir al sitio donde ya están los issues, las pull requests y las personas.

Añadir una plataforma de CI distinta del repositorio es posible, pero obliga a mantener dos sistemas de permisos y dos sitios donde mirar fallos.

## Criterios

| Criterio | Bamboo | Bitbucket | GitHub | GitLab |
|---|---|---|---|---|
| Papel | CI/CD dedicado | Repositorio + pipelines | Repositorio + **GitHub Actions** | Repositorio, CI y registro |
| Configuración | Planes y despliegues | `bitbucket-pipelines.yml` | `.github/workflows/*.yml` | `.gitlab-ci.yml` |
| Integración | Jira y Confluence | Ecosistema Atlassian | Issues y pull requests | Issues, MR y registro |
| Enfoque | Interfaz y agentes | YAML junto al repo | YAML por workflow | Etapas en un archivo |
| Mejor encaje | Organizaciones ya en Atlassian | Equipos Bitbucket | Proyectos ya en GitHub | Ciclo completo en una herramienta |

Un **Pipeline** es la secuencia de pasos; la plataforma es solo dónde se define y se ejecuta.

## Cuándo elegir cada una

Elige **GitHub** si el código, las issues y las revisiones ya están allí: **GitHub Actions** añade automatización sin mudar el repositorio. Elige **GitLab** si quieres una sola herramienta para código, revisiones, CI y artefactos, con menos costes de integración entre sistemas.

Elige **Bitbucket** cuando el equipo vive en Atlassian y quiere que las pipelines estén cerca del código. Elige **Bamboo** cuando la organización ya mantiene sus propios agentes y planes de despliegue y quiere conservarlos.

Evita abrir una segunda plataforma solo porque su interfaz gusta más. También evita mudar el repositorio únicamente para cambiar de CI: la mudanza se paga en historial, permisos y hábitos del equipo.

## Ejemplos

```yaml
# GitLab CI (.gitlab-ci.yml)
check:
  script:
    - npm run check
    - npm run validate
```

```yaml
# GitHub Actions: fragmento de workflow
- name: Comprobar tipos
  run: npm run check
```

Tareas típicas en cualquiera de las cuatro: instalar dependencias, ejecutar comprobaciones, construir y publicar. El contenido de esas tareas es transferible; cambia la sintaxis que las describe.

## Matices

**CI/CD** nombra la práctica; la plataforma es la herramienta. Un mismo repositorio puede usar **GitHub** para código y **Bamboo** para despliegues si existe una razón. Lo que no conviene es duplicar la misma comprobación en dos sitios sin que uno sea la fuente oficial del resultado.
