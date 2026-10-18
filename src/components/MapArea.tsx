// MapArea.tsx
// ---------------------------------------------------------------------------
// Provincial discrepancy map for Iran, rendered with Apache ECharts (map series
// + registerMap on a GeoJSON FeatureCollection). Supports selection, drill-down,
// hover tooltips, legend, and a right-side information panel.
// ---------------------------------------------------------------------------

import { useEffect, useMemo, useRef, useState } from 'react'
import * as echarts from 'echarts'
import type { FeatureCollection, MultiPolygon, GeoJsonProperties } from 'geojson'
import { ArrowRight, MapPin } from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from 'recharts'

// ===========================================================================
// 1. Types
// ===========================================================================

type Intensity = 'low' | 'medium' | 'high' | 'critical'

export interface Province {
  id: string
  name: string
  discrepancies: number
  intensity: Intensity
}

interface CountyDatum {
  name: string
  value: number
}

interface MapAreaProps {
  selectedProvince: Province | null
  drillDown: boolean
  isEmpty?: boolean
  onSelectProvince: (province: Province) => void
  onDrillDown: (province: Province) => void
  onBack: () => void
}

type ProvinceFeatureCollection = FeatureCollection<MultiPolygon, GeoJsonProperties>

interface IntensityStyle {
  fill: string
  stroke: string
  badge: string
  text: string
}

// ===========================================================================
// 2. Constants
// ===========================================================================

const GEOJSON_PATH = '/iran-provinces.geojson'
const MAP_NAME = 'iran'

const NEUTRAL_STYLE: IntensityStyle = {
  fill: '#e5e7eb',
  stroke: '#94a3b8',
  badge: '#f8fafc',
  text: '#475569',
}

const INTENSITY_STYLES: Record<Intensity, IntensityStyle> = {
  low: { fill: '#dbeafe', stroke: '#60a5fa', badge: '#eff6ff', text: '#1d4ed8' },
  medium: { fill: '#fde68a', stroke: '#f59e0b', badge: '#fffbeb', text: '#b45309' },
  high: { fill: '#fdba74', stroke: '#f97316', badge: '#fff7ed', text: '#c2410c' },
  critical: { fill: '#fca5a5', stroke: '#ef4444', badge: '#fef2f2', text: '#b91c1c' },
}

const INTENSITY_LABELS: Record<Intensity, string> = {
  low: 'کم',
  medium: 'متوسط',
  high: 'زیاد',
  critical: 'بحرانی',
}

const LEGEND_ITEMS: Array<{ label: string; color: string }> = [
  { label: INTENSITY_LABELS.low, color: INTENSITY_STYLES.low.fill },
  { label: INTENSITY_LABELS.medium, color: INTENSITY_STYLES.medium.fill },
  { label: INTENSITY_LABELS.high, color: INTENSITY_STYLES.high.fill },
  { label: INTENSITY_LABELS.critical, color: INTENSITY_STYLES.critical.fill },
]

const NAME_PROPERTY_KEYS = [
  'name',
  'NAME_1',
  'NAME_FA',
  'name_fa',
  'province',
  'prov_name',
  'ostan',
  'fa_name',
  'title',
] as const

