---
fecha: 2026-10-13
titulo: Tailwind CSS
resumen: "CSS de utilidades para componer estilos en el marcado con tokens consistentes; cuándo usarla frente a Bootstrap o CSS plano."
categoria: estilos
tags: [frontend]
alias: [Tailwind]
relacionados: [css, bootstrap, accesibilidad-web]
alternativas: [bootstrap, css]
web: https://tailwindcss.com
fuentes: [https://tailwindcss.com/docs]
---

## Qué es

Tailwind CSS es un framework de estilos basado en utilidades: en lugar de escribir reglas con nombres propios, se combinan clases pequeñas directamente en el marcado. Cada clase hace una cosa: `flex` activa el layout flexible, `gap-2` separa hijos, `text-sm` ajusta el tamaño. Durante el build se genera el CSS correspondiente a las clases que se usan. No es un sistema de componentes ni sustituye al HTML semántico: al navegador siguen llegando clases y reglas CSS. La duda habitual es si «es CSS»: es una forma de producir CSS, no un lenguaje distinto.

## Para qué sirve

Da un sistema de diseño consistente sin inventar un nombre para cada bloque. Un botón primario se construye con la misma combinación de color, espaciado y tipografía en todas las páginas, y se ajusta en el mismo sitio donde se escribe el elemento. En esta wiki, los colores salen de tokens compartidos, de modo que el modo claro y el oscuro usan la misma estructura de clases.

## Cuándo usarla

Cuando el diseño se apoya en una escala acotada de colores, espaciados y tamaños; cuando hay muchos componentes y conviene no acumular archivos CSS que crecen sin control. Cuanto más definidos estén los tokens, más útil resulta.

## Cuándo no

Si el equipo prefiere clases semánticas y hojas de estilo separadas, la lista de utilidades puede dificultar la lectura. Si los estilos dependen en gran medida de datos dinámicos, muchas clases no se pueden conocer por adelantado y la ventaja se reduce. Tampoco sustituye a las reglas de accesibilidad: el contraste y la estructura del documento se comprueban igual con cualquier enfoque.

## Ejemplo

```html
<a
  href="/wiki"
  class="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] hover:underline"
>
  Abrir wiki
</a>
```

Cada fragmento de `class` corresponde a una declaración: disposición, separación, borde, color de fondo, espaciado interior, tipografía y estado de hover. En esta wiki no hacen falta variantes `dark:` porque los tokens `--color-surface` y `--color-bg` cambian de valor con el tema; los prefijos como `dark:` o `md:` sí sirven cuando la regla depende del tema o del ancho de pantalla.

## Alternativas

| Opción | Relación entre marcado y estilo | Criterio de decisión |
| --- | --- | --- |
| Bootstrap | Clases de componentes ya diseñados | Elegirlo si se quiere un conjunto de componentes listo |
| CSS plano | Reglas separadas con nombres propios | Elegirlo si se valora el cascading clásico y selectores propios |

Tailwind se sitúa en medio: no trae componentes, pero tampoco deja el sistema de diseño sin nombrar.

## Matices: legibilidad y tokens

Las listas largas de clases se controlan extrayendo el patrón repetido a un componente o a una clase reutilizable, no añadiendo más CSS específico. Definir la paleta en variables CSS permite que una utility como `bg-[var(--color-surface)]` signifique lo mismo en los dos temas: la clase no cambia, solo cambia el valor del token.
