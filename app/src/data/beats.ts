// 《解忧杂货店》节拍板数据
// 数据模型：beat（事件）× lane（故事线）× time（双重时间：叙述顺序 + 故事内时间）

export type BeatType = '铺垫' | '激励' | '递进' | '危机' | '高潮' | '引爆' | '结局'

export interface Lane {
  id: string
  name: string
  // Tailwind 完整类名（JIT 扫描需要静态字符串）
  card: string // 卡片底色
  dot: string // 标识色块
  line: string // 弧光曲线颜色
}

export interface Beat {
  id: string
  lane: string
  chapter: number // 叙述顺序列 0~4
  order: number // 列内顺序
  year: number // 故事内年份（真实时间轴用）
  yearLabel: string
  title: string
  type: BeatType
  emotion: number // -3 ~ +3
  note: string
  pair?: string // 伏笔/回收配对 beat id
}

export const lanes: Lane[] = [
  { id: 'hub', name: '双枢纽 · 浪矢杂货店', card: 'bg-amber-50 border-amber-300', dot: 'bg-amber-500', line: '#f59e0b' },
  { id: 'trio', name: '小偷三人组', card: 'bg-sky-50 border-sky-300', dot: 'bg-sky-500', line: '#0ea5e9' },
  { id: 'rabbit', name: '月兔 · 静子', card: 'bg-pink-50 border-pink-300', dot: 'bg-pink-500', line: '#ec4899' },
  { id: 'musician', name: '鱼店音乐人 · 克郎', card: 'bg-orange-50 border-orange-300', dot: 'bg-orange-500', line: '#f97316' },
  { id: 'orphanage', name: '丸光园的孩子们', card: 'bg-emerald-50 border-emerald-300', dot: 'bg-emerald-500', line: '#10b981' },
  { id: 'kosuke', name: '保罗·列侬 · 浩介', card: 'bg-violet-50 border-violet-300', dot: 'bg-violet-500', line: '#8b5cf6' },
  { id: 'harumi', name: '迷途的小狗 · 晴美', card: 'bg-teal-50 border-teal-300', dot: 'bg-teal-500', line: '#14b8a6' },
]

export const chapters = [
  '第一章 · 回信放在牛奶箱',
  '第二章 · 深夜的口琴',
  '第三章 · 在CIVIC车上等到天亮',
  '第四章 · 听着披头四默祷',
  '第五章 · 在天上祈祷',
]

