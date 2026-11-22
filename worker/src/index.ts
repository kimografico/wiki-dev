// Webhook de Telegram que enlaza el bot con el workflow de alta de conceptos.
//
// Flujo: Telegram POSTea cada actualización en /webhook → se comprueba el
// secret_token de la cabecera X-Telegram-Bot-Api-Secret-Token y que el remitente
// sea el usuario autorizado → se lanza add-concept.yml por workflow_dispatch con
// el prompt y el chat de notificación → se contesta 200 a Telegram (nunca se
// hace esperar) y se avisa al chat del resultado del envío.
//
// Los secretos llegan como bindings de cloudflare.config.ts (bindings.secret());
// el resto de configuración, igualmente desde el config, no se duplica aquí.
import { env } from "cloudflare:workers";

const API_TELEGRAM = "https://api.telegram.org";
const API_GITHUB = "https://api.github.com";
const WORKFLOW = "add-concept.yml";

const AYUDA =
	"Escribe el concepto que quieras añadir a la wiki, por ejemplo:\n" +
	"/add closure\n" +
	"En unos minutos recibirás la confirmación de si se ha publicado.";

interface Mensaje {
	chat: { id: number };
	from?: { id: number };
	text?: string;
}

interface Actualizacion {
	message?: Mensaje;
}

/** Comparación en tiempo constante del secret_token de Telegram. */
function coincide(a: string, b: string): boolean {
	const x = new TextEncoder().encode(a);
	const y = new TextEncoder().encode(b);
	if (x.length !== y.length) return false;
	let diferencia = 0;
	for (let i = 0; i < x.length; i++) diferencia |= x[i]! ^ y[i]!;
	return diferencia === 0;
}

/** Aviso al chat; un fallo de Telegram no debe tumbar el webhook. */
async function enviar(chatId: string, texto: string): Promise<void> {
	try {
		await fetch(`${API_TELEGRAM}/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ chat_id: chatId, text: texto }),
		});
	} catch (error) {
		console.error("No se pudo enviar el aviso a Telegram:", error);
	}
}

/** Lanza el workflow de alta; devuelve false si GitHub no lo acepta. */
async function lanzarWorkflow(concepto: string, chatId: string): Promise<boolean> {
	try {
		const respuesta = await fetch(
			`${API_GITHUB}/repos/${env.GITHUB_REPO}/actions/workflows/${WORKFLOW}/dispatches`,
			{
				method: "POST",
				headers: {
					authorization: `Bearer ${env.GITHUB_TOKEN}`,
					accept: "application/vnd.github+json",
					"content-type": "application/json",
					// GitHub rechaza con 403 las peticiones sin User-Agent y
					// workerd no envía una por defecto.
					"user-agent": "wiki-telegram-webhook",
					"x-github-api-version": "2022-11-28",
				},
				body: JSON.stringify({
					ref: "main",
					inputs: { prompt: concepto, chat_id: chatId },
				}),
			},
		);
		if (!respuesta.ok) {
			const detalle = await respuesta.text().catch(() => "");
			console.error(`GitHub respondió ${respuesta.status} al lanzar el workflow: ${detalle}`);
		}
		return respuesta.ok;
	} catch (error) {
		console.error("No se pudo contactar con GitHub:", error);
		return false;
	}
}

export default {
	async fetch(request) {
		if (request.method !== "POST" || new URL(request.url).pathname !== "/webhook") {
			return new Response("No encontrado", { status: 404 });
		}

		const token = request.headers.get("X-Telegram-Bot-Api-Secret-Token") ?? "";
		if (!coincide(token, env.TELEGRAM_SECRET)) {
			return new Response("No autorizado", { status: 401 });
		}

		let actualizacion: Actualizacion;
		try {
			actualizacion = (await request.json()) as Actualizacion;
		} catch {
			return new Response("Petición inválida", { status: 400 });
		}

		// Todo lo que no sea un mensaje de texto del usuario autorizado se
		// ignora en silencio: Telegram espera siempre un 200 y avisar a
		// terceros revelaría que el bot está vivo.
		const mensaje = actualizacion.message;
		if (!mensaje?.text || !mensaje.from) return new Response(null, { status: 200 });
		if (String(mensaje.from.id) !== env.TELEGRAM_ALLOWED_USER_ID) {
			return new Response(null, { status: 200 });
		}

		const chatId = String(mensaje.chat.id);
		const texto = mensaje.text.trim();
		if (texto === "/start" || texto.startsWith("/start ")) {
			await enviar(chatId, AYUDA);
			return new Response(null, { status: 200 });
		}

		// El concepto es todo el texto; "/add" es un prefijo opcional.
		const concepto = texto.replace(/^\/add(?:@\w+)?\s*/, "").trim();
		if (!concepto) {
			await enviar(chatId, "Falta el concepto: escribe /add <concepto>.");
			return new Response(null, { status: 200 });
		}

		if (await lanzarWorkflow(concepto, chatId)) {
			await enviar(chatId, "Recibido. En unos minutos recibirás la confirmación.");
		} else {
			await enviar(chatId, "No se pudo lanzar el alta. Revisa los logs de GitHub Actions.");
		}
		return new Response(null, { status: 200 });
	},
} satisfies ExportedHandler;
