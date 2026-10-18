// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid
// } from 'recharts'

// const NAVY = '#1a2744'
// const BLUE = '#2563eb'
// const GREEN = '#16a34a'
// const RED = '#dc2626'
// const AMBER = '#d97706'
// const SLATE = '#64748b'

// const DONUT_COLORS = [NAVY, BLUE, SLATE]

// interface ChartCardProps {
//   title: string
//   children: React.ReactNode
//   isEmpty?: boolean
//   height?: number
// }

// function ChartCard({ title, children, isEmpty, height = 160 }: ChartCardProps) {
//   return (
//     <div
//       className="bg-white rounded-md border border-gray-200 flex flex-col"
//       style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
//       dir="rtl"
//     >
//       <div className="px-3 py-2 border-b border-gray-100">
//         <span className="text-xs font-600 text-gray-700">{title}</span>
//       </div>
//       <div className="flex-1 flex items-center justify-center" style={{ height }}>
//         {isEmpty ? (
//           <div className="text-center py-4">
//             <div className="text-gray-300 mb-1 text-2xl">○</div>
//             <p className="text-xs text-gray-400">بر اساس پارامترهای انتخابی، اطلاعاتی یافت نشد.</p>
//           </div>
//         ) : children}
//       </div>
//     </div>
//   )
// }

// const taxpayerCountData = [
//   { name: 'حقوقی', value: 41200 },
//   { name: 'حقیقی', value: 38600 },
//   { name: 'اتباع', value: 7755 },
// ]

// const taxpayerAmountData = [
//   { name: 'حقوقی', value: 16420 },
//   { name: 'حقیقی', value: 9380 },
//   { name: 'اتباع', value: 1620 },
// ]

// const taxSourceData = [
//   { name: 'ارزش افزوده', value: 28400 },
//   { name: 'عملکرد', value: 23100 },
//   { name: 'تکلیفی', value: 18700 },
//   { name: 'مستقیم', value: 12200 },
//   { name: 'سایر', value: 5155 },
// ]

// const channelData = [
//   { name: 'اینترنتی', value: 32100 },
//   { name: 'بانکی', value: 27400 },
//   { name: 'ATM', value: 15800 },
//   { name: 'شعبه', value: 9255 },
//   { name: 'POS', value: 3000 },
// ]

// const statusData = [
//   { name: 'باز', value: 32144, fill: RED },
//   { name: 'منطبق', value: 55411, fill: GREEN },
// ]

// const monthlyAmountData = [
//   { month: 'فرو', avg: 2100, min: 800, max: 4200 },
//   { month: 'ارد', avg: 2450, min: 950, max: 5100 },
//   { month: 'خرد', avg: 1950, min: 700, max: 3800 },
//   { month: 'تیر', avg: 2800, min: 1100, max: 5600 },
//   { month: 'مرد', avg: 3200, min: 1400, max: 6100 },
//   { month: 'شهر', avg: 2700, min: 1000, max: 5200 },
//   { month: 'مهر', avg: 2350, min: 900, max: 4700 },
//   { month: 'آبا', avg: 3100, min: 1300, max: 5900 },
//   { month: 'آذر', avg: 2600, min: 950, max: 5100 },
//   { month: 'دی', avg: 2150, min: 800, max: 4300 },
//   { month: 'بهم', avg: 1800, min: 650, max: 3600 },
//   { month: 'اسف', avg: 4200, min: 1800, max: 8100 },
// ]

// const monthlyTotalData = [
//   { month: 'فرو', total: 1820 },
//   { month: 'ارد', total: 2100 },
//   { month: 'خرد', total: 1650 },
//   { month: 'تیر', total: 2420 },
//   { month: 'مرد', total: 2780 },
//   { month: 'شهر', total: 2350 },
//   { month: 'مهر', total: 2040 },
//   { month: 'آبا', total: 2690 },
//   { month: 'آذر', total: 2250 },
//   { month: 'دی', total: 1870 },
//   { month: 'بهم', total: 1560 },
//   { month: 'اسف', total: 3640 },
// ]

// const customTooltipStyle = {
//   fontSize: 11,
//   fontFamily: 'Vazirmatn, sans-serif',
//   background: '#1a2744',
//   color: 'white',
//   border: 'none',
//   borderRadius: 4,
//   padding: '4px 8px',
// }

