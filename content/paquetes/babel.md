---
titulo: "Babel"
resumen: "Transpilador que convierte JavaScript moderno y JSX en sintaxis compatible con entornos antiguos mediante presets y plugins."
categoria: herramienta
tags: ["frontend","terminal"]
alias: []
relacionados: [rollup, typescript, build, jsx]
fuentes: ["https://babeljs.io/"]
autoenlace: true
alternativas: [vite]
web: "https://babeljs.io/"
npm: "@babel/core"
---
## Qué es

Babel es un transpilador: lee JavaScript escrito con sintaxis reciente (o JSX) y genera un equivalente que entienden entornos más antiguos. No es un empaquetador ni un comprobador de tipos: no agrupa archivos en un bundle y no verifica tipos. Su trabajo es solo de transformación de sintaxis, y se organiza en *presets* (conjuntos de transformaciones) y *plugins* (transformaciones concretas). El más habitual, `@babel/preset-env`, decide qué transformaciones aplicar a partir de la lista de navegadores objetivo.

## Para qué sirve

Sirve para escribir código moderno y publicarlo donde el navegador o la versión de Node.js aún no lo entiende. Un caso típico: un equipo usa propiedades opcionales y JSX, debe dar soporte a un navegador antiguo y necesita que el build convierta esa sintaxis automáticamente. También puede ejecutarse como paso previo en herramientas que no transpilan por sí mismas.

## Cuándo usarlo

- Cuando el objetivo de publicación incluye navegadores o versiones de Node.js que no entienden tu sintaxis y el build no la transforma ya.
- Cuando necesitas una transformación muy concreta —instrumentación de código, eliminación de `console` en producción— y quieres hacerla en la misma pasada.
- Cuando el proyecto consume una herramienta que delega en Babel y hay configuración heredada que conviene conservar.

## Cuándo no

- Si el build de Vite o Astro ya transpila al nivel que necesitas: añadir Babel suma configuración y tiempo de build sin cambiar el resultado.
- Si solo quieres comprobar tipos: TypeScript hace eso y no reescribe tu JavaScript para navegadores antiguos.
- Si todo tu público usa navegadores actuales y no hay requisito de compatibilidad, la transformación es trabajo innecesario.

## Alternativas

La decisión real no es entre dos transpiladores equivalentes, sino entre configurar Babel y apoyarse en lo que el build ya hace.

| Opción | Qué transforma | Cuándo conviene |
|--------|----------------|-----------------|
| Babel | JavaScript y JSX con plugins muy finos | Compatibilidad amplia o transformaciones propias |
| Vite | Transpilación integrada en el build | El proyecto ya usa Vite y no necesitas plugins de Babel |

Vite transpila con esbuild por defecto y es más rápido, pero ofrece menos control sobre transformaciones individuales. Babel gana cuando necesitas un plugin específico o una lista de destinos muy ajustada; en un proyecto nuevo sin ese requisito, la opción integrada suele bastar.

## Ejemplo

Archivo `babel.config.json`:

```json
{
  "presets": [["@babel/preset-env", { "targets": "> 0.5%, not dead" }]]
}
```

```bash
npx babel src --out-dir dist --config-file ./babel.config.json
```

El resultado sustituye `persona?.nombre ?? "anónimo"` por comprobaciones explícitas solo cuando el destino lo exige.
