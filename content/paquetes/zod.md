---
fecha: 2026-10-13
titulo: Zod
resumen: Librería de validación y definición de esquemas que comprueba datos en tiempo de ejecución y deduce sus tipos.
categoria: datos-api
tags: [frontend, backend]
alias: []
relacionados: [schema-first, typescript, frontmatter, content-collection]
alternativas: []
web: https://zod.dev
npm: zod
fuentes: [https://zod.dev/]
---

## Qué es

Zod permite describir la forma de unos datos con un esquema y comprobarlos mientras el programa se ejecuta. A partir de ese mismo esquema, TypeScript deduce el tipo estático, así que una sola definición sirve para validar y para tipar. Conviene distinguirlo de TypeScript: los tipos existen solo durante la compilación y desaparecen al ejecutar; Zod trabaja con valores reales que vienen de un archivo, una petición o un formulario.

## Para qué sirve

En esta wiki valida el frontmatter de cada entrada: campos obligatorios, categorías permitidas, etiquetas del catálogo y longitud máxima del resumen. Si una entrada tiene un valor fuera del catálogo, el validador lo detecta antes de que el build publique una página rota. Fuera de aquí, sirve para comprobar el cuerpo de una petición o la respuesta de una API antes de confiar en ella.

## Cuándo usarlo

Cuando los datos entran desde fuera del programa y no basta con declarar un tipo. Encaja en formularios, respuestas de API, variables de entorno y archivos de contenido. Conviene validar en la frontera del sistema: una sola comprobación al entrar evita defensas repetidas en cada función.

## Cuándo no

Si el dato ya fue validado y además se mueve dentro de un mismo flujo controlado, volver a analizarlo en cada paso es trabajo redundante. Tampoco conviene usarlo para describir estructuras internas que nunca cruzan una frontera: ahí los tipos de TypeScript bastan.

## Matices

### Zod frente a los tipos de TypeScript

Un tipo describe qué forma espera el compilador; un esquema describe qué contiene realmente un valor en este momento. Por eso `z.infer` es el puente entre ambos mundos: se define el esquema una vez y se obtiene el tipo sin duplicarlo. El patrón se llama Schema-first: la forma de los datos se declara primero y el resto del código se apoya en ella.

## Ejemplo

```ts
import { z } from "zod";

const categoria = z.enum(["framework", "estilos"]);

categoria.parse("framework"); // devuelve "framework"
categoria.safeParse("moda").success; // false, sin lanzar error

type Categoria = z.infer<typeof categoria>;

const entrada = z.object({
  titulo: z.string().min(1),
  resumen: z.string().max(200),
  categoria,
});

entrada.parse({ titulo: "Zod", resumen: "Validación", categoria: "framework" });
```

## Esquemas de contenido

Los esquemas de las colecciones se construyen sobre una base común y se exportan desde un único módulo. El validador los aplica sin importar `astro:content`, de modo que `npm run validate` detecta un frontmatter inválido antes de que falle el build. La comprobación de secciones obligatorias es aparte: Zod revisa datos, no prosa.
