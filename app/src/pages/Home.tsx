import { useMemo, useState } from 'react'
import { beats, chapters, lanes, typeColor, type Beat } from '../data/beats'

type View = 'board' | 'timeline' | 'arc'

const laneById = Object.fromEntries(lanes.map((l) => [l.id, l]))
const beatById = Object.fromEntries(beats.map((b) => [b.id, b]))

function BeatCard({
  beat,
  selected,
  paired,
  dimmed,
  onClick,
}: {
  beat: Beat
  selected: boolean
  paired: boolean
  dimmed: boolean
  onClick: () => void
}) {
  const lane = laneById[beat.lane]
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg border p-2 text-left shadow-sm transition-all hover:shadow-md ${lane.card} ${
        dimmed ? 'opacity-25' : ''
      } ${selected ? 'ring-2 ring-slate-800' : ''} ${paired ? 'ring-2 ring-yellow-400' : ''}`}
    >
      <div className="mb-1 flex items-center justify-between gap-1">
        <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${typeColor[beat.type]}`}>{beat.type}</span>
        <span className="rounded bg-white/70 px-1.5 py-0.5 text-[10px] tabular-nums text-slate-500">{beat.yearLabel}</span>
      </div>
      <div className="text-xs leading-snug font-medium text-slate-800">{beat.title}</div>
      {beat.pair && <div className="mt-1 text-[10px] text-yellow-600">⚡ 伏笔配对</div>}
    </button>
  )
}

