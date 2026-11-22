# Guía de secretos — Alta de conceptos vía Telegram

Proceso paso a paso para crear y configurar todos los secretos del flujo
`Telegram → Cloudflare Worker → GitHub Actions`.

> **Valores ya obtenidos** (guardados, no volver a pedir):
>
> | Valor | Estado |
> |-------|--------|
> | `TELEGRAM_BOT_TOKEN` = `••••••••••••••••••••••••••••••••` (retirado del repo, ver nota al final) | ✅ (bot `@KimoWiki_Bot`) |
> | `TELEGRAM_USER_ID` = `1233•••601` | ✅ |
> | Proveedor LLM = **Google Gemini** | ✅ decidido |
>
> ⚠️ **El token real se escribió en este fichero y quedó en el historial de
> git.** Ofuscar el archivo no lo borra de los commits anteriores: el token
> debe considerarse **comprometido**. Ver «Rotación obligatoria» al final.

---

## Resumen: qué crear y dónde

| # | Qué | Dónde | Secreto/resultante |
|---|-----|-------|--------------------|
| 1 | PAT fine-grained de GitHub | github.com | `ADD_CONCEPT_TOKEN` (GitHub) |
| 2 | API key de Gemini | Google AI Studio | `LLM_API_KEY` (GitHub) |
| 3 | Token del bot (ya lo tienes) | — | `TELEGRAM_BOT_TOKEN` (GitHub, opcional + Worker) |
| 4 | Secretos del Worker | `cf secret put` | Worker (5 secretos) |

Los **1 y 2** los creas tú en GitHub (sección A).
Los **4** se cargan en Cloudflare al final de la Fase 2 (sección C).

---

## A. Secretos de GitHub (los creas tú)

### Ubicación

1. Abre `https://github.com/kimografico/wiki-dev/settings/secrets/actions`
   (Settings → Secrets and variables → **Actions** → botón **New repository secret**).
2. Cada secreto: pegas el **Nombre** y el **Valor**, y pulsas **Add secret**.

### A1. `ADD_CONCEPT_TOKEN` — PAT de GitHub

Este token permite al workflow hacer `push` a `main` (con permiso para
disparar CI y deploy) y al Worker lanzar el workflow.

1. Ve a `https://github.com/settings/personal-access-tokens/new`
   (**Fine-grained tokens → Generate new token**).
2. **Token name**: `wiki-add-concept`
3. **Expiration**: `90 days` (apunta la fecha de renovación).
4. **Repository access**: seleccionar **Only select repositories** →
   `kimografico/wiki-dev`.
5. **Permissions → Repository permissions**:
   - `Contents` → **Read and write**
   - `Actions` → **Read and write**
     (`Metadata` se añade solo, es obligatorio e implícito)
6. **Generate token** → copia el valor (`github_pat_...`).
   ⚠️ Solo se muestra una vez.
7. En GitHub → Secrets → **New repository secret**:
   - Name: `ADD_CONCEPT_TOKEN`
   - Value: el PAT pegado.

> **¿Por qué un PAT y no el token por defecto?** Los pushes hechos con el
> `GITHUB_TOKEN` automático **no disparan** otros workflows: sin PAT, el
> commit subiría pero `ci.yml` y `deploy.yml` no se ejecutarían y la wiki
> no se desplegaría.

### A2. `LLM_API_KEY` — API key de Google Gemini

1. Ve a `https://aistudio.google.com/apikey` (inicia sesión con tu cuenta Google).
2. Botón **Create API key** → elige **Create API key in new project** (o un proyecto existente).
3. Copia el valor (`AIza...`).
   - Tier gratuito: suficiente para uso ocasional; sin cargo si no excedes cuota.
4. En GitHub → Secrets → **New repository secret**:
   - Name: `LLM_API_KEY`
   - Value: la key pegada.

### A3. `TELEGRAM_BOT_TOKEN` (opcional, pero recomendado)

Solo si quieres que el workflow responda a Telegram al terminar
("✅ publicado" / "❌ falló, mira el log"). Si no lo creas, el resultado
se mira en la pestaña Actions.

- Name: `TELEGRAM_BOT_TOKEN`
- Value: el token que te dio BotFather (no lo pegues aquí: pégalo solo en
  GitHub Secrets). Formato: `<id_del_bot>:<clave>` — p. ej. `••••••••:••••…`

### Resultado esperado en GitHub

```
Settings → Secrets and variables → Actions
├── ADD_CONCEPT_TOKEN    ✅
├── LLM_API_KEY          ✅
└── TELEGRAM_BOT_TOKEN   ✅ (opcional)
```

> **Nota**: los secretos de GitHub no se pueden leer después de crearlos
> (solo ver si existen). Si pierdes el PAT o la key, se regenera y se
> sobrescribe el secreto.

