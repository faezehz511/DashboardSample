import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronsUpDown,
  Filter,
  RotateCcw,
  Search,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Status = 'open' | 'matched' | 'pending'
type Severity = 'critical' | 'high' | 'medium' | 'low'
type DocStatus = 'confirmed' | 'draft' | 'pending'

interface TableRow {
  row: number
  discrepancyId: string
  status: Status
  severity: Severity
  createdDate: string
  updatedDate: string
  nationalId: string
  taxpayerName: string
  fileNo: string
  paymentId: string
  transactionNo: string
  trackingNo: string
  referenceNo: string
  paymentAmount: string
  paymentDate: string
  paymentMethod: string
  channel: string
  accountNo: string
  bankAmount: string
  accountingDocNo: string
  docDate: string
  accountingAmount: string
  docStatus: DocStatus
  discrepancyType: string
  discrepancyCause: string
  discrepancyAmount: string
  province: string
  county: string
  taxSource: string
  handler: string
}
const nonFilterableGroupIds = new Set(['tax', 'review'])
const tableData: TableRow[] = Array.from({ length: 15 }, (_, i) => ({
  row: i + 1,
  discrepancyId: `MG-${String(140300000 + i * 1337).slice(-7)}`,
  status: i % 3 === 0 ? 'open' : i % 3 === 1 ? 'matched' : 'pending',
  severity:
    i % 4 === 0 ? 'critical' : i % 4 === 1 ? 'high' : i % 4 === 2 ? 'medium' : 'low',
  createdDate: `۱۴۰۳/${String(Math.floor(i / 2) + 1).padStart(2, '0')}/${String(
    ((i * 3 + 5) % 28) + 1,
  ).padStart(2, '0')}`,
  updatedDate: `۱۴۰۳/${String(Math.floor(i / 2) + 2).padStart(2, '0')}/${String(
    ((i * 2 + 10) % 28) + 1,
  ).padStart(2, '0')}`,
  nationalId: `${String(10000000000 + i * 321654987).slice(-10)}`,
  taxpayerName: [
    'شرکت صنعتی ایران‌خودرو',
    'محمد رضایی',
    'شرکت پتروشیمی البرز',
    'فاطمه احمدی',
    'شرکت فولاد مبارکه',
  ][i % 5],
  fileNo: `PR-${String(1402000 + i * 7).padStart(7, '0')}`,
  paymentId: `PAY-${String(98000000 + i * 1234).slice(-8)}`,
  transactionNo: `TRX${String(20000000 + i * 9871).slice(-8)}`,
  trackingNo: `TRK-${String(70000000 + i * 4321).slice(-8)}`,
  referenceNo: `REF${String(30000000 + i * 8765).slice(-8)}`,
  paymentAmount: (1500000 + i * 234567).toLocaleString('fa-IR'),
  paymentDate: `۱۴۰۳/${String(Math.floor(i / 3) + 1).padStart(2, '0')}/${String(
    ((i * 5 + 3) % 28) + 1,
  ).padStart(2, '0')}`,
  paymentMethod: ['پایا', 'ساتنا', 'کارت به کارت', 'اینترنت بانک', 'ATM'][i % 5],
  channel: ['اینترنتی', 'بانکی', 'ATM', 'شعبه', 'POS'][i % 5],
  accountNo: `IR${String(220000000000000 + i * 112233445566).slice(-24)}`,
  bankAmount: (
    1500000 +
    i * 234567 +
    (i % 2 === 0 ? 50000 : 0)
  ).toLocaleString('fa-IR'),
  accountingDocNo: `SND-${String(4000000 + i * 333).padStart(7, '0')}`,
  docDate: `۱۴۰۳/${String(Math.floor(i / 2) + 1).padStart(2, '0')}/${String(
    ((i * 4 + 8) % 28) + 1,
  ).padStart(2, '0')}`,
  accountingAmount: (
    1500000 +
    i * 234567 +
    (i % 3 === 0 ? -30000 : 0)
  ).toLocaleString('fa-IR'),
  docStatus: i % 3 === 0 ? 'confirmed' : i % 3 === 1 ? 'draft' : 'pending',
  discrepancyType: ['مبلغی', 'تاریخی', 'شناسه‌ای', 'مرجعی', 'ترکیبی'][i % 5],
  discrepancyCause: [
    'عدم تطابق مبلغ',
    'تأخیر در ثبت',
    'اشتباه شناسه',
    'مغایرت مرجع',
    'خطای سیستمی',
  ][i % 5],
  discrepancyAmount: (50000 + i * 12345).toLocaleString('fa-IR'),
  province: ['تهران', 'اصفهان', 'خراسان رضوی', 'فارس', 'آذربایجان شرقی'][i % 5],
  county: [
    'شهرستان مرکزی',
    'شهرستان اول',
    'شهرستان دوم',
    'شهرستان سوم',
    'شهرستان چهارم',
  ][i % 5],
  taxSource: ['ارزش افزوده', 'عملکرد', 'تکلیفی', 'مستقیم', 'سایر'][i % 5],
  handler: ['علی محمدی', 'زهرا کریمی', 'رضا اکبری', 'مریم حسینی', 'احمد رضایی'][i % 5],
}))

