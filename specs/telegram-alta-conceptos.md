# Alta de conceptos vía Telegram

Documentación del flujo ChatOps que permite dar de alta conceptos en la wiki
desde Telegram, sin abrir el ordenador, manteniendo `main` siempre verde y el
sitio siempre desplegado.

## Descripción general

La wiki es un sitio estático (Astro + GitHub Pages) sin backend propio. El
flujo añade un eslabón intermedio —un bot de Telegram y un webhook— para que
una petición en el chat se traduzca en un *commit* validado en el repositorio:

```mermaid
sequenceDiagram
    participant U as Usuario (Telegram)
    participant W as Cloudflare Worker
    participant G as GitHub Actions
    participant L as API de Gemini
    participant R as Repositorio (main)
    participant P as GitHub Pages

    U->>W: Mensaje con el concepto a añadir
    Note over W: Verifica secret_token de Telegram<br/>y que from.id sea el usuario autorizado
    W->>G: workflow_dispatch (prompt, chat_id)
    W-->>U: "Recibido, en proceso"
    G->>L: Genera content/&lt;coleccion&gt;/&lt;slug&gt;.md
    Note over G: validate + check + lint + format + build<br/>solo pasan si la entrada es válida
    G->>R: Commit (wiki-bot) + push con PAT
    R->>R: ci.yml y deploy.yml se disparan solos
    R->>P: Build y publicación
    G-->>U: ✅ Entrada publicada o ❌ fallo con log
```

En resumen: **Telegram → Cloudflare Worker → GitHub Actions → commit en
`main` → CI y deploy automáticos**.

## Componentes

| Componente | Papel | Estado |
|---|---|---|
| Bot `@KimoWiki_Bot` | Recepción de peticiones del usuario | ✅ Creado |
| Cloudflare Worker (`worker/`) | Webhook: valida el mensaje y lanza el workflow | ⏳ Pendiente (Fase 2) |
| Workflow `add-concept.yml` | Genera, valida y publica la entrada | ✅ Activo |
| Script `scripts/add-concept.ts` | Orquesta la generación con Gemini y la validación | ✅ Activo |
| `ci.yml` / `deploy.yml` | Validación y publicación existentes, sin cambios | ✅ Activos |

## Credenciales y configuración

Todo el flujo se sostiene sobre cuatro credenciales. Ninguna vive en el
código: siempre en secrets.

| Credencial | Dónde vive | Para qué | Obtención |
|---|---|---|---|
| `TELEGRAM_BOT_TOKEN` | GitHub Secrets + Worker (pendiente) | Firmar las respuestas del bot a Telegram | @BotFather → `/newbot` |
| `TELEGRAM_USER_ID` | Worker (pendiente) | Autorizar solo al usuario propietario (`from.id`) | `getUpdates` tras enviar `/start` al bot |
| `ADD_CONCEPT_TOKEN` | GitHub Secrets | PAT que permite el push a `main` **y** lanzar el workflow desde el Worker | GitHub → Fine-grained PAT |
| `LLM_API_KEY` | GitHub Secrets | Llamar a la API de Gemini desde el workflow | Google AI Studio → Create API key |

El Worker añadirá un quinto secreto, `TELEGRAM_SECRET`, una cadena aleatoria
generada en su despliegue que Telegram envía en la cabecera
`X-Telegram-Bot-Api-Secret-Token` para demostrar que las notificaciones
llegan realmente de Telegram.

### Por qué un PAT y no el token por defecto

GitHub entrega un `GITHUB_TOKEN` automático a cada workflow, pero los *push*
hechos con ese token **no disparan otros workflows**. Sin PAT, el commit del
concepto subiría a `main` pero `ci.yml` y `deploy.yml` no se ejecutarían: la
wiki no se validaría ni se publicaría. El PAT (permisos `Contents: read
and write` y `Actions: read and write`, limitado al repositorio) evita eso y
a la vez sirve al Worker para lanzar el `workflow_dispatch`.

### Por qué Gemini

API con tier gratuito suficiente para uso ocasional. La key se asocia a un
proyecto de Google Cloud (obligatorio, pero gratuito y sin tarjeta) y se usa
únicamente desde GitHub Secrets: nunca llega al Worker ni al repositorio.

## Proceso de configuración

