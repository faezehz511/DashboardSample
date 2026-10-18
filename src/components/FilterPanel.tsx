import { useState } from 'react'
import { ChevronDown, ChevronUp, Search, RotateCcw, FileSpreadsheet, Filter , Save } from 'lucide-react'

interface FilterPanelProps {
  onApply: () => void
  onReset: () => void
}

const Select = ({ placeholder, required }: { placeholder: string; required?: boolean }) => (
  <div className="relative">
    <select
      className="w-full h-8 px-2 pr-7 text-xs border border-gray-300 rounded bg-white text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      style={{ direction: 'rtl' }}
    >
      <option value="">{placeholder}</option>
    </select>
    <ChevronDown size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    {required && (
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 text-xs font-bold">*</span>
    )}
  </div>
)

const Input = ({ placeholder }: { placeholder: string }) => (
  <input
    type="text"
    placeholder={placeholder}
    className="w-full h-8 px-2 text-xs border border-gray-300 rounded bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
    style={{ direction: 'rtl' }}
  />
)

const DateInput = ({ placeholder }: { placeholder: string }) => (
  <input
    type="text"
    placeholder={placeholder}
    className="w-full h-8 px-2 text-xs border border-gray-300 rounded bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono"
    style={{ direction: 'rtl' }}
  />
)

interface SectionProps {
  title: string
  required?: boolean
  children: React.ReactNode
  defaultOpen?: boolean
}

const FilterSection = ({ title, required, children, defaultOpen = true }: SectionProps) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="filter-group">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-600 text-gray-700 hover:bg-gray-50 rounded-t"
        style={{ direction: 'rtl' }}
      >
        <span className="flex items-center gap-1">
          {title}
          {required && <span className="text-red-500 font-bold text-xs">*</span>}
        </span>
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>
      {open && <div className="px-3 pb-3 pt-1">{children}</div>}
    </div>
  )
}

export default function FilterPanel({ onApply, onReset }: FilterPanelProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm" style={{ direction: 'rtl' }}>
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-navy" style={{ color: 'var(--navy)' }} />
          <span className="text-sm font-600 text-gray-800">فیلترهای جستجو</span>
          <span className="text-xs text-red-500 border border-red-200 bg-red-50 px-1.5 py-0.5 rounded">
            * فیلدهای اجباری
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          {expanded ? (
            <><ChevronUp size={12} />بستن فیلترها</>
          ) : (
            <><ChevronDown size={12} />باز کردن فیلترها</>
          )}
        </button>
      </div>

      {expanded && (
        <div className="p-3">
          {/* 7-column grid for filter groups */}
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>

            {/* 1. اطلاعات زمانی */}
            <FilterSection title="اطلاعات زمانی" required defaultOpen>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    سال مالی <span className="text-red-500">*</span>
                  </label>
                  <Select placeholder="انتخاب سال" required />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    دوره مالی <span className="text-red-500">*</span>
                  </label>
                  <Select placeholder="انتخاب دوره" required />
                </div>
              </div>
            </FilterSection>

            {/* 2. اطلاعات سازمانی */}
            <FilterSection title="اطلاعات سازمانی" required defaultOpen>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    کشور <span className="text-red-500">*</span>
                  </label>
                  <Select placeholder="ایران" required />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    استان <span className="text-red-500">*</span>
                  </label>
                  <Select placeholder="انتخاب استان" required />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    شهرستان <span className="text-red-500">*</span>
                  </label>
                  <Select placeholder="انتخاب شهرستان" required />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    اداره کل <span className="text-red-500">*</span>
                  </label>
                  <Select placeholder="انتخاب اداره کل" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">
                    واحد مالیاتی <span className="text-red-500">*</span>
                  </label>
                  <Select placeholder="انتخاب واحد مالیاتی" required />
                </div>
              </div>
            </FilterSection>

            {/* 3. اطلاعات مؤدی */}
            <FilterSection title="اطلاعات مؤدی" defaultOpen={false}>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">شناسه / کد ملی مؤدی</label>
                  <Input placeholder="شناسه یا کد ملی" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">نوع مؤدی</label>
                  <Select placeholder="همه" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">نام مؤدی</label>
                  <Input placeholder="جستجوی نام" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">شماره پرونده</label>
                  <Input placeholder="شماره پرونده" />
                </div>
              </div>
            </FilterSection>

            {/* 4. اطلاعات پرداخت */}
            <FilterSection title="اطلاعات پرداخت" defaultOpen={false}>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">شناسه پرداخت</label>
                  <Input placeholder="شناسه پرداخت" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">شماره تراکنش</label>
                  <Input placeholder="شماره تراکنش" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">شماره مرجع</label>
                  <Input placeholder="شماره مرجع" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">شماره پیگیری</label>
                  <Input placeholder="شماره پیگیری" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">مبلغ پرداخت از</label>
                  <Input placeholder="از مبلغ (ریال)" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">مبلغ پرداخت تا</label>
                  <Input placeholder="تا مبلغ (ریال)" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">تاریخ پرداخت از</label>
                  <DateInput placeholder="۱۴۰۳/۰۱/۰۱" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">تاریخ پرداخت تا</label>
                  <DateInput placeholder="۱۴۰۳/۱۲/۲۹" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">روش پرداخت</label>
                  <Select placeholder="همه روش‌ها" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">کانال پرداخت</label>
                  <Select placeholder="همه کانال‌ها" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">درگاه پرداخت</label>
                  <Select placeholder="همه درگاه‌ها" />
                </div>
              </div>
            </FilterSection>

            {/* 5 & 6. مالیاتی و مغایرت */}
            <FilterSection title="اطلاعات مالیاتی و مغایرت" defaultOpen={false}>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">منبع مالیاتی</label>
                  <Select placeholder="همه منابع" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">وضعیت مغایرت</label>
                  <Select placeholder="همه وضعیت‌ها" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">منبع مغایرت</label>
                  <Select placeholder="منبع مغایرت" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">سطح اهمیت</label>
                  <Select placeholder="همه سطوح" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">وضعیت رسیدگی</label>
                  <Select placeholder="همه وضعیت‌ها" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">مسئول رسیدگی</label>
                  <Input placeholder="نام مسئول" />
                </div>
              </div>
            </FilterSection>

            {/* 7. اطلاعات حسابداری */}
            <FilterSection title="اطلاعات حسابداری" defaultOpen={false}>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">شماره سند حسابداری</label>
                  <Input placeholder="شماره سند" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">وضعیت سند</label>
                  <Select placeholder="همه وضعیت‌ها" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">نوع سند</label>
                  <Select placeholder="همه انواع" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">تاریخ ثبت از</label>
                  <DateInput placeholder="۱۴۰۳/۰۱/۰۱" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">تاریخ ثبت تا</label>
                  <DateInput placeholder="۱۴۰۳/۱۲/۲۹" />
                </div>
              </div>
            </FilterSection>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200 justify-end">
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <RotateCcw size={12} />
              بازنشانی
            </button>
            <button
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs border border-green-600 rounded text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
            >
              <FileSpreadsheet size={12} />
              خروجی اکسل
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Search size={12} />
              بازخوانی فیلتر
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-blue-600 rounded text-blue-700 bg-blue-50 hover:bg-gray-50 transition-colors"
            >
              <Save size={12} />
             ذخیره فیلتر
            </button>
            <button
              onClick={onApply}
              className="flex items-center gap-1.5 px-5 py-1.5 text-xs rounded text-white transition-colors"
              style={{ background: 'var(--navy)' }}
            >
              <Filter size={12} />
              اعمال فیلتر
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