export default function Home() {
  const [view, setView] = useState<View>('board')
  const [isolatedLane, setIsolatedLane] = useState<string | null>(null)
  const [selected, setSelected] = useState<Beat | null>(null)

  const selectedPair = selected?.pair ? beatById[selected.pair] : null

  const toggleLane = (id: string) => setIsolatedLane((cur) => (cur === id ? null : id))
  const dimLane = (laneId: string) => isolatedLane !== null && isolatedLane !== laneId

  return (
    <div className="min-h-screen bg-stone-100 text-slate-800">
      {/* 顶栏 */}
      <header className="border-b border-stone-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold">解忧杂货店 · 故事结构板</h1>
            <p className="text-xs text-slate-500">泳道节拍板：beat（事件）× lane（故事线）× time（双重时间）</p>
          </div>
          <nav className="flex gap-1 rounded-lg bg-stone-100 p-1">
            {(
              [
                ['board', '节拍板'],
                ['timeline', '真实时间线'],
                ['arc', '弧光曲线'],
              ] as [View, string][]
            ).map(([v, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  view === v ? 'bg-white font-semibold shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-5">
        <p className="mb-4 text-xs text-slate-500">
          点击泳道名 = 单线裸读（character pass）· 点击卡片 = 查看详情 · ⚡ = 伏笔配对，选中后高亮回收点
        </p>

        {view === 'board' && (
          <BoardView
            isolatedLane={isolatedLane}
            onToggleLane={toggleLane}
            dimLane={dimLane}
            selected={selected}
            selectedPair={selectedPair}
            onSelect={setSelected}
          />
        )}
        {view === 'timeline' && (
          <TimelineView dimLane={dimLane} selected={selected} selectedPair={selectedPair} onSelect={setSelected} />
        )}
        {view === 'arc' && <ArcView />}
      </main>

      {/* 详情面板 */}
      {selected && (
        <aside className="fixed inset-y-0 right-0 z-10 flex w-80 flex-col border-l border-stone-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
            <h2 className="font-bold">节拍详情</h2>
            <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-700">✕</button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 text-sm">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${typeColor[selected.type]}`}>{selected.type}</span>
                <span className="text-xs text-slate-500">{laneById[selected.lane].name}</span>
              </div>
              <div className="text-base font-semibold">{selected.title}</div>
            </div>
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between"><dt className="text-slate-400">叙述位置</dt><dd>{chapters[selected.chapter]}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">故事内时间</dt><dd>{selected.yearLabel}</dd></div>
              <div className="flex justify-between">
                <dt className="text-slate-400">情绪值</dt>
                <dd className={selected.emotion >= 0 ? 'text-green-600' : 'text-red-500'}>
                  {selected.emotion > 0 ? `+${selected.emotion}` : selected.emotion}
                </dd>
              </div>
            </dl>
            <div>
              <div className="mb-1 text-xs text-slate-400">拆片笔记</div>
              <p className="rounded-lg bg-stone-50 p-3 text-xs leading-relaxed">{selected.note}</p>
            </div>
            {selected.pair && (
              <button
                onClick={() => setSelected(beatById[selected.pair!])}
                className="w-full rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-left text-xs text-yellow-800 hover:bg-yellow-100"
              >
                ⚡ 伏笔配对 → {beatById[selected.pair!].title}
              </button>
            )}
          </div>
        </aside>
      )}
    </div>
  )
}

/* ── 视图一：泳道节拍板（叙述顺序） ── */
function BoardView({
  isolatedLane,
  onToggleLane,
  dimLane,
  selected,
  selectedPair,
  onSelect,
}: {
  isolatedLane: string | null
  onToggleLane: (id: string) => void
  dimLane: (id: string) => boolean
  selected: Beat | null
  selectedPair: Beat | null | undefined
  onSelect: (b: Beat) => void
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="w-40 min-w-40" />
            {chapters.map((c) => (
              <th key={c} className="min-w-48 rounded-lg bg-white px-3 py-2 text-left align-top">
                <div className="text-xs font-semibold">{c}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lanes.map((lane) => (
            <tr key={lane.id} className={dimLane(lane.id) ? 'opacity-40' : ''}>
              <td className="align-top">
                <button
                  onClick={() => onToggleLane(lane.id)}
                  className={`flex w-40 items-center gap-2 rounded-lg bg-white px-3 py-2 text-left text-xs font-semibold shadow-sm hover:shadow ${
                    isolatedLane === lane.id ? 'ring-2 ring-slate-800' : ''
                  }`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${lane.dot}`} />
                  {lane.name}
                </button>
              </td>
              {chapters.map((_, ci) => (
                <td key={ci} className="min-w-48 align-top">
                  <div className="space-y-1">
                    {beats
                      .filter((b) => b.lane === lane.id && b.chapter === ci)
                      .sort((a, b) => a.order - b.order)
                      .map((b) => (
                        <BeatCard
                          key={b.id}
                          beat={b}
                          dimmed={false}
                          selected={selected?.id === b.id}
                          paired={selectedPair?.id === b.id}
                          onClick={() => onSelect(b)}
                        />
                      ))}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── 视图二：真实时间线（故事内时间排序） ── */
function TimelineView({
  dimLane,
  selected,
  selectedPair,
  onSelect,
}: {
  dimLane: (id: string) => boolean
  selected: Beat | null
  selectedPair: Beat | null | undefined
  onSelect: (b: Beat) => void
}) {
  const years = useMemo(() => [...new Set(beats.map((b) => b.year))].sort((a, b) => a - b), [])
  return (
    <div>
      <div className="mb-3 flex gap-3 text-[10px] text-slate-400">
        {years.map((y) => (
          <span key={y} className="tabular-nums">{y}</span>
        ))}
      </div>
      <div className="space-y-3">
        {lanes.map((lane) => {
          const laneBeats = beats.filter((b) => b.lane === lane.id).sort((a, b) => a.year - b.year || a.chapter - b.chapter)
          if (laneBeats.length === 0) return null
          return (
            <div key={lane.id} className={`flex items-start gap-3 ${dimLane(lane.id) ? 'opacity-40' : ''}`}>
              <div className="flex w-40 shrink-0 items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold shadow-sm">
                <span className={`h-2.5 w-2.5 rounded-full ${lane.dot}`} />
                {lane.name}
              </div>
              <div className="flex flex-wrap gap-2">
                {laneBeats.map((b) => (
                  <div key={b.id} className="w-52">
                    <BeatCard
                      beat={b}
                      dimmed={false}
                      selected={selected?.id === b.id}
                      paired={selectedPair?.id === b.id}
                      onClick={() => onSelect(b)}
                    />
                    <div className="mt-0.5 pl-1 text-[10px] text-slate-400">{chapters[b.chapter].split(' ')[0]}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <p className="mt-4 text-xs text-slate-500">同一批节拍，按故事内真实时间重排——时空跳跃的结构立刻现形。</p>
    </div>
  )
}

/* ── 视图三：弧光曲线（情绪值折线） ── */
function ArcView() {
  const W = 900
  const H = 360
  const padX = 40
  const padY = 30
  const maxN = Math.max(...lanes.map((l) => beats.filter((b) => b.lane === l.id).length))
  const x = (i: number) => padX + (i * (W - 2 * padX)) / Math.max(maxN - 1, 1)
  const y = (v: number) => padY + ((3 - v) * (H - 2 * padY)) / 6

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="mb-3 flex flex-wrap gap-4 text-xs">
        {lanes.map((l) => (
          <span key={l.id} className="flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-5" style={{ backgroundColor: l.line }} />
            {l.name}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {/* 零线 */}
        <line x1={padX} y1={y(0)} x2={W - padX} y2={y(0)} stroke="#d6d3d1" strokeDasharray="4 3" />
        <text x={8} y={y(3) + 4} fontSize="10" fill="#a8a29e">+3 燃</text>
        <text x={8} y={y(-3) + 4} fontSize="10" fill="#a8a29e">-3 虐</text>
        {lanes.map((lane) => {
          const laneBeats = beats.filter((b) => b.lane === lane.id).sort((a, b) => a.chapter - b.chapter || a.order - b.order)
          if (laneBeats.length < 2) return null
          const pts = laneBeats.map((b, i) => `${x(i)},${y(b.emotion)}`).join(' ')
          return (
            <g key={lane.id}>
              <polyline points={pts} fill="none" stroke={lane.line} strokeWidth="2.5" strokeLinejoin="round" />
              {laneBeats.map((b, i) => (
                <g key={b.id}>
                  <circle cx={x(i)} cy={y(b.emotion)} r="4" fill={lane.line} />
                  <title>{`${b.title}（${b.emotion > 0 ? '+' : ''}${b.emotion}）`}</title>
                </g>
              ))}
            </g>
          )
        })}
      </svg>
      <p className="mt-3 text-xs text-slate-500">
        横轴 = 叙述顺序（各线第 N 拍），纵轴 = 情绪值。克郎线（橙）的深 V 反弹与三人组线（蓝）的爬升在终点交汇——全书的双引擎。
      </p>
    </div>
  )
}