const statusBadge = (status: Status) => {
  const map: Record<Status, [string, string]> = {
    open: ['badge-open', 'باز'],
    matched: ['badge-matched', 'منطبق'],
    pending: ['badge-pending', 'در انتظار'],
  }
  const [className, label] = map[status]
  return <span className={`${className} px-1.5 py-0.5 rounded text-xs font-500`}>{label}</span>
}

const severityBadge = (severity: Severity) => {
  const map: Record<Severity, [string, string]> = {
    critical: ['badge-critical', 'بحرانی'],
    high: ['badge-high', 'بالا'],
    medium: ['badge-medium', 'متوسط'],
    low: ['badge-low', 'پایین'],
  }
  const [className, label] = map[severity]
  return <span className={`${className} px-1.5 py-0.5 rounded text-xs font-500`}>{label}</span>
}

const docStatusBadge = (status: DocStatus) => {
  const map: Record<DocStatus, [string, string]> = {
    confirmed: ['badge-matched', 'تأییدشده'],
    draft: ['badge-pending', 'پیش‌نویس'],
    pending: ['badge-open', 'در انتظار'],
  }
  const [className, label] = map[status]
  return <span className={`${className} px-1.5 py-0.5 rounded text-xs font-500`}>{label}</span>
}

type FilterType = 'text' | 'select' | 'number-range' | 'date-range'

interface FilterColumn {
  key: keyof TableRow
  label: string
  type: FilterType
  options?: Array<{ value: string; label: string }>
}

interface FilterGroup {
  id: string
  label: string
  color: string
  columns: FilterColumn[]
}

const options = <T extends string>(values: T[]) => values.map((value) => ({ value, label: value }))

