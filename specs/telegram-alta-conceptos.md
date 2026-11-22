# Alta de conceptos vía Telegram → Cloudflare Worker → GitHub Actions

Propuesta de flujo ChatOps para dar de alta conceptos en la wiki desde el móvil, sin abrir el ordenador, manteniendo `main` siempre verde y el sitio siempre desplegado.

## Flujo

```
Telegram ──webhook──▶ Cloudflare Worker ──workflow_dispatch──▶ GitHub Actions
   │                      │                                        │
   │                  valida ID +                                LLM genera
   │                  secret_token                                .md → valida
   │                      │                                        │
   ◀──"recibido"──────────┘                                   commit + push a main
                                                                  │
                                                    CI + Deploy (ya existentes)
```

1. Mensaje en Telegram con el concepto a añadir.
2. Worker valida (`secret_token` de Telegram + `from.id` autorizado) y lanza `workflow_dispatch` en GitHub.
3. Workflow de Actions: checkout → LLM genera el archivo según plantilla y schema del repo → `npm run validate/check/format:check/build` → **solo si pasa todo**, commit con PAT y push a `main`.
4. El push dispara automáticamente `ci.yml` y `deploy.yml` (ya existentes).

## Reglas clave

- **El push se hace con un PAT**, nunca con `GITHUB_TOKEN` por defecto: los pushes con el token por defecto **no disparan** otros workflows (no habría CI ni deploy).
- **La validación vive en el repo** (`scripts/validate-content.ts`, `src/lib/content/esquemas.ts`); el prompt se inyecta desde el checkout (plantilla + enums + slugs existentes), no está hardcodeado.
- **Validación antes del push**: si el LLM genera contenido inválido, se reintenta una vez con los errores; si vuelve a fallar, se aborta sin tocar `main`.
- Commit directo a `main` (un solo desarrollador), con validación previa.

---

## Pasos que hace falta dar desde el usuario

### 1. Telegram — bot (2 valores)

| # | Paso | Valor resultante |
|---|------|------------------|
| 1 | Hablar con **@BotFather** → `/newbot` → seguir el asistente (texts abajo) | `TELEGRAM_BOT_TOKEN` (`123456789:ABC...`) |
| 2 | Enviar `/start` al bot y abrir `https://api.telegram.org/bot<TU_TOKEN>/getUpdates` → copiar el `"from":{"id":...}` | `TELEGRAM_USER_ID` |

### 2. GitHub — PAT (1 token)

3. Crear **fine-grained PAT** en `github.com/settings/personal-access-tokens/new`:
   - **Repository access**: solo `kimografico/wiki-dev`.
   - **Permissions**: `Contents: Read and write` + `Actions: Read and write`.
   - Expiración: 90 días recomendado (fechalar la renovación).

### 3. LLM — API key (1 key)

4. Elegir proveedor y obtener `LLM_API_KEY`:
   - **Opción gratis**: Groq o Google Gemini.
   - **Opción de pago ya existente**: OpenAI / Anthropic.
   - La key vive **solo en GitHub Secrets**, nunca en el Worker.

### 4. Entrega de secretos (elegir una)

- **A)** El usuario los crea en GitHub → Settings → Secrets and variables → Actions.
- **B)** El usuario los pega en el chat y el agente los configura vía API/CLI.
- Los secretos del Worker se ponen con `cf secret put` (agente o usuario).

### 5. Decisiones pendientes

- [ ] Proveedor/LLM (Groq / Gemini / OpenAI / Anthropic).
- [ ] Forma de entregar los secretos (A o B).
- [ ] Confirmar commit directo a `main` con validación previa.

---

## Inventario de secretos

### GitHub Secrets (Settings → Secrets and variables → Actions)

| Secret | Valor | Quién lo usa |
|--------|-------|--------------|
| `ADD_CONCEPT_TOKEN` | PAT fine-grained (Contents rw + Actions rw) | Workflow de alta: push a `main` y auto-dispatch |
| `LLM_API_KEY` | Key del proveedor elegido | Workflow de alta: generación de contenido |
| `TELEGRAM_BOT_TOKEN` | Token de BotFather | *(Opcional)* Workflow: mensaje de resultado a Telegram |

### Cloudflare Worker secrets (`cf secret put`)

| Secret | Valor |
|--------|-------|
| `TELEGRAM_BOT_TOKEN` | Token de BotFather |
| `TELEGRAM_ALLOWED_USER_ID` | ID numérico del usuario autorizado |
| `TELEGRAM_SECRET` | Cadena aleatoria (la genera el agente) — `secret_token` del webhook |
| `GITHUB_TOKEN` | Mismo PAT (o PAT aparte con `Actions: write`) |
| `GITHUB_REPO` | `kimografico/wiki-dev` |

---

## Proceso completo de implementación

### Fase 1 — Repo (no necesita secretos)

1. Crear `.github/workflows/add-concept.yml`:
   - Trigger: `workflow_dispatch` con input `prompt`.
   - `concurrency` group para evitar carreras de push.
   - Paso de generación: inyecta `specs/plantillas/*.md` + `CATEGORIAS`/`ETIQUETAS` + slugs existentes → LLM → escribe `content/<coleccion>/<slug>.md`.
   - Validación pre-push: `npm run validate && npm run check && npm run format:check && npm run build`.
   - Commit con autor distinto (`wiki-bot`) y push con `ADD_CONCEPT_TOKEN`.
2. Prueba manual del workflow desde la UI de Actions con un prompt de prueba (requiere `LLM_API_KEY` y `ADD_CONCEPT_TOKEN` ya configurados).

### Fase 2 — Worker en Cloudflare

3. Escribir `worker/` en el repo:
   - Recibe webhook de Telegram, valida `X-Telegram-Bot-Api-Secret-Token` + `from.id`.
   - Lanza `POST /repos/kimografico/wiki-dev/actions/workflows/add-concept.yml/dispatches`.
   - Responde 200 rápido; envía "recibido" al usuario.
4. Desplegar con `cf deploy` y cargar secretos.
5. Registrar webhook de Telegram: `setWebhook` con la URL del Worker y `secret_token`.

### Fase 3 — Extremo a extremo

6. Mensaje real en Telegram → workflow se ejecuta → commit en `main` → CI + deploy automáticos → entrada visible en la wiki.
7. Probar también el caso de error (prompt inválido) para verificar que **no** se toca `main`.

---

## Configuración del bot (@BotFather)

- **Name**: `kimo_wiki_add`
- **About**: `Alta de conceptos en la wiki dev`
- **Commands**:
  ```
  add - Añade un concepto: /add closure con ejemplos en JS y Python
  start - Muestra el estado y el uso del bot
  ```