const provinceMetrics: Province[] = [
  { id: 'tehran', name: 'تهران', discrepancies: 18400, intensity: 'critical' },
  { id: 'isfahan', name: 'اصفهان', discrepancies: 9200, intensity: 'high' },
  { id: 'fars', name: 'فارس', discrepancies: 7100, intensity: 'high' },
  { id: 'razavi-khorasan', name: 'خراسان رضوی', discrepancies: 8600, intensity: 'high' },
  { id: 'east-azarbaijan', name: 'آذربایجان شرقی', discrepancies: 5400, intensity: 'medium' },
  { id: 'west-azarbaijan', name: 'آذربایجان غربی', discrepancies: 4600, intensity: 'medium' },
  { id: 'alborz', name: 'البرز', discrepancies: 5100, intensity: 'medium' },
  { id: 'mazandaran', name: 'مازندران', discrepancies: 4300, intensity: 'medium' },
  { id: 'gilan', name: 'گیلان', discrepancies: 3900, intensity: 'medium' },
  { id: 'khuzestan', name: 'خوزستان', discrepancies: 6800, intensity: 'high' },
  { id: 'kerman', name: 'کرمان', discrepancies: 3500, intensity: 'medium' },
  { id: 'yazd', name: 'یزد', discrepancies: 2200, intensity: 'low' },
  { id: 'qom', name: 'قم', discrepancies: 2700, intensity: 'low' },
  { id: 'markazi', name: 'مرکزی', discrepancies: 2100, intensity: 'low' },
  { id: 'kurdistan', name: 'کردستان', discrepancies: 1900, intensity: 'low' },
  { id: 'hamedan', name: 'همدان', discrepancies: 1700, intensity: 'low' },
]

const countyDataMap: Record<string, CountyDatum[]> = {
  tehran: [
    { name: 'تهران', value: 7200 },
    { name: 'ری', value: 2800 },
    { name: 'شمیرانات', value: 2100 },
    { name: 'اسلامشهر', value: 1900 },
    { name: 'پردیس', value: 1600 },
    { name: 'پاکدشت', value: 1400 },
    { name: 'ورامین', value: 1400 },
  ],
  isfahan: [
    { name: 'اصفهان', value: 3200 },
    { name: 'کاشان', value: 1700 },
    { name: 'نجف‌آباد', value: 1300 },
    { name: 'خمینی‌شهر', value: 1100 },
    { name: 'شاهین‌شهر', value: 900 },
  ],
  fars: [
    { name: 'شیراز', value: 2900 },
    { name: 'مرودشت', value: 1500 },
    { name: 'لار', value: 1100 },
    { name: 'جهرم', value: 900 },
    { name: 'فسا', value: 700 },
  ],
  'razavi-khorasan': [
    { name: 'مشهد', value: 4100 },
    { name: 'نیشابور', value: 1600 },
    { name: 'سبزوار', value: 1200 },
    { name: 'تربت حیدریه', value: 900 },
    { name: 'قوچان', value: 800 },
  ],
}

const ALIAS_TO_PERSIAN: Record<string, string> = {
  Tehran: 'تهران',
  Teheran: 'تهران',
  Isfahan: 'اصفهان',
  Esfahan: 'اصفهان',
  Fars: 'فارس',
  'Razavi Khorasan': 'خراسان رضوی',
  'Khorasan Razavi': 'خراسان رضوی',
  'East Azerbaijan': 'آذربایجان شرقی',
  'East Azarbaijan': 'آذربایجان شرقی',
  'West Azerbaijan': 'آذربایجان غربی',
  'West Azarbaijan': 'آذربایجان غربی',
  Alborz: 'البرز',
  Mazandaran: 'مازندران',
  Gilan: 'گیلان',
  Khuzestan: 'خوزستان',
  Kerman: 'کرمان',
  Yazd: 'یزد',
  Qom: 'قم',
  Markazi: 'مرکزی',
  Kurdistan: 'کردستان',
  Hamadan: 'همدان',
  Hamedan: 'همدان',
  Ardabil: 'اردبیل',
  Ardebil: 'اردبیل',
  Zanjan: 'زنجان',
  Qazvin: 'قزوین',
  Semnan: 'سمنان',
  Golestan: 'گلستان',
  'North Khorasan': 'خراسان شمالی',
  'South Khorasan': 'خراسان جنوبی',
  Bushehr: 'بوشهر',
  Hormozgan: 'هرمزگان',
  Sistan: 'سیستان و بلوچستان',
  'Sistan and Baluchestan': 'سیستان و بلوچستان',
  Lorestan: 'لرستان',
  Luristan: 'لرستان',
  Kermanshah: 'کرمانشاه',
  Ilam: 'ایلام',
  Chaharmahal: 'چهارمحال و بختیاری',
  'Chaharmahal and Bakhtiari': 'چهارمحال و بختیاری',
  Kohgiluyeh: 'کهگیلویه و بویراحمد',
  'Kohgiluyeh and Boyer-Ahmad': 'کهگیلویه و بویراحمد',
}

