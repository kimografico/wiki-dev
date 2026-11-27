---
titulo: "Bamboo"
resumen: "Servidor de integración y despliegue continuo de Atlassian que ejecuta planes de build y release con trazabilidad de planes y resultados."
categoria: despliegue
tags: ["terminal"]
alias: []
relacionados: ["bitbucket", "github-actions", "integracion-continua", "entrega-continua"]
fuentes: ["https://www.atlassian.com/software/bamboo"]
autoenlace: true
alternativas: ["github-actions","gitlab"]
web: "https://www.atlassian.com/software/bamboo"
---
## Qué es

Bamboo es el servidor de integración y despliegue continuo de Atlassian. Su unidad de trabajo es el **plan**: una sucesión de etapas con trabajos y tareas que compilan, ejecutan pruebas y publican artefactos. No es un sistema de control de versiones ni un gestor de incidencias; se sitúa después del commit y antes del despliegue. Se integra con Bitbucket para detectar cambios y con Jira para asociar cada ejecución con el trabajo que la originó.

## Para qué sirve

Automatiza la cadena que nadie quiere repetir a mano: instalar dependencias, comprobar tipos, pasar lint y formato, construir el sitio y subir el resultado. En un equipo con varios repositorios, un plan centralizado permite ver en un mismo sitio qué rama rompió los tests y qué versión del artefacto salió. Bamboo también encadena planes: el de validación puede desencadenar el de publicación solo cuando todo ha pasado.

## Cuándo usarla

- El equipo ya trabaja con Jira y Bitbucket y quiere que CI comparta ese contexto.
- Necesitas planes con etapas, variables de entorno y artefactos compartidos entre trabajos.
- La organización gestiona su propio servidor de CI y quiere controlar dónde se ejecutan los builds.

## Cuándo no

Para un proyecto pequeño alojado en GitHub, una acción de GitHub Actions cubre lo mismo con menos configuración y sin mantener un servidor. Tampoco merece la pena montar Bamboo solo para ejecutar dos comandos: automatizar antes de tiempo añade una pieza que hay que actualizar.

## Alternativas

| Herramienta | Cuándo conviene |
| --- | --- |
| GitHub Actions | El código está en GitHub y los flujos se definen como archivos del repositorio. |
| GitLab | Quieres repositorio, revisiones y CI en una sola plataforma. |
| Bamboo | El ecosistema Atlassian ya existe y necesitas sus integraciones y planes. |

Elegir Bamboo suele ser una decisión de ecosistema, no una comparación de sintaxis de configuración.

## Ejemplo

Estas son las tareas que un trabajo de etapa podría ejecutar tras el checkout:

```bash
npm ci
npm run check
npm run lint
npm run format:check
npm run validate
npm run build
```

Cada línea corresponde a una tarea de script. Si una falla, la etapa se marca como fallida y el plan no publica el artefacto. La salida de `npm run build` queda disponible para el siguiente trabajo.

## Matices

Bamboo no sustituye a Bitbucket: uno guarda el código y el otro ejecuta el plan. Tampoco es lo mismo que integración continua en abstracto; es una implementación concreta de esa práctica, con planes y resultados propios.
