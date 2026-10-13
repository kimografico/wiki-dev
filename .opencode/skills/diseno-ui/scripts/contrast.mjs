#!/usr/bin/env node
/**
 * contrast.mjs — calculadora de contraste WCAG 2.x
 *
 * Uso:
 *   node scripts/contrast.mjs "#161b22" "#ffffff"
 *   node scripts/contrast.mjs 161b22 fff
 *
 * Salida: ratio y resultado para texto normal (AA 4.5), texto grande (AA 3),
 * componentes de interfaz (AA 3) y AAA.
 * Sale con código 1 si el par no alcanza AA para texto normal.
 */

function parseHex(entrada) {
  let h = String(entrada ?? '').trim().replace(/^#/, '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) {
    throw new Error(`Color no válido: "${entrada}". Usa hexadecimal (#rrggbb o #rgb).`);
  }
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

function luminancia([r, g, b]) {
  const lineal = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lineal(r) + 0.7152 * lineal(g) + 0.0722 * lineal(b);
}

export function contraste(a, b) {
  const la = luminancia(parseHex(a));
  const lb = luminancia(parseHex(b));
  const [claro, oscuro] = la >= lb ? [la, lb] : [lb, la];
  return (claro + 0.05) / (oscuro + 0.05);
}

const [, , fg, bg] = process.argv;

// Solo se ejecuta como CLI (no al importarlo como módulo)
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('contrast.mjs')) {
  if (!fg || !bg) {
    console.error('Uso: node scripts/contrast.mjs <color-texto> <color-fondo>');
    process.exit(2);
  }
  try {
    const ratio = contraste(fg, bg);
    const marca = (ok) => (ok ? 'cumple' : 'NO cumple');
    console.log(`Contraste ${fg} sobre ${bg}: ${ratio.toFixed(2)}:1`);
    console.log(`  Texto normal  AA  (4.5): ${marca(ratio >= 4.5)}`);
    console.log(`  Texto grande  AA  (3.0): ${marca(ratio >= 3)}   (≥ 24 px, o ≥ 18.66 px en negrita)`);
    console.log(`  Interfaz/iconos AA (3.0): ${marca(ratio >= 3)}`);
    console.log(`  Texto normal  AAA (7.0): ${marca(ratio >= 7)}`);
    process.exit(ratio >= 4.5 ? 0 : 1);
  } catch (e) {
    console.error(e.message);
    process.exit(2);
  }
}
