---
titulo: "GitLab"
resumen: "Repositorios Git, pipelines de CI/CD y gestión de proyectos en una sola plataforma; criterios para elegirla frente a GitHub o Bamboo."
categoria: despliegue
tags: ["terminal"]
alias: []
relacionados: ["github", "bamboo", "github-actions"]
fuentes: ["https://docs.gitlab.com/ee/ci/"]
autoenlace: true
alternativas: ["github", "bamboo"]
web: "https://gitlab.com/"
---

## Qué es

GitLab es una plataforma que reúne repositorios Git, incidencias, revisiones de código y pipelines de integración y entrega continuas. El pipeline se describe en un archivo `.gitlab-ci.yml` en la raíz del repositorio: cada trabajo indica la imagen donde corre, la etapa a la que pertenece y los comandos que ejecuta. Conviene separar lo que suele confundirse: Git es el sistema de control de versiones, GitLab es el servicio que aloja los repositorios y los *runners* son los agentes que ejecutan los trabajos. Integrar todo en un producto no significa que GitLab sustituya a las herramientas del proyecto: el pipeline sigue llamando a npm, al linter o al compilador que corresponda.

## Para qué sirve

Un caso concreto: al abrir una rama con una corrección, el pipeline instala dependencias, ejecuta `check`, `lint`, `format:check`, `validate` y `test:coverage`, y publica el resultado en la propia merge request. Quien revisa el código ve en el mismo sitio si los tests pasan. El mismo mecanismo permite construir una imagen de contenedor, guardar artefactos o desplegar una URL de previsualización antes de fusionar.

## Cuándo usarla

Cuando se quiere cubrir desde el repositorio hasta el despliegue con una sola configuración y un modelo de permisos compartido; cuando la organización necesita alojamiento propio o trazabilidad de los cambios; o cuando los pipelines ya se escriben en YAML y conviene que incidencias, revisiones y ejecuciones convivan. 

## Cuándo no

Si el equipo ya tiene incidencias, revisiones y automatizaciones en GitHub, migrar solo por cambiar de interfaz añade coste sin resolver una duda técnica. Si únicamente se necesita ejecutar pipelines, una herramienta de CI independiente basta y evita duplicar la gestión de repositorios. Tampoco aporta nada a un proyecto que todavía no tiene integración continua: primero conviene tener comandos locales repetibles.

## Alternativas

| Opción | Qué cubre | Criterio de decisión |
| --- | --- | --- |
| GitHub | Repositorio, incidencias y automatizaciones | Elegirla si el equipo ya trabaja allí y quiere un solo sitio |
| Bamboo | Servidor de CI/CD | Elegirlo si solo se quiere automatizar pipelines y el código vive en otra plataforma |

GitLab compite en la primera columna; su diferencia está en incluir el pipeline dentro del mismo producto. Bamboo cubre solo la automatización.

## Ejemplo

```yaml
# .gitlab-ci.yml
stages: [verificar, test]

comprobar:
  stage: verificar
  image: node
  script:
    - npm ci
    - npm run check
    - npm run lint

tests:
  stage: test
  image: node
  script:
    - npm ci
    - npm run test:coverage
```

Cada trabajo corre en un *runner* y su resultado queda asociado al commit; si falla, la merge request lo marca como bloqueante.

## Matices

El pipeline es código: un cambio en él se revisa como cualquier otro y queda en el historial. Conviene llamar a los scripts del proyecto en lugar de repetir comandos en el YAML.