// interface Props {
//   isEmpty?: boolean
// }

// export default function Charts({ isEmpty }: Props) {
//   return (
//     <div className="flex flex-col gap-3 h-full">
//       {/* Row 1: Two donut charts */}
//       <div className="grid grid-cols-2 gap-3">
//         <ChartCard title="تعداد مغایرت بر اساس نوع مؤدی" isEmpty={isEmpty} height={180}>
//           <ResponsiveContainer width="100%" height={170}>
//             <PieChart>
//               <Pie data={taxpayerCountData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" nameKey="name">
//                 {taxpayerCountData.map((_, i) => <Cell key={i} fill={DONUT_COLORS[i]} />)}
//               </Pie>
//               <Tooltip contentStyle={customTooltipStyle} formatter={(v) => String(typeof v === "number" ? v.toLocaleString("fa-IR") : v)} />
//               <Legend iconSize={8} iconType="circle" formatter={(v) => <span style={{ fontSize: 10, fontFamily: 'Vazirmatn' }}>{v}</span>} />
//             </PieChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         <ChartCard title="مبلغ مغایرت بر اساس نوع مؤدی (میلیارد ریال)" isEmpty={isEmpty} height={180}>
//           <ResponsiveContainer width="100%" height={170}>
//             <PieChart>
//               <Pie data={taxpayerAmountData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" nameKey="name">
//                 {taxpayerAmountData.map((_, i) => <Cell key={i} fill={DONUT_COLORS[i]} />)}
//               </Pie>
//               <Tooltip contentStyle={customTooltipStyle} formatter={(v) => String(typeof v === "number" ? v.toLocaleString("fa-IR") : v)} />
//               <Legend iconSize={8} iconType="circle" formatter={(v) => <span style={{ fontSize: 10, fontFamily: 'Vazirmatn' }}>{v}</span>} />
//             </PieChart>
//           </ResponsiveContainer>
//         </ChartCard>
//       </div>

//       {/* Row 2: Tax source bar + channel bar */}
//       <div className="grid grid-cols-2 gap-3">
//         <ChartCard title="تعداد مغایرت بر اساس منبع مالیاتی" isEmpty={isEmpty} height={150}>
//           <ResponsiveContainer width="100%" height={140}>
//             <BarChart data={taxSourceData} layout="vertical" margin={{ right: 8, left: 4, top: 4, bottom: 4 }}>
//               <XAxis type="number" tick={{ fontSize: 9, fontFamily: 'Vazirmatn' }} tickFormatter={(v) => (v / 1000).toFixed(0) + 'K'} />
//               <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fontFamily: 'Vazirmatn' }} width={50} />
//               <Tooltip contentStyle={customTooltipStyle} formatter={(v) => String(typeof v === "number" ? v.toLocaleString("fa-IR") : v)} />
//               <Bar dataKey="value" fill={NAVY} radius={[0, 2, 2, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         <ChartCard title="تعداد مغایرت بر اساس کانال پرداخت" isEmpty={isEmpty} height={150}>
//           <ResponsiveContainer width="100%" height={140}>
//             <BarChart data={channelData} layout="vertical" margin={{ right: 8, left: 4, top: 4, bottom: 4 }}>
//               <XAxis type="number" tick={{ fontSize: 9, fontFamily: 'Vazirmatn' }} tickFormatter={(v) => (v / 1000).toFixed(0) + 'K'} />
//               <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fontFamily: 'Vazirmatn' }} width={50} />
//               <Tooltip contentStyle={customTooltipStyle} formatter={(v) => String(typeof v === "number" ? v.toLocaleString("fa-IR") : v)} />
//               <Bar dataKey="value" fill={BLUE} radius={[0, 2, 2, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartCard>
//       </div>

