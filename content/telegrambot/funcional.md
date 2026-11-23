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

## Qué ocurre después

1. El bot confirma que ha recibido la solicitud y que ha podido iniciar el
   proceso.
2. El sistema redacta y revisa la entrada antes de incorporarla. El proceso
   suele tardar unos minutos.
3. Si se completa correctamente, recibirás un mensaje con el enlace a la entrada.
   Si no se puede generar o validar, recibirás un aviso.

## Quién puede usarlo

Por seguridad, el bot solo procesa mensajes de la cuenta autorizada para este
proyecto. Los mensajes de otras cuentas se ignoran.
