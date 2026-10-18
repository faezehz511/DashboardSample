Design a full-page Persian RTL enterprise management dashboard for a government tax discrepancy monitoring and reconciliation system.

This dashboard is for internal use in a formal government financial/tax platform. The interface must be highly structured, administrative, data-dense, readable, and suitable for expert users and managers. Use a clean enterprise accounting system style with compact spacing, subtle borders, white cards, light gray background, and dark navy / gray color palette. Typography should be similar to IRANSans or Vazirmatn. All labels, section titles, table headers, filter labels, and messages must be in Persian. The entire interface must be RTL.

Create the design as a desktop full-page dashboard with these sections:
1. Page header and title
2. Advanced top filter area
3. KPI summary cards
4. Main analytical dashboard area with central Iran map placeholder
5. Analytical charts around the map
6. Selected province summary panel
7. Drill-down state for counties after double click
8. Detailed report table at the bottom
9. Empty state design when no data is available

PAGE TITLE:
"داشبورد مدیریتی مغایرت تراکنش‌های پرداخت، بانکی و حسابداری"

Optional subtitle:
"پایش، تحلیل، تطبیق و رسیدگی به مغایرت‌ها در سطوح ملی، استانی، شهرستانی و واحد مالیاتی"

TOP FILTER AREA:
Create a large, structured, multi-section advanced filter panel at the top of the page. This filter area is very important and must look complete, enterprise-grade, and implementation-ready.

Filters are grouped by category. Required filters must be visually marked as mandatory.

Required filter groups:
1. اطلاعات زمانی*
   - سال مالی *
   - دوره مالی *

2. اطلاعات سازمانی*
   - کشور *
   - استان *
   - شهرستان *
   - اداره کل سازمان مالیاتی *
   - واحد مالیاتی *

Additional optional filter groups:
3. اطلاعات مؤدی
   - شناسه ملی / کد ملی مؤدی
   - نوع مؤدی
   - نام مؤدی
   - شماره پرونده

4. اطلاعات پرداخت
   - شناسه پرداخت
   - شماره تراکنش
   - شماره مرجع
   - شماره پیگیری
   - مبلغ پرداخت از
   - مبلغ پرداخت تا
   - تاریخ پرداخت از
   - تاریخ پرداخت تا
   - روش پرداخت
   - کانال پرداخت
   - درگاه پرداخت

5. اطلاعات مالیاتی
   - منبع مالیاتی

6. اطلاعات مغایرت
   - وضعیت مغایرت
   - منبع مغایرت
   - سطح اهمیت
   - وضعیت رسیدگی
   - مسئول رسیدگی

7. اطلاعات حسابداری
   - شماره سند حسابداری
   - وضعیت سند
   - نوع سند
   - تاریخ ثبت سند از
   - تاریخ ثبت سند تا

Filter panel requirements:
- Show grouped filter sections with clear Persian section headers
- Required filters must have visible mandatory markers
- Use enterprise dropdowns, text inputs, date pickers, and range fields
- Support cascading organizational filters
- Show buttons:
  - "اعمال فیلتر"
  - "بازنشانی"
  - "خروجی اکسل"
- Optionally include:
  - "جستجوی پیشرفته"
  - "بستن/باز کردن فیلترها"
- Make the filter area compact but complete, suitable for dense government back-office usage

KPI SUMMARY CARDS:
Below the filters, create a row or grid of executive KPI cards for the main report indicators. Use compact white cards with thin borders, strong numbers, and Persian labels.

Include these KPIs:
- تعداد کل تراکنش‌ها
- تعداد تراکنش‌های تطبیق‌یافته
- تعداد تراکنش‌های دارای مغایرت
- تعداد مغایرت‌های باز
- تعداد مغایرت‌های منطبق شده
- نرخ مغایرت
- مبلغ کل تراکنش‌ها
- درصد مبلغ مغایرت
- مبلغ کل مغایرت‌ها
- مبلغ مغایرت‌های باز
- مبلغ مغایرت‌های منطبق شده

MAIN ANALYTICAL AREA:
Create a large central analytics area. The center of the page must contain a map area for Iran.

Important implementation note:
Do NOT create a real geographic Iran map.
Instead, design a professional smart placeholder showing where the real map will be mounted at implementation time using a GeoJSON file.

Map placeholder requirements:
- Large center panel labeled:
  "Iran Map / GeoJSON Mount Point"
- Persian implementation note inside or below it:
  "نقشه واقعی ایران در زمان پیاده‌سازی از طریق فایل GeoJSON بارگذاری می‌شود"
- Include abstract clickable province-like regions, not real geographic shapes
- These regions must look interactive and implementation-ready
- Show visual states for:
  - default
  - hover
  - selected
  - double-click drill-down
- Add a tooltip placeholder for province hover
- Add a color legend placeholder for choropleth intensity based on discrepancy count
- Add a developer annotation:
  "Province paths replaced at runtime from GeoJSON"

MAP INTERACTIONS TO REPRESENT VISUALLY:
- Single click on a province shows a selected province summary panel
- Double click on a province replaces the country-level view with a county-level distribution chart
- Show a clear back button:
  "بازگشت به نقشه ایران"

