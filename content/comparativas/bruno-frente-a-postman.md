---
titulo: "Bruno frente a Postman"
resumen: "Bruno guarda las peticiones como archivos versionables; Postman centraliza colecciones y entornos en un espacio de trabajo compartido."
categoria: herramienta
tags: ["backend", "terminal"]
alias: []
relacionados: ["bruno", "postman", "api", "git", "ci-cd"]
fuentes: []
autoenlace: true
entidades: ["bruno", "postman"]
contexto: "Dos clientes de API con filosofías distintas sobre dónde vive la colección de peticiones y quién puede cambiarla."
---

## Contexto

**Bruno** y **Postman** hacen lo mismo a primera vista: enviar peticiones y mostrar respuestas. La decisión real es dónde vive la colección y quién puede cambiarla. Bruno guarda cada petición como un archivo de texto en el repositorio; Postman organiza colecciones y entornos en un espacio de trabajo, con opciones de importación y exportación.

Si la **API** es el contrato que el equipo revisa en pull requests, esa diferencia pesa más que la interfaz.

## Criterios

| Criterio | Bruno | Postman |
|---|---|---|
| Fuente de verdad | Archivos `.bru` en **Git** | Colección en el espacio de trabajo |
| Revisión | Diff y **Code review** normales | Historial y permisos de la plataforma |
| Variables | Archivos de entorno junto al repositorio | Entornos compartidos en la plataforma |
| Colaboración | Quien ya tiene acceso al repo | Miembros invitados al workspace |
| Arranque | Abrir una carpeta | Entrar en la cuenta y elegir workspace |
| Perfil | Peticiones y scripts ligeros | Colecciones, documentación y monitoring |

## Cuándo elegir cada una

Elige **Bruno** cuando quieres que las peticiones viajen con el código: reproducibles sin conexión, revisables en el mismo PR que cambia el endpoint y fáciles de ejecutar en **CI/CD**. Conviene especialmente si el equipo ya vive en Git y no quiere otra cuenta que mantener.

Elige **Postman** cuando la colaboración no pasa por Git: personas de producto o soporte que solo necesitan enviar llamadas, entornos compartidos y documentación generada a partir de la colección. También cuando usas sus herramientas de monitoring o mocks como parte del flujo.

No tiene sentido migrar una colección grande solo por moda, ni mantener dos copias divergentes. Si necesitas ambos mundos, deja el repositorio como fuente y exporta desde allí.

## Ejemplos

```bru
get {{baseUrl}}/pedidos/{{pedidoId}}
Accept: application/json
```

```bash
newman run pedidos.postman_collection.json -e local.postman_environment.json
```

El primer archivo se revisa como cualquier cambio de código; el segundo comando ejecuta la colección exportada en una pipeline.

## Matices

Ambos pueden importar especificaciones abiertas y exportar colecciones; la diferencia no es capacidad, sino procedencia. Los **Entornos** con secretos no deben guardarse en texto plano en ninguno de los dos: usa variables de la plataforma o secretos del repositorio según el caso.
