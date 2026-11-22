import { env } from "cloudflare:workers";
import { SELF } from "cloudflare:test";
import { afterEach, expect, it, vi } from "vite-plus/test";

const URL_WEBHOOK = "https://example.com/webhook";

interface Llamada {
	url: string;
	body: string;
	autorizacion: string | null;
	userAgent: string | null;
}

/** Actualización de Telegram con un mensaje de texto del usuario indicado. */
function actualizacion(desde: string, texto: string) {
	return {
		message: {
			chat: { id: 4242 },
			from: { id: Number(desde) },
			text: texto,
		},
	};
}

function post(texto: string | object, cabeceras: Record<string, string> = {}) {
	return new Request(URL_WEBHOOK, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			"X-Telegram-Bot-Api-Secret-Token": env.TELEGRAM_SECRET,
			...cabeceras,
		},
		body: JSON.stringify(texto),
	});
}

/** Sustituye fetch por un doble que registra cada llamada y contesta. */
function dobleFetch(estadoGitHub = 204) {
	const llamadas: Llamada[] = [];
	const fn = vi.fn((entrada: string | URL | Request, init?: RequestInit) => {
		const url =
			typeof entrada === "string" ? entrada : "url" in entrada ? entrada.url : entrada.href;
		llamadas.push({
			url,
			body: typeof init?.body === "string" ? init.body : "",
			autorizacion: new Headers(init?.headers).get("authorization"),
			userAgent: new Headers(init?.headers).get("user-agent"),
		});
		if (url.includes("api.github.com")) {
			return Promise.resolve(new Response(null, { status: estadoGitHub }));
		}
		return Promise.resolve(new Response("{}", { status: 200 }));
	});
	vi.stubGlobal("fetch", fn);
	return { llamadas, fn };
}

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

it("responde 404 en todo lo que no sea el webhook", async () => {
	const respuesta = await SELF.fetch("https://example.com/");
	expect(respuesta.status).toBe(404);
});

it("rechaza el webhook sin secret_token", async () => {
	const respuesta = await SELF.fetch(
		new Request(URL_WEBHOOK, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(actualizacion(env.TELEGRAM_ALLOWED_USER_ID, "/start")),
		}),
	);
	expect(respuesta.status).toBe(401);
});

it("rechaza el webhook con un secret_token incorrecto", async () => {
	const respuesta = await SELF.fetch(
		post(actualizacion(env.TELEGRAM_ALLOWED_USER_ID, "/start"), {
			"X-Telegram-Bot-Api-Secret-Token": "otro-secreto",
		}),
	);
	expect(respuesta.status).toBe(401);
});

it("rechaza un cuerpo que no es JSON", async () => {
	const respuesta = await SELF.fetch(
		new Request(URL_WEBHOOK, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"X-Telegram-Bot-Api-Secret-Token": env.TELEGRAM_SECRET,
			},
			body: "esto no es json",
		}),
	);
	expect(respuesta.status).toBe(400);
});

it("ignora en silencio a los usuarios no autorizados", async () => {
	const { llamadas, fn } = dobleFetch();
	const respuesta = await SELF.fetch(post(actualizacion("999", "/add closure")));
	expect(respuesta.status).toBe(200);
	expect(fn).not.toHaveBeenCalled();
	expect(llamadas).toHaveLength(0);
});

it("contesta a /start con las instrucciones de uso", async () => {
	const { llamadas } = dobleFetch();
	const respuesta = await SELF.fetch(post(actualizacion(env.TELEGRAM_ALLOWED_USER_ID, "/start")));
	expect(respuesta.status).toBe(200);
	expect(llamadas).toHaveLength(1);
	expect(llamadas[0]!.url).toContain("sendMessage");
	const cuerpo = JSON.parse(llamadas[0]!.body) as { chat_id: string; text: string };
	expect(cuerpo.chat_id).toBe("4242");
	expect(cuerpo.text).toContain("/add closure");
});

it("lanza el workflow con el prompt y el chat, y confirma en el chat", async () => {
	const { llamadas } = dobleFetch();
	const respuesta = await SELF.fetch(
		post(actualizacion(env.TELEGRAM_ALLOWED_USER_ID, "/add closure")),
	);
	expect(respuesta.status).toBe(200);
	expect(llamadas).toHaveLength(2);

	const despacho = llamadas[0]!;
	expect(despacho.url).toContain(
		`/repos/${env.GITHUB_REPO}/actions/workflows/add-concept.yml/dispatches`,
	);
	expect(despacho.autorizacion).toContain("Bearer ");
	// Sin User-Agent, GitHub responde 403 (workerd no envía uno solo).
	expect(despacho.userAgent).toBe("wiki-telegram-webhook");
	const cuerpoDespacho = JSON.parse(despacho.body) as {
		ref: string;
		inputs: { prompt: string; chat_id: string };
	};
	expect(cuerpoDespacho.ref).toBe("main");
	expect(cuerpoDespacho.inputs).toEqual({ prompt: "closure", chat_id: "4242" });

	const aviso = llamadas[1]!;
	expect(aviso.url).toContain("sendMessage");
	const cuerpoAviso = JSON.parse(aviso.body) as { text: string };
	expect(cuerpoAviso.text).toContain("Recibido");
});

it("avisa en el chat si GitHub rechaza el lanzamiento", async () => {
	const { llamadas } = dobleFetch(401);

	const respuesta = await SELF.fetch(post(actualizacion(env.TELEGRAM_ALLOWED_USER_ID, "closure")));

	expect(respuesta.status).toBe(200);
	expect(llamadas).toHaveLength(2);
	const aviso = llamadas[1]!;
	expect(aviso.url).toContain("sendMessage");
	const cuerpoAviso = JSON.parse(aviso.body) as { text: string };
	expect(cuerpoAviso.text).toContain("No se pudo lanzar");
});
