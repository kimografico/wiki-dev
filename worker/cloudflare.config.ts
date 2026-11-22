import { bindings, defineConfig } from "cf/config";
import * as entrypoint from "./src/index.ts" with { type: "cf-worker" };

export default defineConfig({
	worker: {
		name: "wiki-telegram-webhook",
		compatibilityDate: "2026-11-17",
		entrypoint,
		// Workers Logs: los console.error del webhook se pueden consultar
		// (cf observability tail) sin un sistema de logging propio.
		observability: { enabled: true, headSamplingRate: 1 },
		env: {
			// No sensibles: forman parte de la configuración del proyecto.
			GITHUB_REPO: bindings.text("kimografico/wiki-dev"),
			TELEGRAM_ALLOWED_USER_ID: bindings.text("123347601"),
			// Sensibles: se cargan con `cf deploy --secrets-file` (nunca en el repo).
			GITHUB_TOKEN: bindings.secret(),
			TELEGRAM_BOT_TOKEN: bindings.secret(),
			TELEGRAM_SECRET: bindings.secret(),
		},
	},
});
