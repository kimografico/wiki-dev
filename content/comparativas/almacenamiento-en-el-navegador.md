---
fecha: 2026-11-26
titulo: Almacenamiento en el navegador
resumen: Cuándo usar cookies, localStorage o sessionStorage según caducidad, ámbito, seguridad y necesidad de lectura en servidor.
categoria: concepto
tags: [frontend, seguridad]
alias: [cookies frente a storage, web storage frente a cookies]
relacionados: [cookies, localstorage, sessionstorage, autenticacion]
fuentes:
  - "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies"
  - "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
  - "https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage"
  - "https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#local-storage"
autoenlace: true
entidades: [cookies, localstorage, sessionstorage]
contexto: "Tras iniciar sesión en una app con renderizado en servidor, decidir dónde guardar la sesión, el tema visual y el borrador de un formulario."
---

## Contexto

Tres sitios distintos pueden guardar datos en el navegador y los tres se parecen en la API. La decisión cambia de verdad en dos ejes: **quién puede leer el dato** (JavaScript, el servidor o ambos) y **cuándo desaparece**.

## Criterios

| | Cookie | `localStorage` | `sessionStorage` |
|---|---|---|---|
| Caducidad | `Expires` / `Max-Age`; si no se indican, cookie de sesión | Sin caducidad: persiste hasta que se borre | Hasta que se cierra la pestaña |
| Ámbito | Dominio, ruta y `SameSite` | Por origen y protocolo | Por origen **y pestaña** |
| Viaja al servidor | Sí, en cada petición | No | No |
| Legible desde JS | Sí, salvo `HttpOnly` | Sí | Sí |
| Uso típico | Sesión, preferencias que el servidor necesita | Tema, preferencias no sensibles | Borrador de formulario, estado de un flujo |

Las cookies van en cada petición, así que su tamaño importa: suelen estar limitadas a unos 4 KB por cookie, con variaciones según navegador. Web Storage tiene más capacidad, pero nunca llega al servidor por sí solo.

## Cuándo elegir cada una

- **Cookie con `HttpOnly; Secure; SameSite`** para identificadores de sesión. `HttpOnly` evita que JavaScript lea el valor y mitiga el robo del token por XSS; `Secure` restringe a HTTPS; `SameSite` limita el envío entre sitios. No arregla XSS por sí sola: solo reduce lo que un atacante puede sacar.
- **`localStorage`** para preferencias no sensibles que deben sobrevivir a sesiones. Cualquier script de la página puede leerlo y escribirlo, así que no es sitio para tokens ni datos confidenciales. Tampoco es fiable: el usuario puede editarlo.
- **`sessionStorage`** para datos temporales de una pestaña. Recargar conserva el valor y cerrar la pestaña lo borra. Una pestaña independiente empieza vacía, pero si se abre desde la original en el mismo origen copia el valor inicial; a partir de ahí cada una evoluciona por separado (ver `window.opener`).

Si el servidor necesita leer algo en el renderizado (por ejemplo, el tema para evitar un parpadeo), la cookie es la única de las tres que viaja con la petición.

## Ejemplos

```js
// Preferencia visual: no sensible, se conserva entre sesiones.
localStorage.setItem("tema", "oscuro");

// Borrador de un formulario: solo importa en esta pestaña.
sessionStorage.setItem("borrador-pedido", JSON.stringify(formulario));
```

```http
Set-Cookie: sesion=abc123; HttpOnly; Secure; SameSite=Lax; Max-Age=3600
```

Guardar el identificador de sesión en `localStorage` «para que el frontend lo tenga a mano» cambia una cookie protegida por un valor accesible a cualquier XSS. Es el error más frecuente de los tres.