const filterGroups: FilterGroup[] = [
  {
    id: 'general',
    label: 'اطلاعات عمومی',
    color: '#1a2744',
    columns: [
      { key: 'row', label: 'ردیف', type: 'number-range' },
      { key: 'discrepancyId', label: 'شناسه مغایرت', type: 'text' },
      { key: 'status', label: 'وضعیت', type: 'select', options: options(['open', 'matched', 'pending']) },
      { key: 'severity', label: 'اهمیت', type: 'select', options: options(['critical', 'high', 'medium', 'low']) },
      { key: 'createdDate', label: 'تاریخ ایجاد', type: 'date-range' },
      { key: 'updatedDate', label: 'آخرین بروز', type: 'date-range' },
    ],
  },
  {
    id: 'taxpayer',
    label: 'اطلاعات مؤدی',
    color: '#1e3a5f',
    columns: [
      { key: 'nationalId', label: 'شناسه ملی', type: 'text' },
      { key: 'taxpayerName', label: 'نام مؤدی', type: 'text' },
      { key: 'fileNo', label: 'شماره پرونده', type: 'text' },
    ],
  },
  {
    id: 'payment',
    label: 'اطلاعات پرداخت',
    color: '#1a4074',
    columns: [
      { key: 'paymentId', label: 'شناسه پرداخت', type: 'text' },
      { key: 'transactionNo', label: 'شماره تراکنش', type: 'text' },
      { key: 'trackingNo', label: 'شماره پیگیری', type: 'text' },
      { key: 'referenceNo', label: 'شماره مرجع', type: 'text' },
      { key: 'paymentAmount', label: 'مبلغ پرداخت', type: 'number-range' },
      { key: 'paymentDate', label: 'تاریخ پرداخت', type: 'date-range' },
      { key: 'paymentMethod', label: 'روش پرداخت', type: 'select', options: options(['پایا', 'ساتنا', 'کارت به کارت', 'اینترنت بانک', 'ATM']) },
      { key: 'channel', label: 'کانال', type: 'select', options: options(['اینترنتی', 'بانکی', 'ATM', 'شعبه', 'POS']) },
    ],
  },
  {
    id: 'bank',
    label: 'اطلاعات بانکی',
    color: '#1e3a5f',
    columns: [
      { key: 'accountNo', label: 'شماره حساب', type: 'text' },
      { key: 'bankAmount', label: 'مبلغ بانک', type: 'number-range' },
    ],
  },
  {
    id: 'accounting',
    label: 'اطلاعات حسابداری',
    color: '#1a2744',
    columns: [
      { key: 'accountingDocNo', label: 'شماره سند', type: 'text' },
      { key: 'docDate', label: 'تاریخ سند', type: 'date-range' },
      { key: 'accountingAmount', label: 'مبلغ حسابداری', type: 'number-range' },
      { key: 'docStatus', label: 'وضعیت سند', type: 'select', options: options(['confirmed', 'draft', 'pending']) },
    ],
  },
  {
    id: 'discrepancy',
    label: 'اطلاعات مغایرت',
    color: '#7f1d1d',
    columns: [
      { key: 'discrepancyType', label: 'نوع مغایرت', type: 'select', options: options(['مبلغی', 'تاریخی', 'شناسه‌ای', 'مرجعی', 'ترکیبی']) },
      { key: 'discrepancyCause', label: 'علت مغایرت', type: 'select', options: options(['عدم تطابق مبلغ', 'تأخیر در ثبت', 'اشتباه شناسه', 'مغایرت مرجع', 'خطای سیستمی']) },
      { key: 'discrepancyAmount', label: 'مبلغ مغایرت', type: 'number-range' },
    ],
  },
  {
    id: 'organization',
    label: 'اطلاعات سازمانی',
    color: '#1a2744',
    columns: [
      { key: 'province', label: 'استان', type: 'select', options: options(['تهران', 'اصفهان', 'خراسان رضوی', 'فارس', 'آذربایجان شرقی']) },
      { key: 'county', label: 'شهرستان', type: 'select', options: options(['شهرستان مرکزی', 'شهرستان اول', 'شهرستان دوم', 'شهرستان سوم', 'شهرستان چهارم']) },
    ],
  },
  {
    id: 'tax',
    label: 'مالیاتی',
    color: '#1e3a5f',
    columns: [
      { key: 'taxSource', label: 'منبع مالیاتی', type: 'select', options: options(['ارزش افزوده', 'عملکرد', 'تکلیفی', 'مستقیم', 'سایر']) },
    ],
  },
  {
    id: 'review',
    label: 'رسیدگی',
    color: '#1a4074',
    columns: [
      { key: 'handler', label: 'مسئول رسیدگی', type: 'select', options: options(['علی محمدی', 'زهرا کریمی', 'رضا اکبری', 'مریم حسینی', 'احمد رضایی']) },
    ],
  },
]

