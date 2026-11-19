/**
 * Tehnički crteži kao pozadinski sloj.
 * Ručno izrađena SVG linija, bez brojčanih kota: crteži su ilustrativni
 * i ne predstavljaju projektnu dokumentaciju stvarnih objekata.
 */
import type { CSSProperties, ReactNode } from 'react'

const INK = '#2E302C'

/* ------------------------------------------------------------------ */
/* Omotač: dekorativni sloj, bez interakcije, skriven od čitača ekrana */
/* ------------------------------------------------------------------ */
type LayerProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  opacity?: number
  /** CSS mask, npr. za blijeđenje prema tekstu */
  fade?: string
}

export function DrawingLayer({ children, className = '', style, opacity = 0.06, fade }: LayerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute hidden select-none lg:block ${className}`}
      style={{
        opacity,
        WebkitMaskImage: fade,
        maskImage: fade,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* Zajednički stilovi linija */
const thin = { stroke: INK, strokeWidth: 1, fill: 'none', vectorEffect: 'non-scaling-stroke' as const }
const hair = { ...thin, strokeWidth: 0.6 }
const bold = { ...thin, strokeWidth: 2.2 }
const axis = { ...hair, strokeDasharray: '18 5 3 5' }
const txt = { fill: INK, fontFamily: 'Manrope, sans-serif', fontWeight: 700, letterSpacing: '0.14em' }

function Bubble({ x, y, label, r = 16 }: { x: number; y: number; label: string; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} {...thin} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize={14} {...txt}>
        {label}
      </text>
    </g>
  )
}

/** Determinističan pseudo-slučajni niz (isti crtež pri svakom renderu) */
function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/* ------------------------------------------------------------------ */
/* 1. Pročelje stambene zgrade s osima i oznakama etaža               */
/* ------------------------------------------------------------------ */
export function Elevation({ className = '' }: { className?: string }) {
  const x0 = 120
  const axes = [0, 1, 2, 3, 4, 5].map((i) => x0 + i * 170)
  const ground = 760
  const floorH = 112
  const floors = 5
  const levels = Array.from({ length: floors + 1 }, (_, i) => ground - i * floorH)
  const top = levels[floors]
  const right = axes[axes.length - 1]
  const names = ['Prizemlje', '1. kat', '2. kat', '3. kat', '4. kat', 'Krov']

  return (
    <svg viewBox="0 0 1200 960" className={className} preserveAspectRatio="xMidYMid meet">
      {/* osi */}
      {axes.map((x, i) => (
        <g key={x}>
          <line x1={x} y1={70} x2={x} y2={ground + 120} {...axis} />
          <Bubble x={x} y={48} label={String(i + 1)} />
        </g>
      ))}

      {/* obris i etaže */}
      <rect x={x0 - 12} y={top - 18} width={right - x0 + 24} height={ground - top + 18} {...bold} />
      <line x1={x0 - 30} y1={top - 18} x2={right + 30} y2={top - 18} {...thin} />
      <line x1={x0 - 30} y1={top - 30} x2={right + 30} y2={top - 30} {...thin} />
      {levels.slice(1, floors).map((y) => (
        <g key={y}>
          <line x1={x0 - 12} y1={y} x2={right + 12} y2={y} {...thin} />
          <line x1={x0 - 12} y1={y - 8} x2={right + 12} y2={y - 8} {...hair} />
        </g>
      ))}

      {/* prozori i balkoni */}
      {levels.slice(0, floors).map((y, f) =>
        axes.slice(0, -1).map((x, b) => {
          const wx = x + 34
          const ww = 102
          const wy = y - floorH + 26
          const wh = f === 0 ? 86 : 64
          const balcony = f > 0 && (b === 1 || b === 3)
          return (
            <g key={`${f}-${b}`}>
              <rect x={wx} y={wy} width={ww} height={wh} {...thin} />
              <line x1={wx + ww / 2} y1={wy} x2={wx + ww / 2} y2={wy + wh} {...hair} />
              {f === 0 && b === 2 ? (
                <line x1={wx} y1={wy + wh} x2={wx + ww} y2={wy} {...hair} />
              ) : (
                <line x1={wx} y1={wy + wh * 0.62} x2={wx + ww} y2={wy + wh * 0.62} {...hair} />
              )}
              {balcony && (
                <g>
                  <rect x={x + 18} y={y - 30} width={134} height={22} {...thin} />
                  {Array.from({ length: 12 }, (_, k) => (
                    <line key={k} x1={x + 26 + k * 11} y1={y - 30} x2={x + 26 + k * 11} y2={y - 8} {...hair} />
                  ))}
                </g>
              )}
            </g>
          )
        }),
      )}

      {/* teren i temelj */}
      <line x1={40} y1={ground} x2={1160} y2={ground} {...bold} />
      {Array.from({ length: 70 }, (_, i) => (
        <line key={i} x1={40 + i * 16} y1={ground + 2} x2={28 + i * 16} y2={ground + 14} {...hair} />
      ))}
      <rect x={x0 - 30} y={ground} width={right - x0 + 60} height={70} {...thin} strokeDasharray="8 6" />
      {axes.map((x) => (
        <rect key={x} x={x - 40} y={ground + 70} width={80} height={34} {...thin} strokeDasharray="8 6" />
      ))}

      {/* oznake etaža (nazivi, bez kota) */}
      {levels.map((y, i) => (
        <g key={y}>
          <line x1={right + 40} y1={y} x2={right + 70} y2={y} {...thin} />
          <path d={`M${right + 52} ${y} l-8 -12 h16 z`} {...thin} />
          <text x={right + 80} y={y + 4} fontSize={12} {...txt}>
            {names[i].toUpperCase()}
          </text>
        </g>
      ))}

      {/* naslov lista */}
      <g>
        <line x1={x0} y1={ground + 170} x2={x0 + 260} y2={ground + 170} {...bold} />
        <text x={x0} y={ground + 196} fontSize={15} {...txt}>
          PROČELJE / ISTOK
        </text>
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Tlocrt etaže: rešetka stupova, zidovi, vrata, stubište           */
/* ------------------------------------------------------------------ */
export function FloorPlan({ className = '' }: { className?: string }) {
  const xs = [140, 340, 540, 740, 900]
  const ys = [140, 330, 520, 680]
  const L = xs[0]
  const R = xs[xs.length - 1]
  const T = ys[0]
  const B = ys[ys.length - 1]
  const w = 22 // debljina vanjskog zida

  return (
    <svg viewBox="0 0 1040 820" className={className} preserveAspectRatio="xMidYMid meet">
      {xs.map((x, i) => (
        <g key={x}>
          <line x1={x} y1={60} x2={x} y2={B + 70} {...axis} />
          <Bubble x={x} y={40} label={String.fromCharCode(65 + i)} />
        </g>
      ))}
      {ys.map((y, i) => (
        <g key={y}>
          <line x1={60} y1={y} x2={R + 70} y2={y} {...axis} />
          <Bubble x={40} y={y} label={String(i + 1)} />
        </g>
      ))}

      {/* vanjski zidovi s otvorima */}
      <path
        d={`M${L - w / 2} ${T - w / 2} H${R + w / 2} V${B + w / 2} H${L - w / 2} Z`}
        {...bold}
      />
      <path
        d={`M${L + w / 2} ${T + w / 2} H${R - w / 2} V${B - w / 2} H${L + w / 2} Z`}
        {...thin}
      />
      {[220, 420, 620, 800].map((x) => (
        <g key={x}>
          <line x1={x} y1={T - w / 2} x2={x + 80} y2={T - w / 2} stroke="#F4F1E9" strokeWidth={4} vectorEffect="non-scaling-stroke" />
          <line x1={x} y1={T - 3} x2={x + 80} y2={T - 3} {...hair} />
          <line x1={x} y1={T + 3} x2={x + 80} y2={T + 3} {...hair} />
        </g>
      ))}

      {/* stupovi */}
      {xs.flatMap((x) =>
        ys.map((y) => <rect key={`${x}-${y}`} x={x - 11} y={y - 11} width={22} height={22} fill={INK} />),
      )}

      {/* unutarnji zidovi */}
      <line x1={L} y1={330} x2={540} y2={330} {...thin} strokeWidth={1.4} />
      <line x1={540} y1={T} x2={540} y2={B} {...thin} strokeWidth={1.4} />
      <line x1={740} y1={330} x2={740} y2={B} {...thin} strokeWidth={1.4} />
      <line x1={340} y1={330} x2={340} y2={B} {...thin} strokeWidth={1.4} />

      {/* vrata */}
      {[
        [400, 330, 0],
        [540, 420, 1],
        [740, 560, 1],
        [200, 330, 0],
      ].map(([x, y, v]) =>
        v ? (
          <g key={`${x}${y}`}>
            <line x1={x} y1={y} x2={x + 70} y2={y} {...thin} />
            <path d={`M${x + 70} ${y} A70 70 0 0 1 ${x} ${y + 70}`} {...hair} />
          </g>
        ) : (
          <g key={`${x}${y}`}>
            <line x1={x} y1={y} x2={x} y2={y + 70} {...thin} />
            <path d={`M${x} ${y + 70} A70 70 0 0 0 ${x + 70} ${y}`} {...hair} />
          </g>
        ),
      )}

      {/* stubište */}
      <rect x={560} y={350} width={160} height={150} {...thin} />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={560} y1={350 + i * 13.6} x2={640} y2={350 + i * 13.6} {...hair} />
      ))}
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={640} y1={350 + i * 13.6} x2={720} y2={350 + i * 13.6} {...hair} />
      ))}
      <line x1={640} y1={350} x2={640} y2={500} {...thin} />
      <path d="M600 490 V365 M594 378 l6 -13 l6 13" {...hair} />

      {/* oznaka presjeka */}
      <line x1={40} y1={430} x2={1000} y2={430} {...hair} strokeDasharray="30 8" />
      {[60, 980].map((x) => (
        <g key={x}>
          <path d={`M${x} 430 v-26 l${x < 500 ? 22 : -22} 26`} {...thin} />
          <text x={x} y={398} textAnchor="middle" fontSize={16} {...txt}>
            A
          </text>
        </g>
      ))}

      <text x={L} y={B + 120} fontSize={15} {...txt}>
        TLOCRT ETAŽE / PRESJEK A–A
      </text>
      <line x1={L} y1={B + 98} x2={L + 300} y2={B + 98} {...bold} />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Detalj temelja: armirani beton u presjeku                        */
/* ------------------------------------------------------------------ */
export function FoundationDetail({ className = '' }: { className?: string }) {
  const r = rng(7)
  const fx = 160
  const fy = 380
  const fw = 520
  const fh = 160
  const wx = 330
  const ww = 180
  const dots = Array.from({ length: 320 }, () => {
    const inFooting = r() < 0.72
    if (inFooting) return { x: fx + 8 + r() * (fw - 16), y: fy + 8 + r() * (fh - 16), s: r() }
    return { x: wx + 8 + r() * (ww - 16), y: 60 + r() * (fy - 68), s: r() }
  })

  return (
    <svg viewBox="0 0 840 680" className={className} preserveAspectRatio="xMidYMid meet">
      {/* tlo */}
      <line x1={40} y1={200} x2={wx} y2={200} {...bold} />
      <line x1={wx + ww} y1={200} x2={800} y2={200} {...bold} />
      {Array.from({ length: 34 }, (_, i) => (
        <path key={i} d={`M${40 + i * 22} ${215} l-14 14`} {...hair} />
      )).filter((_, i) => 40 + i * 22 < wx - 10 || 40 + i * 22 > wx + ww + 10)}

      {/* zid i temeljna stopa */}
      <rect x={wx} y={40} width={ww} height={fy - 40} {...bold} />
      <rect x={fx} y={fy} width={fw} height={fh} {...bold} />
      <rect x={fx - 30} y={fy + fh} width={fw + 60} height={18} {...thin} />

      {/* agregat u betonu */}
      {dots.map((d, i) =>
        d.s > 0.82 ? (
          <path key={i} d={`M${d.x} ${d.y - 4} l4 7 h-8 z`} {...hair} />
        ) : (
          <circle key={i} cx={d.x} cy={d.y} r={d.s > 0.5 ? 1.6 : 1} fill={INK} />
        ),
      )}

      {/* armatura: donja zona i vilice */}
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={fx + 40 + i * 55} cy={fy + fh - 34} r={7} {...thin} />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={fx + 40 + i * 55} cy={fy + 34} r={5} {...thin} />
      ))}
      <rect x={fx + 26} y={fy + 22} width={fw - 52} height={fh - 44} rx={10} {...hair} />
      {[wx + 30, wx + ww - 30].map((x) => (
        <g key={x}>
          <line x1={x} y1={60} x2={x} y2={fy + fh - 34} {...thin} />
          <path d={`M${x} ${fy + fh - 34} h${x < wx + ww / 2 ? -70 : 70}`} {...thin} />
        </g>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={wx + 22} y={80 + i * 36} width={ww - 44} height={12} rx={4} {...hair} />
      ))}

      {/* hidroizolacija */}
      <path d={`M${wx - 8} 120 V${fy - 8} H${fx - 8} V${fy + fh + 8}`} {...hair} strokeDasharray="4 4" />

      {/* pokazne linije i oznaka detalja */}
      <path d={`M${fx + fw - 60} ${fy + fh - 34} L740 300 H800`} {...hair} />
      <circle cx={fx + fw - 60} cy={fy + fh - 34} r={3} fill={INK} />
      <text x={744} y={292} fontSize={12} {...txt}>
        ARMATURA
      </text>
      <path d={`M${wx + ww - 40} 160 L640 110 H760`} {...hair} />
      <circle cx={wx + ww - 40} cy={160} r={3} fill={INK} />
      <text x={644} y={102} fontSize={12} {...txt}>
        ARMIRANI BETON
      </text>

      <Bubble x={92} y={608} label="01" r={22} />
      <line x1={124} y1={600} x2={420} y2={600} {...bold} />
      <text x={124} y={628} fontSize={14} {...txt}>
        DETALJ / TEMELJNA STOPA
      </text>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* 4. Konstrukcijska rešetka: osi, stupovi, grede                      */
/* ------------------------------------------------------------------ */
export function StructuralGrid({ className = '' }: { className?: string }) {
  const xs = [120, 360, 600, 840]
  const ys = [120, 330, 540]
  return (
    <svg viewBox="0 0 960 640" className={className} preserveAspectRatio="xMidYMid meet">
      {xs.map((x, i) => (
        <g key={x}>
          <line x1={x} y1={70} x2={x} y2={610} {...axis} />
          <Bubble x={x} y={46} label={String.fromCharCode(65 + i)} />
        </g>
      ))}
      {ys.map((y, i) => (
        <g key={y}>
          <line x1={70} y1={y} x2={930} y2={y} {...axis} />
          <Bubble x={46} y={y} label={String(i + 1)} />
        </g>
      ))}
      {xs.slice(0, -1).flatMap((x, i) =>
        ys.map((y) => (
          <g key={`${x}-${y}`}>
            <line x1={x} y1={y - 7} x2={xs[i + 1]} y2={y - 7} {...thin} />
            <line x1={x} y1={y + 7} x2={xs[i + 1]} y2={y + 7} {...thin} />
          </g>
        )),
      )}
      {xs.flatMap((x) =>
        ys.map((y) => (
          <g key={`c${x}-${y}`}>
            <rect x={x - 16} y={y - 16} width={32} height={32} {...bold} />
            <line x1={x - 16} y1={y - 16} x2={x + 16} y2={y + 16} {...hair} />
            <line x1={x + 16} y1={y - 16} x2={x - 16} y2={y + 16} {...hair} />
          </g>
        )),
      )}
      <text x={120} y={630} fontSize={13} {...txt}>
        KONSTRUKCIJA / RASPORED STUPOVA
      </text>
    </svg>
  )
}
