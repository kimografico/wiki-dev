---
titulo: "Monolito"
resumen: "Aplicación única que concentra todas las capacidades y se despliega como una sola unidad."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: [microservicio, despliegue, api, ddd]
fuentes: []
autoenlace: true
---
## Definición

Un monolito es una aplicación que concentra sus capacidades en un único despliegue: interfaz, lógica de negocio, acceso a datos y trabajos en segundo plano comparten proceso y base de código. «Único» se refiere a la unidad de despliegue, no a que el código esté desordenado: un monolito puede estar bien modularizado.

## Por qué importa

Al principio reduce coste: un repositorio, un pipeline, una forma de depurar. No hay llamadas de red entre servicios ni contratos que sincronizar, y un cambio se prueba de punta a punta en local. El coste aparece cuando crecen el equipo y el dominio: un despliegue pequeño obliga a publicar todo, y un error en una zona puede afectar al conjunto. Es el punto en que empieza a valorarse partirlo en microservicios.

## Ejemplo

```text
app/
  interfaz/   api/   pedidos/   facturacion/   trabajos/
  → un solo build → un solo despliegue
```

Un cambio en `facturacion` sale con el resto, aunque nadie más haya tocado esos archivos.

## Se confunde con

- **Microservicio**: cada capacidad se despliega por separado y se comunica por red.
- **Monorepo**: organiza varios proyectos en un repositorio; puede contener monolitos o microservicios.
- **Acoplamiento**: es una consecuencia posible, no una definición.

El matiz: el problema no es el tamaño del código, sino que todos los cambios compartan el mismo ciclo de publicación.
