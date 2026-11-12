export interface ScrambleExample {
  readonly label: string;
  readonly text: string;
  readonly speed: number;
  readonly characters?: string;
  readonly color: string;
  readonly border: string;
  readonly glow: string;
}

export const SCRAMBLE_EXAMPLES: readonly ScrambleExample[] = [
  {
    label: 'Velocidad rápida · 0.5s',
    text: 'ACCESO CONCEDIDO',
    speed: 0.5,
    characters: '01',
    color: 'text-cyan-300',
    border: 'border-cyan-400/20',
    glow: 'shadow-[0_0_35px_-12px_rgba(34,211,238,0.45)]',
  },
  {
    label: 'Velocidad media · 1.1s',
    text: 'SISTEMA COMPROMETIDO',
    speed: 1.1,
    color: 'text-emerald-300',
    border: 'border-emerald-400/20',
    glow: 'shadow-[0_0_35px_-12px_rgba(52,211,153,0.45)]',
  },
  {
    label: 'Velocidad lenta · 2s',
    text: 'RASTRO ELIMINADO',
    speed: 2,
    characters: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
    color: 'text-fuchsia-300',
    border: 'border-fuchsia-400/20',
    glow: 'shadow-[0_0_35px_-12px_rgba(232,121,249,0.45)]',
  },
];