//       {/* Row 3: Status bar + monthly total */}
//       <div className="grid grid-cols-2 gap-3">
//         <ChartCard title="وضعیت مغایرت‌گیری" isEmpty={isEmpty} height={130}>
//           <ResponsiveContainer width="100%" height={120}>
//             <BarChart data={statusData} margin={{ right: 12, left: 4, top: 8, bottom: 4 }}>
//               <XAxis dataKey="name" tick={{ fontSize: 9, fontFamily: 'Vazirmatn' }} />
//               <YAxis tick={{ fontSize: 9, fontFamily: 'Vazirmatn' }} tickFormatter={(v) => (v / 1000).toFixed(0) + 'K'} />
//               <Tooltip contentStyle={customTooltipStyle} formatter={(v) => String(typeof v === "number" ? v.toLocaleString("fa-IR") : v)} />
//               <Bar dataKey="value" radius={[3, 3, 0, 0]}>
//                 {statusData.map((d, i) => <Cell key={i} fill={d.fill} />)}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         <ChartCard title="مجموع مبالغ مغایرت ماهانه (میلیارد)" isEmpty={isEmpty} height={130}>
//           <ResponsiveContainer width="100%" height={120}>
//             <LineChart data={monthlyTotalData} margin={{ right: 8, left: 0, top: 8, bottom: 4 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//               <XAxis dataKey="month" tick={{ fontSize: 8, fontFamily: 'Vazirmatn' }} />
//               <YAxis tick={{ fontSize: 8, fontFamily: 'Vazirmatn' }} />
//               <Tooltip contentStyle={customTooltipStyle} formatter={(v) => String(typeof v === "number" ? v.toLocaleString("fa-IR") : v)} />
//               <Line type="monotone" dataKey="total" stroke={NAVY} strokeWidth={2} dot={false} name="مجموع" />
//             </LineChart>
//           </ResponsiveContainer>
//         </ChartCard>
//       </div>

//       {/* Row 4: Monthly min/avg/max */}
//       <ChartCard title="توزیع مبلغ مغایرت ماهانه — میانگین / حداقل / حداکثر (میلیون ریال)" isEmpty={isEmpty} height={150}>
//         <ResponsiveContainer width="100%" height={140}>
//           <LineChart data={monthlyAmountData} margin={{ right: 12, left: 0, top: 8, bottom: 4 }}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//             <XAxis dataKey="month" tick={{ fontSize: 8, fontFamily: 'Vazirmatn' }} />
//             <YAxis tick={{ fontSize: 8, fontFamily: 'Vazirmatn' }} />
//             <Tooltip contentStyle={customTooltipStyle} formatter={(v) => String(typeof v === "number" ? v.toLocaleString("fa-IR") : v)} />
//             <Legend iconSize={8} formatter={(v) => <span style={{ fontSize: 9, fontFamily: 'Vazirmatn' }}>{v}</span>} />
//             <Line type="monotone" dataKey="max" stroke={RED} strokeWidth={1.5} dot={false} name="حداکثر" strokeDasharray="4 2" />
//             <Line type="monotone" dataKey="avg" stroke={NAVY} strokeWidth={2} dot={false} name="میانگین" />
//             <Line type="monotone" dataKey="min" stroke={GREEN} strokeWidth={1.5} dot={false} name="حداقل" strokeDasharray="4 2" />
//           </LineChart>
//         </ResponsiveContainer>
//       </ChartCard>
//     </div>
//   )
// }


import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area, CartesianGrid, Sector
} from 'recharts'
import { useState } from 'react'

/* ── Palette ───────────────────────────────────────────── */
const NAVY = '#1a2744'
const BLUE = '#2563eb'
const CYAN = '#06b6d4'
const GREEN = '#16a34a'
const RED = '#dc2626'
const AMBER = '#d97706'
const VIOLET = '#7c3aed'
const SLATE = '#64748b'

const DONUT_COLORS = [NAVY, BLUE, CYAN]
const FONT = 'Vazirmatn, IRANSans, sans-serif'

/* ── Number helper ─────────────────────────────────────── */
const faNum = (v: unknown) =>
  typeof v === 'number' ? v.toLocaleString('fa-IR') : String(v)

