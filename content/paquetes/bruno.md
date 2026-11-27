---
titulo: "Bruno"
resumen: "Cliente de API basado en archivos de texto que guarda las peticiones en el repositorio y las versiona con Git."
categoria: herramienta
tags: ["backend","terminal"]
alias: []
relacionados: [postman, bruno-frente-a-postman, api, git]
fuentes: [https://docs.usebruno.com/]
autoenlace: true
alternativas: ["postman"]
---
## Qué es

Bruno es un cliente de API que guarda cada petición en un archivo de texto (`.bru`) dentro del repositorio. No depende de un espacio de trabajo en la nube ni de una cuenta compartida: la colección son archivos que se versionan como cualquier otro código. Incluye variables de entorno, scripts de petición y una respuesta de ejemplo, pero su unidad es el archivo, no una base de datos alojada.

## Para qué sirve

Documentar y probar una API junto al código que la implementa. Caso concreto: un endpoint `GET /pedidos` con su URL base, sus cabeceras y un ejemplo de respuesta; al cambiar el contrato, el diff de la *pull request* muestra qué petición cambió y quién la tocó. También sirve para que una persona nueva ejecute las llamadas sin pedir acceso a un espacio de trabajo ajeno.

## Cuándo usarlo

- Cuando quieres que las peticiones viajen en el repositorio y se revisen en pull requests.
- Cuando el equipo trabaja sin conexión o no quiere depositar contratos de API en un servicio externo.
- Cuando prefieres editar un archivo de texto con tu editor antes que una interfaz gráfica.

## Cuándo no

- Si el equipo necesita colaboración en tiempo real, permisos finos y entornos compartidos: ahí Postman va más directo.
- Si solo haces una llamada puntual y no vas a volver a usarla: cualquier comando o el propio navegador basta.
- Si tus flujos dependen de una nube corporativa con gobernanza ya definida, añadir otro cliente crea dos fuentes de verdad.

## Alternativas

| Criterio | Bruno | Postman |
|----------|-------|---------|
| Dónde viven las peticiones | Archivos `.bru` versionados | Espacio de trabajo en la nube |
| Revisión de cambios | `git diff` normal | Historial de la plataforma |
| Colaboración | La aporta Git | En tiempo real dentro de la herramienta |

La comparación desarrollada está en Bruno frente a Postman. Como regla práctica: si el valor está en que la colección sea código, elige Bruno; si está en que el equipo comparta y edite a la vez dentro de la herramienta, elige Postman.

## Matices

El formato `.bru` es legible, así que una colección se puede revisar sin abrir la aplicación. Las variables de entorno evitan pegar secretos en los archivos: la URL base y los tokens se definen fuera de la petición. Conviene no guardar credenciales reales en la colección aunque el repositorio sea privado.

## Ejemplo

```text
# pedidos.bru
get {
  url: {{baseUrl}}/pedidos
  headers {
    Accept: application/json
  }
}
```

Los archivos se agrupan en una colección y se ejecutan desde la interfaz de Bruno o desde su interfaz de línea de comandos, útil para integrarlos en una pipeline.
