// ASTRO: un endpoint prerenderizado genera un JSON estático en el build; la
// isla del buscador lo pide bajo demanda en vez de recibir 53 entradas como
// props (RF-08). REACT+VITE: generarías el JSON con un script propio.
import type { APIRoute } from "astro";
import { getTodasLasEntradas, urlEntrada } from "../lib/content/entradas.ts";

export const prerender = true;

export const GET: APIRoute = async () => {
  const entradas = (await getTodasLasEntradas()).map((entrada) => ({
    slug: entrada.slug,
    coleccion: entrada.coleccion,
    titulo: entrada.titulo,
    resumen: entrada.resumen,
    categoria: entrada.categoria,
    tags: entrada.tags,
    alias: entrada.alias,
    url: urlEntrada(entrada.coleccion, entrada.slug, import.meta.env.BASE_URL),
  }));

  return new Response(JSON.stringify(entradas), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
};