---

## B. Secretos del Worker (se cargan en la Fase 2)

No los pongas todavía: se cargan con `cf secret put` cuando el Worker esté
creado. Los 5 serán:

| Secreto | Valor | Origen |
|---------|-------|--------|
| `TELEGRAM_BOT_TOKEN` | `••••••••:••••…` (copiado de BotFather, nunca en claro en el repo) | BotFather |
| `TELEGRAM_ALLOWED_USER_ID` | `1233•••601` | getUpdates |
| `TELEGRAM_SECRET` | cadena aleatoria (la genera el agente) | nuevo |
| `GITHUB_TOKEN` | igual que `ADD_CONCEPT_TOKEN` | GitHub |
| `GITHUB_REPO` | `kimografico/wiki-dev` | fijo |

> El `GITHUB_TOKEN` del Worker puede ser **el mismo PAT** que
> `ADD_CONCEPT_TOKEN` (tiene `Actions: write`, que es lo que necesita para
> lanzar el `workflow_dispatch`). Un solo token para ambos usos.

---

## C. Proceso completo (contexto)

### Fase 1 — Repo (sin secretos)
1. Crear `.github/workflows/add-concept.yml` + script de generación.
2. Inyectar al LLM: plantilla (`specs/plantillas/`), enums
   (`CATEGORIAS`/`ETIQUETAS`) y slugs existentes desde el checkout.
3. Validación pre-push: `npm run validate && npm run check &&
   npm run format:check && npm run build` → solo si pasa, commit y push.
4. Prueba manual del workflow desde Actions (aquí ya necesitas los
   secretos A1 y A2 creados).

### Fase 2 — Worker en Cloudflare
5. Escribir `worker/` y desplegar con `cf deploy`.
6. Cargar los 5 secretos (sección B) con `cf secret put`.
7. Registrar webhook de Telegram con `setWebhook` + `secret_token`.

### Fase 3 — Extremo a extremo
8. Mensaje real en Telegram → workflow → commit en `main` → CI + deploy
   automáticos → entrada visible.
9. Probar caso de error (prompt inválido) → verificar que `main` no se toca.

---

## Checklist antes de empezar la implementación

- [ ] PAT creado con Contents rw + Actions rw y alcance solo `wiki-dev`
- [ ] `ADD_CONCEPT_TOKEN` en GitHub Secrets
- [ ] API key de Gemini creada en AI Studio
- [ ] `LLM_API_KEY` en GitHub Secrets
- [ ] `TELEGRAM_BOT_TOKEN` en GitHub Secrets (opcional)
- [ ] Cloudflare: `cf auth whoami` válido (**expira 2026-11-16** → renovar con `cf auth login` si hace falta)

---

## Rotación obligatoria (hazlo antes de seguir)

El `TELEGRAM_BOT_TOKEN` y el `TELEGRAM_USER_ID` estaban en claro en este
fichero y se commitearon (`5646319`). Ofuscar el archivo **no** los elimina
del historial de git. Proceso:

1. **Revocar el token actual**: en Telegram, habla con `@BotFather` →
   `/revoke` → elige `@KimoWiki_Bot`. El token viejo deja de funcionar al
   instante.
2. **Obtener el nuevo**: `/mybots` → `@KimoWiki_Bot` → *API Token* →
   *Revoke current token* (o lo que te devuelva `/revoke`). Guárdalo en un
   gestor de contraseñas, **no** en ningún fichero del repo.
3. **Actualizar los sitios donde ya esté cargado** (si llegaste a cargarlo):
   - GitHub → Settings → Secrets and variables → Actions →
     `TELEGRAM_BOT_TOKEN` → *Update*.
   - Worker: `cf secret put TELEGRAM_BOT_TOKEN` (te pedirá el valor nuevo).
4. **Decidir sobre el historial de git**: mientras el commit `5646319`
   exista, el token viejo (aunque revocado) y el `TELEGRAM_USER_ID` siguen
   siendo legibles. Opciones:
   - **Mínimo**: con el token revocado ya no hay riesgo real; deja el
     historial como está. El user ID solo sirve para enviarte mensajes y ya
     está en tu propio repo privado/propio.
   - **Limpio**: reescribir el historial
     (`git filter-repo --path specs/telegram-secretos.md --invert-paths`
     o un `rebase interactivo` sobre `5646319`) y hacer `push --force`.
     ⚠️ Solo si nadie más clona/trabaja sobre este repo: rompe los clones
     existentes.
5. **Regla a partir de ahora**: los secretos viven en GitHub Secrets /
   `cf secret put` / gestor de contraseñas. En `specs/` solo placeholders
   (`••••`, `<PEGA_AQUÍ>`).
