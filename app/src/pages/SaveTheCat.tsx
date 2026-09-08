import { useRef, useState } from 'react'
import { actLabels, catBeats, type CatBeat } from '../data/saveTheCat'

const actColor: Record<number, string> = {
  1: 'bg-blue-100 text-blue-700',
  2: 'bg-amber-100 text-amber-700',
  3: 'bg-green-100 text-green-700',
}

export default function SaveTheCat() {
  const [selected, setSelected] = useState<CatBeat>(catBeats[3])
  const itemRefs = useRef<Record<number, HTMLLIElement | null>>({})

  const pick = (b: CatBeat, scroll = false) => {
    setSelected(b)
    if (scroll) itemRefs.current[b.n]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // 弧光曲线几何
  const W = 900
  const H = 110
  const x = (i: number) => 30 + (i * (W - 60)) / (catBeats.length - 1)
  const y = (v: number) => 15 + ((3 - v) * (H - 30)) / 6
  const arcPts = catBeats.map((b, i) => `${x(i)},${y(b.arc)}`).join(' ')

  return (
    <div className="min-h-screen bg-stone-100 text-slate-800">
      <header className="border-b border-stone-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-lg font-bold">救猫咪 · 15 节拍表</h1>
          <p className="text-xs text-slate-500">
            案例：《我不是药神》（单主角 · 程勇）—— 页码为布莱克·斯奈德 110 页剧本标准
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-6 py-5">
        {/* 三幕标尺 */}
        <section className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-2 flex text-[11px] font-semibold">
            {actLabels.map((a) => (
              <div key={a.act} style={{ width: `${a.to - a.from}%` }} className={`text-center ${a.act === 2 ? 'text-amber-600' : a.act === 1 ? 'text-blue-600' : 'text-green-600'}`}>
                {a.name}
              </div>
            ))}
          </div>
          <div className="relative h-2 rounded-full bg-stone-100">
            <div className="absolute inset-y-0 left-0 w-1/4 rounded-l-full bg-blue-200/60" />
            <div className="absolute inset-y-0 left-1/4 w-1/2 bg-amber-200/60" />
            <div className="absolute inset-y-0 right-0 w-1/4 rounded-r-full bg-green-200/60" />
            {catBeats.map((b) => (
              <button
                key={b.n}
                onClick={() => pick(b, true)}
                style={{ left: `${b.pct}%` }}
                className={`absolute top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 bg-white text-[10px] font-bold transition-transform hover:scale-125 ${
                  selected.n === b.n ? 'scale-125 border-slate-800 text-slate-900' : 'border-stone-300 text-slate-500'
                }`}
                title={`${b.n}. ${b.name}`}
              >
                {b.n}
              </button>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-slate-400">
            <span>p1</span><span>p25</span><span>p55</span><span>p75</span><span>p85</span><span>p110</span>
          </div>
        </section>

        {/* 主角弧光 */}
        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-1 text-sm font-bold">程勇的弧光曲线</h2>
          <p className="mb-2 text-[11px] text-slate-500">利己（-3）↔ 利他（+3）——注意第 9 拍散伙的回撤与第 11 拍的谷底</p>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            <line x1="30" y1={y(0)} x2={W - 30} y2={y(0)} stroke="#d6d3d1" strokeDasharray="4 3" />
            <polyline points={arcPts} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinejoin="round" />
            {catBeats.map((b, i) => (
              <circle
                key={b.n}
                cx={x(i)}
                cy={y(b.arc)}
                r={selected.n === b.n ? 6 : 4}
                fill={selected.n === b.n ? '#1c1917' : '#f97316'}
                className="cursor-pointer"
                onClick={() => pick(b, true)}
              >
                <title>{`${b.n}. ${b.name}（${b.arc > 0 ? '+' : ''}${b.arc}）`}</title>
              </circle>
            ))}
          </svg>
        </section>

        {/* 15 拍清单 */}
        <ol className="space-y-2 pb-10">
          {catBeats.map((b) => (
            <li
              key={b.n}
              ref={(el) => {
                itemRefs.current[b.n] = el
              }}
            >
              <button
                onClick={() => pick(b)}
                className={`w-full rounded-xl bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md ${
                  selected.n === b.n ? 'ring-2 ring-slate-800' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                    {b.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-bold">{b.name}</span>
                      <span className="text-xs text-slate-400">{b.en} · {b.pos}</span>
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${actColor[b.act]}`}>第{b.act === 1 ? '一' : b.act === 2 ? '二' : '三'}幕</span>
                      <span className={`ml-auto text-xs tabular-nums ${b.arc >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        弧光 {b.arc > 0 ? `+${b.arc}` : b.arc}
                      </span>
                    </div>
                    {selected.n === b.n && (
                      <div className="mt-3 space-y-2 text-xs leading-relaxed">
                        <p><span className="font-semibold text-slate-500">药神场景：</span>{b.scene}</p>
                        <p className="rounded-lg bg-stone-50 p-3"><span className="font-semibold text-slate-500">为什么有效：</span>{b.why}</p>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ol>
      </main>
    </div>
  )
}