1. **Creación del bot** — Con @BotFather se creó el bot `kimo_wiki_add`
   (`@KimoWiki_Bot`), con descripción y comandos `/add` y `/start`. De esa
   operación nace el `TELEGRAM_BOT_TOKEN`.
2. **Identificación del usuario** — Tras enviar `/start` al bot, la respuesta
   del endpoint `getUpdates` revela el `from.id` del chat privado: ese número
   es el `TELEGRAM_USER_ID` y la única identidad que el bot atenderá. (La
   primera parte del token del bot, `9250531026`, es el ID del propio bot,
   no el del usuario: un error fácil de cometer.)
3. **Token de GitHub** — PAT *fine-grained* con alcance exclusivo a
   `kimografico/wiki-dev` y permisos `Contents` + `Actions` en modo lectura y
   escritura, con caducidad de 90 días.
4. **Key de Gemini** — Creada en Google AI Studio asociada a un proyecto de
   Google Cloud nuevo (requisito de la plataforma, sin coste).
5. **Secrets en GitHub** — `ADD_CONCEPT_TOKEN`, `LLM_API_KEY` y
   `TELEGRAM_BOT_TOKEN` dados de alta en *Settings → Secrets and variables →
   Actions*.
6. **Workflow y script** — `.github/workflows/add-concept.yml` y
   `scripts/add-concept.ts` se commitaron en `main`; el workflow se puede
   lanzar también a mano desde la pestaña Actions (inputs `prompt` y
   `chat_id`), que es como se probó en primera instancia.
7. **Worker y webhook** — *(pendiente)* desplegar `worker/` con
   `cf secret put` para los cinco secretos y registrar el webhook de Telegram
   con `setWebhook` + `secret_token`.

## Flujo de ejecución

1. El usuario envía el concepto (hoy: *Run workflow* en Actions; mañana:
   mensaje a Telegram).
2. El workflow hace `checkout` con el PAT, instala dependencias y ejecuta
   `scripts/add-concept.ts`.
3. El script inyecta al modelo la plantilla de la colección
   (`specs/plantillas/`), los enums de categorías y etiquetas y la lista de
   slugs existentes — todo leído del propio checkout, de modo que el prompt
   nunca se desincroniza del esquema real de `src/lib/content/esquemas.ts`.
   Gemini responde JSON `{coleccion, slug, contenido}`.
4. Se escribe `content/<coleccion>/<slug>.md` y se valida con
   `scripts/validate-content.ts` (esquema Zod, secciones obligatorias,
   referencias, enlaces, unicidad). Si falla, el modelo reintenta una vez
   alimentado con los errores; si vuelve a fallar, el job aborta **sin
   tocar `main`**. Nunca se sobrescribe una entrada existente.
5. Solo si la validación pasa: formato, tipos, lint, build, commit con autor
   `wiki-bot` y push con el PAT (con `git pull --rebase` previo y grupo de
   `concurrency` para evitar carreras).
6. El push dispara `ci.yml` y `deploy.yml` de siempre, que validan y
   publican. El workflow notifica el resultado a Telegram (✅/❌ con enlace
   al log) si tiene `chat_id`.

## Notas operativas

- **Caducidades**: el PAT caduca a los 90 días (renovarlo y sobrescribir
  `ADD_CONCEPT_TOKEN`); el token OAuth de Cloudflare CLI caducó el
  16/11/2026 y hay que renovarlo con `cf auth login` antes de desplegar el
  Worker.
- **Rotación**: si un secreto se filtra, se regenera el valor y se
  sobrescribe el secret en GitHub o en el Worker; los secrets no se pueden
  leer desde la UI, solo ver si existen.
- **Cuota**: el tier gratuito de Gemini y el uso puntual del bot no
  representan coste; el workflow solo se lanza por petición.
- **Disparo manual**: cualquier ejecución de `add-concept.yml` desde la UI
  es válida para pruebas; sin `chat_id` se omite la notificación.

## Estado

- **Fase 1 (completa)** — workflow + script + tests (cobertura ≥ 90%) en
  `main`, testeable por *workflow_dispatch*.
- **Fase 2 (pendiente)** — Worker en Cloudflare, secretos del mismo y
  registro del webhook de Telegram.
- **Pendiente menor** — test de coherencia entre el módulo
  `src/lib/preferencias/aprendidas.ts` y su copia inline en
  `BaseLayout.astro`, mencionado en los comentarios de dicho módulo.