export const beats: Beat[] = [
  // ── 第一章 ──
  { id: 'b01', lane: 'trio', chapter: 0, order: 0, year: 2012, yearLabel: '2012', title: '抢劫后逃入废弃杂货店', type: '激励', emotion: -1, pair: 'b21', note: '打破平衡：三个丸光园出身的年轻人闯入解忧杂货店。伏笔——他们抢的是谁的家？' },
  { id: 'b02', lane: 'rabbit', chapter: 0, order: 1, year: 1979, yearLabel: '1979', title: '月兔投信：奥运梦想 vs 绝症男友', type: '激励', emotion: -1, note: '两难：备战莫斯科奥运，还是陪伴身患绝症的教练男友。' },
  { id: 'b03', lane: 'trio', chapter: 0, order: 2, year: 2012, yearLabel: '2012', title: '发现信来自过去，笨拙回信', type: '递进', emotion: 1, note: '时空装置首次运转：牛奶箱连接 1979 与 2012。' },
  { id: 'b04', lane: 'rabbit', chapter: 0, order: 3, year: 1980, yearLabel: '1980', title: '选择陪伴到最后，男友离世', type: '结局', emotion: 2, note: '价值落点：爱不是牺牲梦想，而是看清自己真正想要的是什么。' },

  // ── 第二章 ──
  { id: 'b05', lane: 'musician', chapter: 1, order: 0, year: 1979, yearLabel: '1979', title: '奶奶葬礼归乡，父亲病倒', type: '激励', emotion: -2, note: '外婆去世=铺垫（改变位置）；父亲病倒=激励事件（改变处境：鱼店必须有人继承）。' },
  { id: 'b06', lane: 'musician', chapter: 1, order: 1, year: 1979, yearLabel: '1979', title: '写信咨询：继承鱼店 or 音乐梦', type: '递进', emotion: -1, note: '内心戏外化：没有对话者的克郎，把挣扎写成信。' },
  { id: 'b07', lane: 'trio', chapter: 1, order: 2, year: 2012, yearLabel: '2012', title: '最后一封信：请坚信到生命最后一刻', type: '递进', emotion: 1, pair: 'b10', note: '丸光园出身的三人组意识到他是谁——知道他会死，仍然选择鼓励。伏笔埋下。' },
  { id: 'b08', lane: 'musician', chapter: 1, order: 3, year: 1979, yearLabel: '1979', title: '父亲：就算打败仗，也要留下足迹', type: '递进', emotion: 1, note: '反对者转为支持者，克郎获得迟来的许可。' },
  { id: 'b09', lane: 'musician', chapter: 1, order: 4, year: 1988, yearLabel: '1988', title: '丸光园火灾：折返救小辰，牺牲', type: '高潮', emotion: -3, note: '危机（折返与否）被极度压缩——抉择越短，人物越本能。行动层高潮。' },
  { id: 'b10', lane: 'orphanage', chapter: 1, order: 5, year: 1993, yearLabel: '1990s', title: '小芹成为歌手，唱红《重生》', type: '引爆', emotion: 3, pair: 'b07', note: '情感层高潮延迟到主角死后兑现——伏笔 b07 回收。"败者的足迹"结构完成。' },

  // ── 第三章 ──
  { id: 'b11', lane: 'hub', chapter: 2, order: 0, year: 1978, yearLabel: '1978', title: '绿河咨询：要不要生下这个孩子', type: '激励', emotion: -1, note: '雄治时代亲回的信件之一。咨询者川边绿怀着有妇之夫的孩子。' },
  { id: 'b12', lane: 'hub', chapter: 2, order: 1, year: 1979, yearLabel: '1979', title: '绿河坠河托女获救，雄治自责', type: '危机', emotion: -2, note: '咨询者的死让雄治怀疑：我的回信是否害了人？——店主的信仰危机。' },
  { id: 'b13', lane: 'hub', chapter: 2, order: 2, year: 1980, yearLabel: '1980', title: '揭晓：丸光园创办人是雄治的初恋', type: '递进', emotion: 1, note: '全书地基：杂货店与丸光园，是一对私奔未遂恋人的遗物。' },
  { id: 'b14', lane: 'hub', chapter: 2, order: 3, year: 1980, yearLabel: '1980', title: '遗言：33周年忌日，杂货店复活一夜', type: '铺垫', emotion: 0, pair: 'b22', note: '伏笔——死后的时间窗口，第五章回收。' },

  // ── 第四章 ──
  { id: 'b15', lane: 'kosuke', chapter: 3, order: 0, year: 1979, yearLabel: '1979', title: '父母欠债计划潜逃，浩介写信咨询', type: '激励', emotion: -1, note: '披头四少年面对家庭崩塌：要不要跟父母连夜逃走。' },
  { id: 'b16', lane: 'kosuke', chapter: 3, order: 1, year: 1979, yearLabel: '1979', title: '逃亡途中独自逃走，入丸光园学木工', type: '递进', emotion: -2, note: '他没听雄治"和家人一起走"的建议——全书唯一违背回信的人。' },
  { id: 'b17', lane: 'kosuke', chapter: 3, order: 2, year: 2012, yearLabel: '2012', title: '得知父母伪造全家死亡来保护他', type: '引爆', emotion: -2, note: '反转：父母的"自私潜逃"其实是用生命为他换干净身份。当年的"正确选择"被改判。' },

  // ── 第五章 ──
  { id: 'b18', lane: 'harumi', chapter: 4, order: 0, year: 1980, yearLabel: '1980', title: '迷途的小狗咨询：要不要辞职', type: '激励', emotion: -1, note: '陪酒女晴美想报恩养家，犹豫是否全职陪酒。' },
  { id: 'b19', lane: 'trio', chapter: 4, order: 1, year: 2012, yearLabel: '2012', title: '三人组用未来经济知识回信指路', type: '递进', emotion: 2, note: '他们知道泡沫经济何时破裂——史上信息差最大的咨询。' },
  { id: 'b20', lane: 'harumi', chapter: 4, order: 2, year: 2012, yearLabel: '1980s→2012', title: '成为企业家，资助丸光园', type: '结局', emotion: 3, note: '丸光园出身的孩子，回头托住丸光园。' },
  { id: 'b21', lane: 'trio', chapter: 4, order: 3, year: 2012, yearLabel: '2012', title: '发现抢劫对象正是晴美，决定自首', type: '危机', emotion: -2, pair: 'b01', note: '伏笔 b01 回收：开篇抢的就是自己指引过的人。救赎弧光闭合。' },
  { id: 'b22', lane: 'trio', chapter: 4, order: 4, year: 2012, yearLabel: '2012↔1980', title: '敦也投入白纸，收到雄治跨时空回信', type: '引爆', emotion: 3, pair: 'b14', note: '"你的地图是一张白纸，所以可以随心所欲地描绘。"——伏笔 b14 回收，全书引爆点。' },
]

export const typeColor: Record<BeatType, string> = {
  铺垫: 'bg-gray-200 text-gray-700',
  激励: 'bg-blue-100 text-blue-700',
  递进: 'bg-slate-100 text-slate-600',
  危机: 'bg-red-100 text-red-700',
  高潮: 'bg-red-500 text-white',
  引爆: 'bg-yellow-300 text-yellow-900',
  结局: 'bg-green-100 text-green-700',
}