/* ── Glassy custom tooltip ─────────────────────────────── */
function GlassTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div
      dir="rtl"
      style={{
        fontFamily: FONT,
        fontSize: 11,
        background: 'rgba(26,39,68,0.92)',
        backdropFilter: 'blur(6px)',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 8,
        padding: '8px 12px',
        boxShadow: '0 8px 24px rgba(26,39,68,0.35)',
      }}
    >
      {label != null && (
        <div style={{ opacity: 0.7, marginBottom: 4, fontSize: 10 }}>{label}</div>
      )}
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              width: 8, height: 8, borderRadius: '50%',
              background: p.color || p.fill, display: 'inline-block',
            }}
          />
          <span style={{ opacity: 0.85 }}>{p.name}:</span>
          <span style={{ fontWeight: 700 }}>{faNum(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Elevated card shell ───────────────────────────────── */
interface ChartCardProps {
  title: string
  accent?: string
  children: React.ReactNode
  isEmpty?: boolean
  height?: number
}

function ChartCard({ title, accent = BLUE, children, isEmpty, height = 160 }: ChartCardProps) {
  return (
    <div
      dir="rtl"
      className="rounded-xl flex flex-col overflow-hidden transition-shadow duration-300"
      style={{
        background: 'linear-gradient(180deg,#ffffff 0%,#fbfcfe 100%)',
        border: '1px solid #eef1f6',
        boxShadow: '0 1px 2px rgba(16,24,40,0.04), 0 8px 24px rgba(16,24,40,0.06)',
      }}
    >
      <div
        className="px-4 py-2.5 flex items-center gap-2 border-b"
        style={{ borderColor: '#f1f3f8' }}
      >
        <span style={{ width: 3, height: 14, borderRadius: 3, background: accent }} />
        <span className="text-xs font-bold" style={{ color: NAVY }}>{title}</span>
      </div>
      <div className="flex-1 flex items-center justify-center px-1" style={{ height }}>
        {isEmpty ? (
          <div className="text-center py-4">
            <div
              className="mx-auto mb-2 rounded-full flex items-center justify-center"
              style={{ width: 40, height: 40, background: '#f1f5f9', color: '#cbd5e1', fontSize: 20 }}
            >○</div>
            <p className="text-xs text-gray-400">بر اساس پارامترهای انتخابی، اطلاعاتی یافت نشد.</p>
          </div>
        ) : children}
      </div>
    </div>
  )
}

/* ── Data ──────────────────────────────────────────────── */
const taxpayerCountData = [
  { name: 'حقوقی', value: 41200 },
  { name: 'حقیقی', value: 38600 },
  { name: 'اتباع', value: 7755 },
]
const taxpayerAmountData = [
  { name: 'حقوقی', value: 16420 },
  { name: 'حقیقی', value: 9380 },
  { name: 'اتباع', value: 1620 },
]
const taxSourceData = [
  { name: 'ارزش افزوده', value: 28400 },
  { name: 'عملکرد', value: 23100 },
  { name: 'تکلیفی', value: 18700 },
  { name: 'مستقیم', value: 12200 },
  { name: 'سایر', value: 5155 },
]
const channelData = [
  { name: 'اینترنتی', value: 32100 },
  { name: 'بانکی', value: 27400 },
  { name: 'ATM', value: 15800 },
  { name: 'شعبه', value: 9255 },
  { name: 'POS', value: 3000 },
]
const statusData = [
  { name: 'باز', value: 32144, fill: RED },
  { name: 'منطبق', value: 55411, fill: GREEN },
]
const monthlyAmountData = [
  { month: 'فرو', avg: 2100, min: 800, max: 4200 },
  { month: 'ارد', avg: 2450, min: 950, max: 5100 },
  { month: 'خرد', avg: 1950, min: 700, max: 3800 },
  { month: 'تیر', avg: 2800, min: 1100, max: 5600 },
  { month: 'مرد', avg: 3200, min: 1400, max: 6100 },
  { month: 'شهر', avg: 2700, min: 1000, max: 5200 },
  { month: 'مهر', avg: 2350, min: 900, max: 4700 },
  { month: 'آبا', avg: 3100, min: 1300, max: 5900 },
  { month: 'آذر', avg: 2600, min: 950, max: 5100 },
  { month: 'دی', avg: 2150, min: 800, max: 4300 },
  { month: 'بهم', avg: 1800, min: 650, max: 3600 },
  { month: 'اسف', avg: 4200, min: 1800, max: 8100 },
]
const monthlyTotalData = [
  { month: 'فرو', total: 1820 }, { month: 'ارد', total: 2100 },
  { month: 'خرد', total: 1650 }, { month: 'تیر', total: 2420 },
  { month: 'مرد', total: 2780 }, { month: 'شهر', total: 2350 },
  { month: 'مهر', total: 2040 }, { month: 'آبا', total: 2690 },
  { month: 'آذر', total: 2250 }, { month: 'دی', total: 1870 },
  { month: 'بهم', total: 1560 }, { month: 'اسف', total: 3640 },
]

/* ── Active donut slice (pops out on hover) ────────────── */
function renderActiveSlice(props: any) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props
  return (
    <g>
      <Sector
        cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 5}
        startAngle={startAngle} endAngle={endAngle} fill={fill}
      />
      <Sector
        cx={cx} cy={cy} innerRadius={outerRadius + 7} outerRadius={outerRadius + 9}
        startAngle={startAngle} endAngle={endAngle} fill={fill} opacity={0.35}
      />
    </g>
  )
}