type RangeValue = { min?: string; max?: string }
type FilterValue = string | RangeValue
type FilterState = Partial<Record<keyof TableRow, FilterValue>>

const toEnglishDigits = (value: string) =>
  value.replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))

const normalizeText = (value: unknown) => String(value ?? '').trim().toLocaleLowerCase('fa-IR')

const normalizeNumber = (value: unknown) => {
  const normalized = toEnglishDigits(String(value ?? ''))
    .replace(/[٬،,]/g, '')
    .replace(/[^\d.-]/g, '')
  return Number(normalized) || 0
}

const normalizeDate = (value: unknown) =>
  toEnglishDigits(String(value ?? '')).replace(/\D/g, '').padStart(8, '0')

const isRangeValue = (value: FilterValue): value is RangeValue =>
  typeof value === 'object' && value !== null

const isFilterActive = (value: FilterValue | undefined) => {
  if (!value) return false
  return isRangeValue(value) ? Boolean(value.min || value.max) : Boolean(value)
}

const countActiveFilters = (filters: FilterState) =>
  Object.values(filters).filter(isFilterActive).length

const getGroupActiveFilterCount = (group: FilterGroup, filters: FilterState) =>
  group.columns.reduce((count, column) => count + (isFilterActive(filters[column.key]) ? 1 : 0), 0)

const getFieldValue = (filters: FilterState, key: keyof TableRow): FilterValue =>
  filters[key] ?? ''

interface FilterFieldProps {
  column: FilterColumn
  value: FilterValue
  onChange: (value: FilterValue) => void
}

