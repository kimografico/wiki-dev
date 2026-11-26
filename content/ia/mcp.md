---
fecha: 2026-11-26
titulo: MCP
resumen: "Model Context Protocol: estándar abierto que permite a aplicaciones de IA conectarse con fuentes de datos, herramientas y flujos de trabajo externos."
categoria: concepto
tags: [backend]
alias: [Model Context Protocol]
relacionados: [agente, llm, api, skill, prompt]
fuentes:
  - "https://modelcontextprotocol.io/docs/getting-started/intro"
  - "https://github.com/modelcontextprotocol/specification"
  - "https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/GOVERNANCE.md"
  - "https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation"
autoenlace: true
alternativas: []
---

## Qué es

MCP (*Model Context Protocol*) es un estándar abierto para conectar aplicaciones de IA con sistemas externos: fuentes de datos, herramientas y flujos de trabajo. La documentación oficial lo compara con un puerto USB-C: en lugar de fabricar un conector distinto para cada aplicación y cada herramienta, ambos hablan un protocolo común.

La especificación, el esquema y la documentación viven en un repositorio público. La gobernanza del proyecto sitúa el protocolo bajo una fundación de Linux, con licencia Apache 2.0 para código y especificación, y CC BY 4.0 para la documentación.

## Para qué sirve

Para que un agente pueda usar herramientas sin una integración a medida para cada una. Un mismo servidor MCP puede servir a distintas aplicaciones de IA, y una aplicación puede combinar varios servidores sin aprender el formato particular de cada servicio.

No es una API de negocio ni un sustituto de la autorización: define cómo se ofrecen y se consumen capacidades. Quién puede llamarlas y con qué permisos sigue siendo una decisión de la aplicación.

## Ejemplo

Un asistente de desarrollo necesita consultar la documentación de una librería. En lugar de que cada cliente implemente su propio conector, un servidor MCP expone esa documentación como capacidad consultable y el cliente la usa siguiendo el protocolo. El modelo decide cuándo consultarla; el protocolo solo dice cómo pedirla y cómo devolverla.

## Limitaciones

- **Superficie de acción:** una herramienta expuesta puede ejecutar acciones reales; conviene acotar permisos y revisar las trazas, igual que con cualquier herramienta de un agente.
- **Específico al tiempo:** la especificación evoluciona, las rutas versionadas de la documentación cambian y la gobernanza se anunció en 2025. Ante un dato concreto, consultar la documentación vigente y su repositorio.
- **No garantiza corrección:** que una herramienta esté bien conectada no implica que la respuesta del modelo sea correcta; el resultado hay que verificarlo.
- **No sustituye al diseño de API:** sigue haciendo falta definir contratos, errores y límites de uso claros.

## Alternativas

- **Integraciones directas:** llamar a cada API con su formato propio es más simple cuando solo hay una herramienta y un consumidor.
- **Llamadas a funciones del proveedor:** muchos modelos permiten declarar funciones sin adoptar un protocolo externo; útil si todo el sistema vive en un mismo proveedor.
- **Plugins propietarios:** pueden ofrecer capacidades parecidas, pero atan la integración a una plataforma concreta.
- **Sin herramientas:** si el modelo solo genera texto, no necesita ningún protocolo de conexión.
