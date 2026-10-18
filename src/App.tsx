import { useState } from 'react'
import { Building2, Bell, Settings, User, ChevronDown, Database, AlertTriangle } from 'lucide-react'
import FilterPanel from './components/FilterPanel'
import KPICards from './components/KPICards'
import MapArea, { type Province } from './components/MapArea'
import Charts from './components/Charts'
import DataTable from './components/DataTable'

type DashboardState = 'default' | 'province-selected' | 'drilldown' | 'empty'

export default function App() {
  const [dashState, setDashState] = useState<DashboardState>('default')
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null)

  const isEmpty = dashState === 'empty'

  const handleApplyFilter = () => {
    setDashState('default')
    setSelectedProvince(null)
  }

  const handleReset = () => {
    setDashState('empty')
    setSelectedProvince(null)
  }

  const handleSelectProvince = (p: Province) => {
    setSelectedProvince(p)
    setDashState('province-selected')
  }

  const handleDrillDown = (p: Province) => {
    setSelectedProvince(p)
    setDashState('drilldown')
  }

  const handleBack = () => {
    setDashState('province-selected')
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--page-bg)', direction: 'rtl', fontFamily: 'Vazirmatn, sans-serif' }}
    >
      {/* ── Top nav ── */}
      {/* <header
        className="flex items-center justify-between px-6 py-0 border-b border-gray-200 flex-shrink-0"
        style={{ background: 'var(--navy)', minHeight: 52 }}
      > */}
        {/* Right: logo + org */}
        {/* <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-8 h-8 rounded"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          >
            <Building2 size={18} className="text-white" />
          </div>
          <div>
            <div className="text-white font-700 text-sm leading-tight">سازمان امور مالیاتی کشور</div>
            <div className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.55)' }}>
              سامانه یکپارچه مدیریت مغایرت‌ها
            </div>
          </div>
        </div> */}

        {/* Center: state switcher (demo controls) */}
        {/* <div className="flex items-center gap-1 bg-white/10 rounded px-2 py-1">
          <span className="text-xs text-white/60 ml-2">نمایش وضعیت:</span>
          {([
            ['default', 'پیش‌فرض'],
            ['province-selected', 'استان انتخاب‌شده'],
            ['drilldown', 'حفاری شهرستان'],
            ['empty', 'بدون داده'],
          ] as [DashboardState, string][]).map(([state, label]) => (
            <button
              key={state}
              onClick={() => {
                if (state === 'province-selected' || state === 'drilldown') {

                } else {
                  setSelectedProvince(null)
                }
                setDashState(state)
              }}
              className="text-xs px-2 py-0.5 rounded transition-colors"
              style={{
                background: dashState === state ? 'rgba(255,255,255,0.25)' : 'transparent',
                color: dashState === state ? 'white' : 'rgba(255,255,255,0.6)',
              }}
            >
              {label}
            </button>
          ))}
        </div> */}

        {/* Left: user actions */}
        {/* <div className="flex items-center gap-3">
          <button className="relative text-white/70 hover:text-white transition-colors">
            <Bell size={16} />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white" style={{ fontSize: 8 }}>۵</span>
          </button>
          <button className="text-white/70 hover:text-white transition-colors">
            <Settings size={16} />
          </button>
          <div className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <span className="text-xs">علی رضایی</span>
            <ChevronDown size={11} />
          </div>
        </div>
      </header> */}

      {/* ── Page title ── */}
      <div
        className="px-6 py-3 border-b border-gray-200 flex-shrink-0"
        style={{ background: '#f5f7fa' }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-base font-700 leading-tight" style={{ color: 'var(--navy)' }}>
              داشبورد مدیریتی مغایرت تراکنش‌های پرداخت، بانکی و حسابداری
            </h1>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              پایش، تحلیل، تطبیق و رسیدگی به مغایرت‌ها در سطوح ملی، استانی، شهرستانی و واحد مالیاتی
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {isEmpty && (
              <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2.5 py-1">
                <AlertTriangle size={12} />
                داده‌ای با فیلترهای انتخابی یافت نشد
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ── Main scrollable content ── */}
      <main className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">

        {/* 1. Filter panel */}
        <FilterPanel onApply={handleApplyFilter} onReset={handleReset} />

        {/* 2. KPI cards */}
        <KPICards isEmpty={isEmpty} />

        {/* 3. Analytics area: map + charts side by side */}
        <div className="grid gap-4" style={{ gridTemplateColumns: isEmpty ? '1fr' : '1fr 340px' }}>
          {/* Map center column */}
          <div style={{ minHeight: 420 }}>
            <MapArea
              selectedProvince={selectedProvince}
              drillDown={dashState === 'drilldown'}
              isEmpty={isEmpty}
              onSelectProvince={handleSelectProvince}
              onDrillDown={handleDrillDown}
              onBack={handleBack}
            />
          </div>

          {/* Charts right column */}
          {!isEmpty && (
            <div style={{ minHeight: 420 }}>
              <Charts isEmpty={isEmpty} />
            </div>
          )}
        </div>

        {/* Empty charts row when empty */}
        {isEmpty && (
          <div className="grid grid-cols-2 gap-3">
            {['نمودار نوع مؤدی', 'نمودار کانال پرداخت'].map((title, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-md p-4 flex flex-col items-center justify-center" style={{ minHeight: 140 }}>
                <div className="text-gray-200 text-3xl mb-2">📊</div>
                <p className="text-xs text-gray-400">{title}</p>
                <p className="text-xs text-gray-300 mt-1">بر اساس پارامترهای انتخابی، اطلاعاتی یافت نشد.</p>
              </div>
            ))}
          </div>
        )}

        {/* 4. Detailed report table */}
        <DataTable isEmpty={isEmpty} />


      </main>
    </div>
  )
}