function FilterField({ column, value, onChange }: FilterFieldProps) {
  const range = isRangeValue(value) ? value : {}
  const wide = column.type === 'number-range' || column.type === 'date-range'

  const baseInput =
    'w-full min-w-0 max-w-full h-9 rounded-md border border-gray-300 bg-white text-xs text-gray-700 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'

  return (
    <div className={`min-w-0 w-full ${wide ? 'col-span-full' : 'col-span-1'}`}>
      <label className="block min-w-0 text-[11px] font-600 text-gray-700 mb-1.5 truncate">
        {column.label}
      </label>

      {column.type === 'text' && (
        <div className="relative min-w-0 w-full">
          <input
            value={typeof value === 'string' ? value : ''}
            onChange={(event) => onChange(event.target.value)}
            placeholder={`جستجو در ${column.label}`}
            className={`${baseInput} pr-8 pl-3`}
          />
          <Search size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      )}

      {column.type === 'select' && (
        <div className="relative min-w-0 w-full">
          <select
            value={typeof value === 'string' ? value : ''}
            onChange={(event) => onChange(event.target.value)}
            className={`${baseInput} appearance-none pr-3 pl-8`}
          >
            <option value="">همه</option>
            {column.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      )}

      {column.type === 'number-range' && (
        <div className="grid grid-cols-2 gap-2 min-w-0 w-full">
          {(['min', 'max'] as const).map((key) => (
            <input
              key={key}
              type="text"
              inputMode="numeric"
              value={range[key] ?? ''}
              onChange={(event) => onChange({ ...range, [key]: event.target.value })}
              placeholder={key === 'min' ? 'از' : 'تا'}
              className={`${baseInput} px-3`}
            />
          ))}
        </div>
      )}

      {column.type === 'date-range' && (
        <div className="grid grid-cols-2 gap-2 min-w-0 w-full">
          {(['min', 'max'] as const).map((key) => (
            <div key={key} className="relative min-w-0">
              <input
                type="text"
                value={range[key] ?? ''}
                onChange={(event) => onChange({ ...range, [key]: event.target.value })}
                placeholder={key === 'min' ? 'از تاریخ' : 'تا تاریخ'}
                className={`${baseInput} pr-3 pl-8`}
              />
              <CalendarDays size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface FilterPopoverProps {
  group: FilterGroup
  filters: FilterState
  onChange: (key: keyof TableRow, value: FilterValue) => void
  onApply: () => void
  onClear: () => void
  onClose: () => void
  anchorRect: DOMRect
}

function FilterPopover({
  group,
  filters,
  onChange,
  onApply,
  onClear,
  onClose,
  anchorRect,
}: FilterPopoverProps) {
  const [popoverWidth, setPopoverWidth] = useState(anchorRect.width)
  const popoverRef = useRef<HTMLDivElement>(null)
  const viewportPadding = 8

  useEffect(() => {
    const updateWidth = () => {
      setPopoverWidth(
        Math.max(
          0,
          Math.min(anchorRect.width, window.innerWidth - viewportPadding * 2),
        ),
      )
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [anchorRect.width])

  const left = Math.max(
    viewportPadding,
    Math.min(
      anchorRect.left,
      window.innerWidth - popoverWidth - viewportPadding,
    ),
  )

  return createPortal(
    <div
      ref={popoverRef}
      className="fixed z-[9999] min-w-0"
      style={{
        left,
        top: anchorRect.top,
        width: popoverWidth,
        maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
        transform: 'translateY(-100%)',
      }}
      dir="rtl"
    >
      <div className="relative w-full min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl">
        <div
          className="absolute -bottom-[7px] left-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border-r border-b border-gray-200 bg-white"
          aria-hidden="true"
        />

        <div className="flex min-w-0 items-start justify-between gap-2 border-b border-gray-200 bg-white px-3 py-3">
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-700 text-gray-800">فیلتر {group.label}</div>
            <div className="mt-1 truncate text-[10px] text-gray-400">
              فیلتر بر اساس ستون‌های این گروه
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="بستن"
          >
            <X size={15} />
          </button>
        </div>

        <div className="max-h-[390px] min-w-0 w-full overflow-y-auto overflow-x-hidden p-3">
          <div
            className="grid min-w-0 w-full grid-cols-1 gap-x-3 gap-y-4"
            style={{
              gridTemplateColumns:
                popoverWidth >= 360 ? 'repeat(2, minmax(0, 1fr))' : 'minmax(0, 1fr)',
            }}
          >
            {group.columns.map((column) => (
              <FilterField
                key={String(column.key)}
                column={column}
                value={getFieldValue(filters, column.key)}
                onChange={(value) => onChange(column.key, value)}
              />
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-t border-gray-200 bg-gray-50 px-3 py-3">
          <button
            type="button"
            onClick={onClear}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800"
          >
            <RotateCcw size={12} />
            پاک کردن
          </button>

          <div className="flex min-w-0 flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-600 transition-colors hover:bg-gray-100"
            >
              انصراف
            </button>

            <button
              type="button"
              onClick={onApply}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-blue-600 px-4 py-1.5 text-xs font-600 text-white transition-colors hover:bg-blue-700"
            >
              <Check size={13} />
              اعمال فیلتر
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

interface Props {
  isEmpty?: boolean
}

const columns: Array<{ key: keyof TableRow; label: string }> = [
  { key: 'row', label: 'ردیف' },
  { key: 'discrepancyId', label: 'شناسه مغایرت' },
  { key: 'status', label: 'وضعیت' },
  { key: 'severity', label: 'اهمیت' },
  { key: 'createdDate', label: 'تاریخ ایجاد' },
  { key: 'updatedDate', label: 'آخرین بروز' },
  { key: 'nationalId', label: 'شناسه ملی' },
  { key: 'taxpayerName', label: 'نام مؤدی' },
  { key: 'fileNo', label: 'شماره پرونده' },
  { key: 'paymentId', label: 'شناسه پرداخت' },
  { key: 'transactionNo', label: 'شماره تراکنش' },
  { key: 'trackingNo', label: 'شماره پیگیری' },
  { key: 'referenceNo', label: 'شماره مرجع' },
  { key: 'paymentAmount', label: 'مبلغ پرداخت' },
  { key: 'paymentDate', label: 'تاریخ پرداخت' },
  { key: 'paymentMethod', label: 'روش پرداخت' },
  { key: 'channel', label: 'کانال' },
  { key: 'accountNo', label: 'شماره حساب' },
  { key: 'bankAmount', label: 'مبلغ بانک' },
  { key: 'accountingDocNo', label: 'شماره سند' },
  { key: 'docDate', label: 'تاریخ سند' },
  { key: 'accountingAmount', label: 'مبلغ حسابداری' },
  { key: 'docStatus', label: 'وضعیت سند' },
  { key: 'discrepancyType', label: 'نوع مغایرت' },
  { key: 'discrepancyCause', label: 'علت مغایرت' },
  { key: 'discrepancyAmount', label: 'مبلغ مغایرت' },
  { key: 'province', label: 'استان' },
  { key: 'county', label: 'شهرستان' },
  { key: 'taxSource', label: 'منبع مالیاتی' },
  { key: 'handler', label: 'مسئول رسیدگی' },
]

function renderCell(row: TableRow, key: keyof TableRow) {
  switch (key) {
    case 'status':
      return statusBadge(row.status)
    case 'severity':
      return severityBadge(row.severity)
    case 'docStatus':
      return docStatusBadge(row.docStatus)
    case 'accountNo':
      return `${row.accountNo.slice(0, 16)}...`
    default:
      return row[key]
  }
}

export default function DataTable({ isEmpty }: Props) {
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({})
  const [draftFilters, setDraftFilters] = useState<FilterState>({})
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)
  const [pageSize, setPageSize] = useState(15)
  const [currentPage, setCurrentPage] = useState(1)

  const groupButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const closePopover = () => {
    setActiveGroupId(null)
    setAnchorRect(null)
  }

  const updateAnchorRect = () => {
    if (!activeGroupId) return
    const button = groupButtonRefs.current[activeGroupId]
    if (button) setAnchorRect(button.getBoundingClientRect())
  }

  const openGroup = (group: FilterGroup) => {
    if (activeGroupId === group.id) {
      closePopover()
      return
    }

    const button = groupButtonRefs.current[group.id]
    if (!button) return

    setDraftFilters({ ...appliedFilters })
    setActiveGroupId(group.id)
    setAnchorRect(button.getBoundingClientRect())
  }

  useEffect(() => {
    if (!activeGroupId) return

    window.addEventListener('resize', updateAnchorRect)
    window.addEventListener('scroll', updateAnchorRect, true)

    return () => {
      window.removeEventListener('resize', updateAnchorRect)
      window.removeEventListener('scroll', updateAnchorRect, true)
    }
  }, [activeGroupId])

  useEffect(() => {
    if (!activeGroupId) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePopover()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [activeGroupId])

  const updateDraftFilter = (key: keyof TableRow, value: FilterValue) => {
    setDraftFilters((previous) => ({ ...previous, [key]: value }))
  }

  const applyFilters = () => {
    const next = { ...draftFilters }

    Object.entries(next).forEach(([key, value]) => {
      if (!isFilterActive(value)) delete next[key as keyof TableRow]
    })

    setAppliedFilters(next)
    setCurrentPage(1)
    closePopover()
  }

  const clearCurrentGroup = () => {
    if (!activeGroupId) return

    const group = filterGroups.find((item) => item.id === activeGroupId)
    if (!group) return

    const next = { ...appliedFilters }
    group.columns.forEach((column) => delete next[column.key])

    setAppliedFilters(next)
    setDraftFilters(next)
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setAppliedFilters({})
    setDraftFilters({})
    setCurrentPage(1)
    closePopover()
  }

  const filteredData = useMemo(() => {
    return tableData.filter((row) =>
      Object.entries(appliedFilters).every(([key, filter]) => {
        const rowValue = row[key as keyof TableRow]
        if (!filter || !isFilterActive(filter)) return true

        if (isRangeValue(filter)) {
          const min = filter.min?.trim()
          const max = filter.max?.trim()
          if (!min && !max) return true

          const isDateField = ['createdDate', 'updatedDate', 'paymentDate', 'docDate'].includes(key)

          if (isDateField) {
            const current = normalizeDate(rowValue)
            const minDate = min ? normalizeDate(min) : ''
            const maxDate = max ? normalizeDate(max) : ''
            if (minDate && current < minDate) return false
            if (maxDate && current > maxDate) return false
            return true
          }

          const current = normalizeNumber(rowValue)
          const minNumber = min ? normalizeNumber(min) : null
          const maxNumber = max ? normalizeNumber(max) : null
          if (minNumber !== null && current < minNumber) return false
          if (maxNumber !== null && current > maxNumber) return false
          return true
        }

        return normalizeText(rowValue).includes(normalizeText(filter))
      }),
    )
  }, [appliedFilters])

  const totalRows = filteredData.length
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize))
  const safePage = Math.min(currentPage, totalPages)

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  const visibleRows = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, safePage, pageSize])

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-16" dir="rtl">
        <div className="mb-3 text-4xl text-gray-200">📋</div>
        <p className="text-sm font-500 text-gray-400">بر اساس پارامترهای انتخابی، اطلاعاتی یافت نشد.</p>
        <p className="mt-1 text-xs text-gray-300">لطفاً فیلترها را بررسی و مجدداً اعمال نمایید.</p>
      </div>
    )
  }

  const activeGroup = activeGroupId
    ? filterGroups.find((group) => group.id === activeGroupId) ?? null
    : null

  const visibleFrom = totalRows === 0 ? 0 : (safePage - 1) * pageSize + 1
  const visibleTo = Math.min(safePage * pageSize, totalRows)
  const activeFilterCount = countActiveFilters(appliedFilters)

  return (
    <div className="overflow-hidden rounded-md border border-gray-200 bg-white" dir="rtl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="truncate text-sm font-600 text-gray-800">گزارش تفصیلی مغایرت‌ها</span>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-[11px] text-blue-700 transition-colors hover:bg-blue-100"
            >
              <Filter size={12} />
              {activeFilterCount.toLocaleString('fa-IR')} فیلتر فعال
              <X size={11} />
            </button>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3 text-xs text-gray-500">
          <span>
            نمایش {visibleFrom.toLocaleString('fa-IR')} تا {visibleTo.toLocaleString('fa-IR')} از{' '}
            {totalRows.toLocaleString('fa-IR')} ردیف
          </span>

          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value))
              setCurrentPage(1)
            }}
            className="rounded border border-gray-300 bg-white px-1.5 py-1 text-xs text-gray-700 focus:outline-none"
          >
            <option value={15}>۱۵ ردیف</option>
            <option value={25}>۲۵ ردیف</option>
            <option value={50}>۵۰ ردیف</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: 420 }}>
        <table
          className="w-full text-xs sticky-header"
          style={{ minWidth: 2400, borderCollapse: 'collapse' }}
        >
          <thead>
            <tr>
              {filterGroups.map((group) => {
                const hasFilter = !nonFilterableGroupIds.has(group.id)
                const activeCount = hasFilter
                  ? getGroupActiveFilterCount(group, appliedFilters)
                  : 0
                const isOpen = hasFilter && activeGroupId === group.id

                return (
                  <th
                    key={group.id}
                    colSpan={group.columns.length}
                    className={`border-l border-white/20 px-1 py-1 text-center text-xs font-600 text-white ${
                      isOpen ? 'relative z-[10000]' : ''
                    }`}
                    style={{
                      background: group.color,
                      position: 'relative',
                      boxShadow: isOpen ? 'inset 0 0 0 1px rgba(255,255,255,0.30)' : undefined,
                    }}
                  >
                    <button
                      ref={(element) => {
                        groupButtonRefs.current[group.id] = element
                      }}
                      type="button"
                      onClick={hasFilter ? () => openGroup(group) : undefined}
                      disabled={!hasFilter}
                      className={`flex min-h-[28px] w-full items-center justify-center gap-1.5 rounded-md px-2 py-1 transition-colors ${
                        hasFilter
                          ? isOpen
                            ? 'bg-white/20'
                            : 'hover:bg-white/10'
                          : 'cursor-default'
                      }`}
                    >
                      <span className="min-w-0 truncate">{group.label}</span>

                      {activeCount > 0 && (
                        <span className="flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-full bg-white px-1 text-[10px] font-700 text-gray-800">
                          {activeCount.toLocaleString('fa-IR')}
                        </span>
                      )}

                      {hasFilter && (
                        isOpen ? <Filter size={12} /> : <ChevronDown size={12} />
                      )}
                    </button>
                  </th>
                )
              })}
            </tr>

            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap border-b border-l border-gray-200 px-2 py-2 text-right font-600 text-gray-600"
                  style={{
                    background: '#f8fafc',
                    position: 'sticky',
                    top: '36px',
                    zIndex: 10,
                  }}
                >
                  <div className="flex items-center justify-end gap-1">
                    {column.label}
                    <ChevronsUpDown size={9} className="text-gray-400" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-14 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Search size={30} className="mb-3 text-gray-300" />
                    <p className="text-sm font-500">نتیجه‌ای برای فیلترهای انتخاب‌شده یافت نشد.</p>
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-50"
                    >
                      <RotateCcw size={12} />
                      پاک کردن همه فیلترها
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              visibleRows.map((row, index) => (
                <tr
                  key={row.discrepancyId}
                  className="border-b border-gray-100 transition-colors hover:bg-blue-50/50"
                  style={{ background: index % 2 === 0 ? 'white' : '#fafbfd' }}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`border-l border-gray-100 px-2 py-2 ${
                        ['row', 'status', 'severity', 'docStatus'].includes(column.key)
                          ? ''
                          : 'whitespace-nowrap'
                      }`}
                    >
                      {renderCell(row, column.key)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-500">
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            disabled={safePage === 1}
            onClick={() => setCurrentPage(1)}
            className="rounded border border-gray-300 px-2 py-1 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            اول
          </button>

          <button
            type="button"
            disabled={safePage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            className="rounded border border-gray-300 px-2 py-1 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            قبلی
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
            if (totalPages <= 5) return index + 1
            if (safePage <= 3) return index + 1
            if (safePage >= totalPages - 2) return totalPages - 4 + index
            return safePage - 2 + index
          }).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`rounded border px-2 py-1 transition-colors ${
                page === safePage
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              {page.toLocaleString('fa-IR')}
            </button>
          ))}

          <button
            type="button"
            disabled={safePage === totalPages}
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            className="rounded border border-gray-300 px-2 py-1 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            بعدی
          </button>

          <button
            type="button"
            disabled={safePage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className="rounded border border-gray-300 px-2 py-1 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            آخر
          </button>
        </div>

        <span>
          مجموع: {totalRows.toLocaleString('fa-IR')} ردیف — صفحه {safePage.toLocaleString('fa-IR')} از{' '}
          {totalPages.toLocaleString('fa-IR')}
        </span>
      </div>

      {activeGroup && anchorRect && (
        <FilterPopover
          group={activeGroup}
          filters={draftFilters}
          anchorRect={anchorRect}
          onChange={updateDraftFilter}
          onApply={applyFilters}
          onClear={clearCurrentGroup}
          onClose={closePopover}
        />
      )}
    </div>
  )
}