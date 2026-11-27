---
titulo: "Preprocesador"
resumen: "Herramienta que transforma un texto antes de que otro proceso lo consuma."
categoria: lenguaje
tags: ["frontend"]
alias: []
relacionados: [bundler, build, markdown, css]
fuentes: []
autoenlace: true
---
## Definición

Un preprocesador es una herramienta que transforma un texto antes de que otro proceso lo consuma. La entrada usa una sintaxis más cómoda y la salida es el formato que el siguiente eslabón entiende. No decide qué hacer con el resultado: solo lo prepara. Por eso suele situarse al principio de una cadena de build.

## Por qué importa

Permite escribir de forma más expresiva sin exigir que el navegador o el motor entiendan esa sintaxis. Con Sass se pueden anidar reglas y usar variables antes de generar CSS plano; con remark se enriquece Markdown antes de convertirlo en HTML. El resultado final sigue siendo estándar, así que el visitante no necesita instalar nada.

## Ejemplo

```scss
$primary: #245;

.boton {
  color: $primary;
  &:hover { color: #135; }
}
```

Sale CSS con dos selectores y colores literales; el navegador nunca ve la variable.

## Se confunde con

- **Compilador**: produce código ejecutable; el preprocesador solo reescribe texto en otro texto.
- **Bundler**: agrupa y optimiza módulos; puede ejecutar al preprocesador como paso previo.
- **Plantilla**: genera texto a partir de datos; el preprocesador transforma el texto que ya existe.

Matiz: la salida legible importa. Si el resultado es difícil de inspeccionar, depurar el build final sale más caro que escribir el formato original a mano.
