---
titulo: "Ciberseguridad"
resumen: "Disciplina que protege sistemas, datos y usuarios frente a accesos, modificación o interrupción no autorizados."
categoria: concepto
tags: ["seguridad"]
alias: []
relacionados: [vulnerabilidad, autenticacion, secreto, token, xss]
fuentes: []
autoenlace: true
---
## Definición

La ciberseguridad es la disciplina que protege sistemas, datos y usuarios frente a accesos, modificaciones o interrupciones no autorizados. No es un producto único: combina controles sobre el código, las dependencias, las identidades, la red y las personas que operan el sistema. Su objetivo se resume en conservar la confidencialidad, la integridad y la disponibilidad de la información.

## Por qué importa

Convierte riesgos abstractos en decisiones concretas. Un formulario que acepta HTML sin sanear abre un XSS; un token con demasiados permisos amplía el daño de una filtración; una dependencia sin actualizar arrastra una vulnerabilidad conocida. Pensar en estos controles durante el diseño cuesta menos que parchear después de un incidente, y obliga a decidir quién puede hacer qué en cada entorno.

## Ejemplo

```js
// Verificar una firma antes de confiar en un webhook
if (!verificarFirma(cuerpo, cabeceraFirma, secreto)) {
  return new Response("Firma inválida", { status: 401 });
}
```

Así se evita que cualquiera suplante al emisor del evento.

## Se confunde con

Con la seguridad de red exclusivamente: los cortafuegos y TLS son una parte, pero no cubren errores en el código ni permisos mal concedidos. Tampoco es igual a privacidad: la privacidad regula qué datos se recogen y con qué fin; la ciberseguridad protege que no se filtren o alteren.
