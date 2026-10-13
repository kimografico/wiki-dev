// Isla del interruptor de tema (RF-13). Mínima: solo cambia `data-theme` y
// guarda la elección. La lógica vive en `lib/preferencias/tema.ts` (TS puro).
import { useEffect, useState } from "react";
import {
  alternarTema,
  temaInicial,
  type Tema,
} from "../../lib/preferencias/tema.ts";

export default function InterruptorTema() {
  // El tema real lo fija el script inline del <head> antes de pintar; aquí se
  // sincroniza tras montar para no provocar un desajuste de hidratación.
  const [tema, setTema] = useState<Tema>("light");

  useEffect(() => {
    setTema(temaInicial());
  }, []);

  const esOscuro = tema === "dark";

  return (
    <button
      type="button"
      aria-pressed={esOscuro}
      onClick={() => setTema(alternarTema(tema))}
      className="badge"
      title="Cambiar entre tema claro y oscuro"
    >
      <span>{esOscuro ? "Tema oscuro" : "Tema claro"}</span>
      <span className="visually-hidden">Pulsa para cambiar el tema</span>
    </button>
  );
}