/* ── Donut with center total ───────────────────────────── */
function DonutChart({ data, unit }: { data: { name: string; value: number }[]; unit?: string }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <ResponsiveContainer width="100%" height={170}>
      <PieChart>
        <defs>
          {DONUT_COLORS.map((c, i) => (
            <linearGradient key={i} id={`donut-${i}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={c} stopOpacity={1} />
              <stop offset="100%" stopColor={c} stopOpacity={0.75} />
            </linearGradient>
          ))}
        </defs>
        <Pie
          data={data} cx="50%" cy="50%" innerRadius={44} outerRadius={64}
          paddingAngle={3} cornerRadius={4} dataKey="value" nameKey="name"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={`url(#donut-${i})`} stroke="#fff" strokeWidth={2} />
          ))}
        </Pie>
        <text x="50%" y="47%" textAnchor="middle" style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, fill: NAVY }}>
          {faNum(total)}
        </text>
        <text x="50%" y="59%" textAnchor="middle" style={{ fontFamily: FONT, fontSize: 9, fill: SLATE }}>
          {unit ?? 'مجموع'}
        </text>
        <Tooltip content={<GlassTooltip />} />
        <Legend
          iconSize={8} iconType="circle"
          formatter={(v) => <span style={{ fontSize: 10, fontFamily: FONT, color: NAVY }}>{v}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}


/* ── Horizontal gradient bars ──────────────────────────── */
function GradientBars({ data, from, to, id }: { data: any[]; from: string; to: string; id: string }) {
  return (
    <ResponsiveContainer width="100%" height={140}>
      <BarChart data={data} layout="vertical" margin={{ right: 12, left: 4, top: 4, bottom: 4 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <CartesianGrid horizontal={false} stroke="#f4f6fa" />
        <XAxis type="number" axisLine={false} tickLine={false}
          tick={{ fontSize: 9, fontFamily: FONT, fill: SLATE }}
          tickFormatter={(v) => (v / 1000).toFixed(0) + 'K'} />
        <YAxis type="category" dataKey="name" axisLine={false} tickLine={false}
          tick={{ fontSize: 9, fontFamily: FONT, fill: NAVY }} width={52} />
        <Tooltip cursor={{ fill: 'rgba(37,99,235,0.06)' }} content={<GlassTooltip />} />
        <Bar dataKey="value" fill={`url(#${id})`} radius={[0, 6, 6, 0]} barSize={13} name="تعداد" />
      </BarChart>
    </ResponsiveContainer>
  )
}

/* ── Main ──────────────────────────────────────────────── */
interface Props { isEmpty?: boolean }

export default function Charts({ isEmpty }: Props) {
  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Row 1: donuts */}
      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="تعداد مغایرت بر اساس نوع مؤدی" accent={NAVY} isEmpty={isEmpty} height={185}>
          <DonutChart data={taxpayerCountData} unit="فقره" />
        </ChartCard>
        <ChartCard title="مبلغ مغایرت بر اساس نوع مؤدی (میلیارد ریال)" accent={BLUE} isEmpty={isEmpty} height={185}>
          <DonutChart data={taxpayerAmountData} unit="میلیارد" />
        </ChartCard>
      </div>

      {/* Row 2: gradient bars */}
      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="تعداد مغایرت بر اساس منبع مالیاتی" accent={VIOLET} isEmpty={isEmpty} height={150}>
          <GradientBars data={taxSourceData} from={VIOLET} to={BLUE} id="src" />
        </ChartCard>
        <ChartCard title="تعداد مغایرت بر اساس کانال پرداخت" accent={CYAN} isEmpty={isEmpty} height={150}>
          <GradientBars data={channelData} from={BLUE} to={CYAN} id="chn" />
        </ChartCard>
      </div>

      {/* Row 3: status + monthly total area */}
      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="وضعیت مغایرت‌گیری" accent={AMBER} isEmpty={isEmpty} height={140}>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={statusData} margin={{ right: 12, left: 4, top: 12, bottom: 4 }}>
              <defs>
                <linearGradient id="stat-red" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={RED} /><stop offset="100%" stopColor="#f87171" />
                </linearGradient>
                <linearGradient id="stat-green" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GREEN} /><stop offset="100%" stopColor="#4ade80" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f4f6fa" />
              <XAxis dataKey="name" axisLine={false} tickLine={false}
                tick={{ fontSize: 10, fontFamily: FONT, fill: NAVY }} />
              <YAxis axisLine={false} tickLine={false}
                tick={{ fontSize: 9, fontFamily: FONT, fill: SLATE }}
                tickFormatter={(v) => (v / 1000).toFixed(0) + 'K'} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.03)' }} content={<GlassTooltip />} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={44} name="تعداد">
                {statusData.map((d, i) => (
                  <Cell key={i} fill={d.fill === RED ? 'url(#stat-red)' : 'url(#stat-green)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="مجموع مبالغ مغایرت ماهانه (میلیارد)" accent={NAVY} isEmpty={isEmpty} height={140}>
          <ResponsiveContainer width="100%" height={130}>
            <AreaChart data={monthlyTotalData} margin={{ right: 12, left: 0, top: 12, bottom: 4 }}>
              <defs>
                <linearGradient id="areaTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={NAVY} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={NAVY} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f4f6fa" />
              <XAxis dataKey="month" axisLine={false} tickLine={false}
                tick={{ fontSize: 8, fontFamily: FONT, fill: SLATE }} />
              <YAxis axisLine={false} tickLine={false}
                tick={{ fontSize: 8, fontFamily: FONT, fill: SLATE }} />
              <Tooltip content={<GlassTooltip />} />
              <Area type="monotone" dataKey="total" name="مجموع" stroke={NAVY}
                strokeWidth={2.5} fill="url(#areaTotal)"
                dot={false} activeDot={{ r: 4, fill: NAVY, stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 4: min / avg / max band */}
      <ChartCard title="توزیع مبلغ مغایرت ماهانه — میانگین / حداقل / حداکثر (میلیون ریال)" accent={BLUE} isEmpty={isEmpty} height={155}>
        <ResponsiveContainer width="100%" height={145}>
          <AreaChart data={monthlyAmountData} margin={{ right: 12, left: 0, top: 12, bottom: 4 }}>
            <defs>
              <linearGradient id="bandMax" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={BLUE} stopOpacity={0.18} />
                <stop offset="100%" stopColor={BLUE} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f4f6fa" />
            <XAxis dataKey="month" axisLine={false} tickLine={false}
              tick={{ fontSize: 8, fontFamily: FONT, fill: SLATE }} />
            <YAxis axisLine={false} tickLine={false}
              tick={{ fontSize: 8, fontFamily: FONT, fill: SLATE }} />
            <Tooltip content={<GlassTooltip />} />
            <Legend iconSize={8} iconType="circle"
              formatter={(v) => <span style={{ fontSize: 9, fontFamily: FONT, color: NAVY }}>{v}</span>} />
            <Area type="monotone" dataKey="max" name="حداکثر" stroke={RED}
              strokeWidth={1.5} strokeDasharray="4 3" fill="url(#bandMax)" dot={false} />
            <Area type="monotone" dataKey="avg" name="میانگین" stroke={BLUE}
              strokeWidth={2.5} fill="none" dot={false}
              activeDot={{ r: 4, fill: BLUE, stroke: '#fff', strokeWidth: 2 }} />
            <Area type="monotone" dataKey="min" name="حداقل" stroke={GREEN}
              strokeWidth={1.5} strokeDasharray="4 3" fill="none" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}