// ===========================================================================
// 3. Utility functions
// ===========================================================================

function normalizeName(value: string): string {
  return value.trim().replace(/\u200c/g, ' ').replace(/\s+/g, ' ').toLowerCase()
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('fa-IR').format(value)
}

function readFeatureName(properties: GeoJsonProperties): string | null {
  if (!properties) return null
  for (const key of NAME_PROPERTY_KEYS) {
    const raw = properties[key]
    if (typeof raw === 'string' && raw.trim()) return raw.trim()
  }
  return null
}

function buildProvinceIndex(): Map<string, Province> {
  const persianToProvince = new Map<string, Province>()
  for (const province of provinceMetrics) {
    persianToProvince.set(normalizeName(province.name), province)
  }

  const index = new Map(persianToProvince)
  for (const [alias, persian] of Object.entries(ALIAS_TO_PERSIAN)) {
    const province = persianToProvince.get(normalizeName(persian))
    if (province) index.set(normalizeName(alias), province)
  }

  return index
}

// ===========================================================================
// 4. Sub-components
// ===========================================================================

function ProvincePanel({ province }: { province: Province }) {
  const countyRows = countyDataMap[province.id] ?? []
  const totalCounties = countyRows.length
  const avgPerCounty = totalCounties > 0 ? Math.round(province.discrepancies / totalCounties) : 0
  const colors = INTENSITY_STYLES[province.intensity]

  const stats: Array<{ label: string; val: number | string; isString?: boolean }> = [
    { label: 'تعداد مغایرت', val: province.discrepancies },
    { label: 'تعداد شهرستان', val: totalCounties },
    { label: 'میانگین شهرستانی', val: avgPerCounty },
    { label: 'وضعیت', val: INTENSITY_LABELS[province.intensity], isString: true },
  ]

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2 text-slate-900">
            <MapPin size={16} />
            <h3 className="text-sm font-bold">{province.name}</h3>
          </div>
          <p className="text-xs text-slate-500">خلاصه مغایرت‌های استان</p>
        </div>
        <span
          className="rounded-md px-2 py-1 text-xs font-medium"
          style={{ backgroundColor: colors.badge, color: colors.text }}
        >
          سطح {INTENSITY_LABELS[province.intensity]}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-md bg-slate-50 p-3">
            <div className="mb-1 text-xs text-slate-500">{stat.label}</div>
            <div className="text-base font-bold text-slate-900">
              {stat.isString ? stat.val : formatNumber(Number(stat.val))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===========================================================================
// 5. Main MapArea Component
// ===========================================================================

export default function MapArea({
  selectedProvince,
  drillDown,
  isEmpty = false,
  onSelectProvince,
  onDrillDown,
  onBack,
}: MapAreaProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const provinceIndex = useMemo(() => buildProvinceIndex(), [])

  // Keep callbacks in refs so the map effect does not re-run (and re-fetch /
  // dispose+re-init the chart) when the parent re-renders with new fn identities.
  const onSelectRef = useRef(onSelectProvince)
  const onDrillDownRef = useRef(onDrillDown)
  useEffect(() => {
    onSelectRef.current = onSelectProvince
    onDrillDownRef.current = onDrillDown
  }, [onSelectProvince, onDrillDown])

  useEffect(() => {
    // Only initialize when the map view is actually shown. In drill-down or
    // empty states the container div is not rendered.
    if (drillDown || isEmpty || !chartRef.current) return

    setLoading(true)
    setError(null)

    const chart = echarts.init(chartRef.current)
    chartInstance.current = chart

    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize)

    let disposed = false

    const fetchData = async () => {
      try {
        const response = await fetch(GEOJSON_PATH)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const geoJson = (await response.json()) as ProvinceFeatureCollection
        if (disposed) return

        echarts.registerMap(MAP_NAME, geoJson as any)

        const data = geoJson.features.map((feat) => {
          const name = readFeatureName(feat.properties)
          const province = name ? provinceIndex.get(normalizeName(name)) : undefined
          const style = province ? INTENSITY_STYLES[province.intensity] : NEUTRAL_STYLE
          return {
            name: province ? province.name : name ?? '',
            value: province ? province.discrepancies : 0,
            itemStyle: {
              areaColor: style.fill,
              borderColor: style.stroke,
              borderWidth: 0.8,
            },
            emphasis: {
              itemStyle: {
                areaColor: '#0f172a',
                borderColor: '#0f172a',
                borderWidth: 1.5,
              },
            },
            // Custom payload consumed by the click / dblclick handlers.
            provinceData: province,
          }
        })

        chart.setOption({
          tooltip: {
            show: true,
            formatter: (params: any) => {
              const pData = params.data?.provinceData as Province | undefined
              return pData
                ? `${pData.name}<br/>مغایرت: ${formatNumber(pData.discrepancies)}`
                : params.name
            },
          },
          series: [
            {
              type: 'map',
              map: MAP_NAME,
              roam: false,
              zoom: 1.2,
              emphasis: { label: { show: false } },
              data,
            },
          ],
        })

        chart.on('click', (params: any) => {
          const province = params.data?.provinceData as Province | undefined
          if (province) onSelectRef.current(province)
        })

        chart.on('dblclick', (params: any) => {
          const province = params.data?.provinceData as Province | undefined
          if (province) onDrillDownRef.current(province)
        })

        setLoading(false)
      } catch (e) {
        if (!disposed) {
          setError('خطا در بارگذاری نقشه')
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      disposed = true
      window.removeEventListener('resize', handleResize)
      chart.dispose()
      chartInstance.current = null
    }
  }, [drillDown, isEmpty, provinceIndex])

  // --- Render ---

  if (isEmpty) {
    return (
      <div className="flex h-[540px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">
        <p className="text-sm text-slate-500">اطلاعاتی یافت نشد.</p>
      </div>
    )
  }

  if (drillDown && selectedProvince) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              پراکندگی مغایرت شهرستان‌های {selectedProvince.name}
            </h3>
            <p className="mt-1 text-xs text-slate-500">دبل‌کلیک روی استان برای بازگشت.</p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            <ArrowRight size={16} />
            بازگشت
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
          <div className="h-[420px] rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={countyDataMap[selectedProvince.id] ?? []}
                margin={{ top: 20, right: 16, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip formatter={(val) => formatNumber(Number(val))} />
                <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ProvincePanel province={selectedProvince} />
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">نقشه مغایرت‌های استانی</h3>
            <p className="mt-1 text-xs text-slate-500">کلیک: انتخاب | دبل‌کلیک: جزئیات شهرستان</p>
          </div>
          <div className="flex gap-2">
            {LEGEND_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-1 text-[10px]">
                <span
                  className="h-3 w-3 rounded-sm border"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Container is always mounted so chartRef.current exists when the
            effect runs. Loading / error states are overlaid, not swapped in. */}
        <div className="relative h-[440px]">
          {error && (
            <div className="absolute inset-0 flex items-center justify-center text-rose-500">
              {error}
            </div>
          )}
          {loading && !error && (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              در حال بارگذاری...
            </div>
          )}
          <div
            ref={chartRef}
            className="h-full w-full"
            style={{ visibility: loading || error ? 'hidden' : 'visible' }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {selectedProvince ? (
          <ProvincePanel province={selectedProvince} />
        ) : (
          <div className="rounded-lg border border-dashed p-4 text-sm text-slate-400">
            نشانگر را روی استان ببرید.
          </div>
        )}
      </div>
    </div>
  )
}