SELECTED PROVINCE SUMMARY PANEL:
Design a compact side panel or card for selected province details. It should display sample summary information such as:
- استان
- تعداد کل تراکنش‌ها
- تعداد تراکنش‌های دارای مغایرت
- تعداد مغایرت‌های باز
- تعداد مغایرت‌های منطبق شده
- نرخ مغایرت
- مبلغ کل مغایرت‌ها
- مبلغ مغایرت‌های باز
- مبلغ مغایرت‌های منطبق شده

ANALYTICAL CHARTS AROUND THE MAP:
Arrange compact dashboard charts around the map, balanced on both sides. These charts must include:

1. تعداد مغایرت‌ها بر اساس نوع مؤدی
   Categories:
   - اتباع
   - حقیقی
   - حقوقی

2. مبلغ مغایرت‌ها بر اساس نوع مؤدی
   Categories:
   - اتباع
   - حقیقی
   - حقوقی

3. تعداد مغایرت‌ها بر اساس منبع مالیاتی

4. تعداد مغایرت‌ها بر اساس کانال پرداخت

5. تعداد مغایرت‌ها بر اساس وضعیت مغایرت‌گیری
   Categories:
   - باز
   - منطبق

6. Monthly line chart for discrepancy amount distribution:
   - میانگین مبلغ
   - حداقل مبلغ
   - حداکثر مبلغ

7. Monthly line chart for:
   - مجموع مبالغ مغایرت ماهانه

Chart style requirements:
- Compact formal widgets
- White cards with thin borders
- Persian titles and legends
- Suitable for enterprise analytical use
- Use bar charts, donut charts, and line charts where appropriate
- Avoid decorative consumer-style charts

DRILL-DOWN STATE:
Create a second visual state for when the user double-clicks on a province.

In this drill-down state:
- Replace the national Iran map placeholder with a county-level histogram or bar chart
- Title:
  "پراکندگی مغایرت‌ها بر اساس شهرستان"
- Keep surrounding charts and KPI cards visible
- Keep the selected province context visible
- Show the back button:
  "بازگشت به نقشه ایران"

DETAILED REPORT TABLE:
At the bottom of the page, create a large RTL enterprise report table with grouped headers and many columns. The table should look like a formal government reporting grid, dense and horizontally scrollable.

The report can include the following grouped columns:

1. اطلاعات عمومی
- ردیف
- شناسه مغایرت
- وضعیت مغایرت
- سطح اهمیت
- تاریخ ایجاد مغایرت
- آخرین تاریخ به‌روزرسانی

2. اطلاعات مؤدی
- شناسه ملی مؤدی
- نام مؤدی
- شماره پرونده

3. اطلاعات پرداخت
- شناسه پرداخت
- شماره تراکنش
- شماره پیگیری
- شماره مرجع
- مبلغ پرداخت
- تاریخ پرداخت
- روش پرداخت
- کانال پرداخت

4. اطلاعات بانکی
- شماره حساب
- شماره صورتحساب
- تاریخ صورتحساب
- مبلغ ثبت‌شده در بانک

5. اطلاعات حسابداری
- شماره سند حسابداری
- تاریخ سند
- مبلغ ثبت‌شده در حسابداری
- وضعیت سند

6. اطلاعات مغایرت
- نوع مغایرت
- علت مغایرت
- مبلغ مغایرت
- اختلاف تاریخ
- اختلاف مبلغ
- اختلاف شناسه
- اختلاف شماره مرجع
- اختلاف شماره پیگیری

7. اطلاعات سازمانی
- استان
- شهرستان
- اداره کل
- واحد مالیاتی

8. اطلاعات مالیاتی
- منبع مالیاتی

9. اطلاعات رسیدگی
- مسئول رسیدگی
- تاریخ رسیدگی
- نتیجه رسیدگی

10. اطلاعات کنترلی
- کاربر ایجادکننده
- تاریخ ثبت
- آخرین کاربر ویرایش‌کننده
- زمان آخرین ویرایش
- شناسه اجرای گزارش

TABLE UX REQUIREMENTS:
- Grouped column headers
- Sticky table header
- Dense enterprise rows
- RTL layout
- Horizontally scrollable
- Key columns visible in default view
- Use a realistic report-grid layout

Default key visible columns:
- شناسه مغایرت
- وضعیت مغایرت
- سطح اهمیت
- نام مؤدی
- مبلغ مغایرت
- استان
- شهرستان
- تاریخ ایجاد مغایرت

NO-DATA EMPTY STATE:
Design a polished empty state for all major sections when no data exists for the selected filters.

Use this exact Persian message:
"بر اساس پارامترهای انتخابی، اطلاعاتی یافت نشد."

Show this empty state in:
- map area
- chart cards
- detailed table area

VISUAL STYLE:
- Full desktop enterprise dashboard
- Persian RTL
- Formal administrative interface
- Light gray page background
- White cards and panels
- Thin gray borders
- Dark navy primary color
- Gray secondary text
- Controlled green, amber, and red status colors
- High readability
- Compact and information-dense layout
- Suitable for managers, auditors, financial operators, and discrepancy investigation teams

IMPORTANT DESIGN INTENT:
The dashboard must feel like a real government tax and accounting control system, not a marketing dashboard.
The central map must clearly look like a GeoJSON mount-ready placeholder and not like a missing image.
The filter panel must be rich and detailed, with required fields clearly visible.
The table must reflect the complexity of a real discrepancy report.
The design should support national-to-province-to-county drill-down analysis.

Generate these screens/states:
1. Main dashboard default state
2. Province selected state
3. Province double-click drill-down state
4. No-data state

Ensure visual consistency across all states.
