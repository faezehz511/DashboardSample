import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, XCircle, Activity } from 'lucide-react'

interface KPI {
  label: string
  value: string
  sub?: string
  trend?: 'up' | 'down' | 'neutral'
  color?: 'navy' | 'green' | 'red' | 'amber' | 'blue'
  icon?: React.ReactNode
}

const kpis: KPI[] = [
  {
    label: 'تعداد کل تراکنش‌ها',
    value: '۱,۴۸۲,۳۶۷',
    sub: 'تراکنش',
    trend: 'up',
    color: 'navy',
    icon: <Activity size={14} />,
  },
  {
    label: 'تراکنش‌های تطبیق‌یافته',
    value: '۱,۳۹۴,۸۱۲',
    sub: '۹۴.۱٪ از کل',
    trend: 'up',
    color: 'green',
    icon: <CheckCircle size={14} />,
  },
  {
    label: 'تراکنش‌های دارای مغایرت',
    value: '۸۷,۵۵۵',
    sub: '۵.۹٪ از کل',
    trend: 'down',
    color: 'red',
    icon: <XCircle size={14} />,
  },
  {
    label: 'مغایرت‌های باز',
    value: '۳۲,۱۴۴',
    sub: 'نیاز به رسیدگی',
    trend: 'down',
    color: 'red',
    icon: <AlertCircle size={14} />,
  },
  {
    label: 'مغایرت‌های منطبق‌شده',
    value: '۵۵,۴۱۱',
    sub: 'رسیدگی شده',
    trend: 'up',
    color: 'green',
    icon: <CheckCircle size={14} />,
  },
  {
    label: 'نرخ مغایرت',
    value: '۵.۹۰٪',
    sub: 'از کل تراکنش‌ها',
    trend: 'down',
    color: 'amber',
    icon: <TrendingUp size={14} />,
  },
  {
    label: 'مبلغ کل تراکنش‌ها',
    value: '۸۴۶,۳۲۰',
    sub: 'میلیارد ریال',
    trend: 'up',
    color: 'navy',
    icon: <Activity size={14} />,
  },
  {
    label: 'درصد مبلغ مغایرت',
    value: '۳.۲۴٪',
    sub: 'از کل مبلغ',
    trend: 'down',
    color: 'amber',
    icon: <TrendingDown size={14} />,
  },
  {
    label: 'مبلغ کل مغایرت‌ها',
    value: '۲۷,۴۲۰',
    sub: 'میلیارد ریال',
    trend: 'down',
    color: 'red',
    icon: <AlertCircle size={14} />,
  },
  {
    label: 'مبلغ مغایرت‌های باز',
    value: '۱۲,۸۵۰',
    sub: 'میلیارد ریال',
    trend: 'down',
    color: 'red',
    icon: <XCircle size={14} />,
  },
  {
    label: 'مبلغ مغایرت‌های منطبق',
    value: '۱۴,۵۷۰',
    sub: 'میلیارد ریال',
    trend: 'up',
    color: 'green',
    icon: <CheckCircle size={14} />,
  },
]

const colorMap = {
  navy: { bg: '#1a2744', text: 'white', iconBg: 'rgba(255,255,255,0.15)', trendColor: '#93c5fd' },
  green: { bg: 'white', text: '#15803d', iconBg: '#f0fdf4', trendColor: '#16a34a', border: '#bbf7d0' },
  red: { bg: 'white', text: '#dc2626', iconBg: '#fef2f2', trendColor: '#dc2626', border: '#fecaca' },
  amber: { bg: 'white', text: '#b45309', iconBg: '#fffbeb', trendColor: '#d97706', border: '#fde68a' },
  blue: { bg: 'white', text: '#1d4ed8', iconBg: '#eff6ff', trendColor: '#2563eb', border: '#bfdbfe' },
}

interface Props {
  isEmpty?: boolean
}

export default function KPICards({ isEmpty }: Props) {
  if (isEmpty) {
    return (
      <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(11, 1fr)' }}>
        {kpis.map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-md p-3 h-20 animate-pulse">
            <div className="h-2 bg-gray-200 rounded mb-2 w-3/4 ml-auto" />
            <div className="h-5 bg-gray-200 rounded mb-1 w-1/2 ml-auto" />
            <div className="h-2 bg-gray-100 rounded w-2/3 ml-auto" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}
      dir="rtl"
    >
      {kpis.map((kpi, i) => {
        const colors = colorMap[kpi.color || 'navy']
        const isNavy = kpi.color === 'navy'
        return (
          <div
            key={i}
            className="kpi-card rounded-md p-3 flex flex-col gap-1"
            style={{
              background: colors.bg,
              border: isNavy ? 'none' : `1px solid ${(colors as { border?: string }).border || '#e5e7eb'}`,
              boxShadow: isNavy ? '0 2px 8px rgba(26,39,68,0.2)' : '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-xs leading-tight"
                style={{ color: isNavy ? 'rgba(255,255,255,0.75)' : '#6b7280', textAlign: 'right' }}
              >
                {kpi.label}
              </span>
              <span
                className="flex items-center justify-center w-6 h-6 rounded"
                style={{ background: colors.iconBg, color: isNavy ? 'white' : colors.text }}
              >
                {kpi.icon}
              </span>
            </div>
            <div
              className="text-lg font-700 num-cell leading-tight"
              style={{ color: isNavy ? 'white' : colors.text, textAlign: 'right' }}
            >
              {kpi.value}
            </div>
            <div
              className="text-xs flex items-center gap-1 justify-end"
              style={{ color: isNavy ? 'rgba(255,255,255,0.6)' : '#9ca3af' }}
            >
              {kpi.trend === 'up' ? <TrendingUp size={10} /> : kpi.trend === 'down' ? <TrendingDown size={10} /> : null}
              {kpi.sub}
            </div>
          </div>
        )
      })}
    </div>
  )
}
