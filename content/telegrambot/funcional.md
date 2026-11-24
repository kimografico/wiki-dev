---
titulo: TelegramBot
resumen: >-
  El bot permite proponer una nueva entrada a la wiki desde un chat, sin tener
  que editar archivos ni conocer cómo está construido el sitio.
apartado: funcional
---

## Qué puedes pedirle

Puedes enviar el concepto que quieres incorporar y añadir detalles sobre lo que
te gustaría ver en la explicación. Por ejemplo, puedes pedir una definición de
_closure_ con ejemplos en JavaScript y Python.

El bot se ocupa de preparar una propuesta con la estructura de la wiki. No es un
asistente de preguntas y respuestas: su función actual es ayudar a crear entradas
nuevas.

## Cómo iniciar una solicitud

1. Envía `/start` al bot para recibir las instrucciones.
2. Escribe `/add` seguido del concepto y, si quieres, de los detalles que debe
   incluir.

```text
/add closure con ejemplos en JavaScript y Python
```

También puedes enviar el concepto sin `/add`. No hace falta que indiques la
colección o la categoría: se proponen automáticamente según el contenido.

## El recorrido de una solicitud

```mermaid
flowchart LR
  U["Envías un mensaje<br/>al bot de Telegram"] --> A["Si estás autorizado,<br/>la IA redacta la entrada"]
  A --> V{"¿Cumple las reglas<br/>de la wiki?"}
  V -->|" Sí "| CI["CI/CD: comprueba,<br/>hace commit y despliega"]
  CI --> OK["Recibes el enlace<br/>en Telegram"]
  V -->|" No "| KO["Recibes un aviso<br/>en Telegram"]

  classDef telegram fill:#26A5E4,stroke:#0088cc,stroke-width:2px,color:#ffffff
  class U,OK,KO telegram

  linkStyle 2 stroke:#16a34a,stroke-width:2.5px,color:#16a34a
  linkStyle 4 stroke:#dc2626,stroke-width:2.5px,color:#dc2626
```

El bot no escribe la entrada directamente: se apoya en un modelo de lenguaje
para redactarla y en el sistema de integración y despliegue (CI/CD) del
repositorio para comprobarla y publicarla.

## Qué ocurre después

1. El bot confirma que ha recibido la solicitud y que ha podido iniciar el
   proceso.
2. El sistema redacta la entrada y la revisa contra las reglas de la wiki. Si
   algo no encaja, lo intenta de nuevo; el proceso suele tardar unos minutos.
3. Si se completa correctamente, recibirás un mensaje con el enlace a la entrada
   y el aviso de que la publicación se completa en breve. El sitio se despliega
   poco después del commit, así que el enlace puede tardar un momento en
   responder.
4. Si falla la generación, la validación o el envío del cambio al repositorio,
   recibirás un aviso en el chat. Cuando el fallo ocurre en GitHub Actions, el
   aviso incluye el enlace a la ejecución, indica si se llegó a publicar algo y
   te pide resolver el error e intentarlo de nuevo.

## Quién puede usarlo

Por seguridad, el bot solo procesa mensajes de la cuenta autorizada para este
proyecto. Los mensajes de otras cuentas se ignoran.
