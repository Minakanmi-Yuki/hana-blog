interface ActivityDay {
  date: string
  count: number
  level: number
}

interface ActivityData {
  contributions: ActivityDay[]
  total: { lastYear: number }
}

const DAY = 86_400_000
const CACHE_TTL = 6 * 60 * 60 * 1000
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function normalizeData(raw: unknown): ActivityData {
  const data = raw as Partial<ActivityData> | null
  if (!Array.isArray(data?.contributions)) throw new Error('Invalid GitHub activity data')

  const contributions = data.contributions
    .filter(
      (day) =>
        typeof day?.date === 'string' &&
        /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
        Number.isFinite(Date.parse(`${day.date}T00:00:00Z`))
    )
    .map((day) => ({
      date: day.date,
      count: Number.isFinite(day.count) ? Math.max(0, day.count) : 0,
      level: Number.isFinite(day.level) ? Math.min(4, Math.max(0, Math.trunc(day.level))) : 0
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-400)

  if (contributions.length === 0) throw new Error('Empty GitHub activity data')
  const total = data?.total?.lastYear
  return {
    contributions,
    total: {
      lastYear:
        typeof total === 'number' && Number.isFinite(total)
          ? total
          : contributions.reduce((sum, day) => sum + day.count, 0)
    }
  }
}

class GitHubActivityCalendar extends HTMLElement {
  private initialized = false

  connectedCallback() {
    if (this.initialized) return
    this.initialized = true

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return
          observer.disconnect()
          void this.load()
        },
        { rootMargin: '200px' }
      )
      observer.observe(this)
    } else {
      void this.load()
    }
  }

  private async load() {
    const username = this.dataset.username
    const chart = this.querySelector<HTMLElement>('[data-activity-chart]')
    if (!username || !chart) return

    const key = `github-activity:v1:${username}`
    let cached: { timestamp: number; data: ActivityData } | undefined
    try {
      const stored = JSON.parse(localStorage.getItem(key) || 'null')
      if (stored && typeof stored.timestamp === 'number') {
        cached = { timestamp: stored.timestamp, data: normalizeData(stored.data) }
        this.render(cached.data)
        const age = Date.now() - cached.timestamp
        if (age >= 0 && age < CACHE_TTL) return
      }
    } catch {
      // Storage may be unavailable; the calendar can still load directly.
    }

    this.setAttribute('aria-busy', 'true')
    if (!cached) chart.textContent = 'Loading GitHub activity…'
    try {
      const response = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
        { signal: AbortSignal.timeout(8000) }
      )
      if (!response.ok) throw new Error(`GitHub activity request failed: ${response.status}`)
      const data = normalizeData(await response.json())
      this.render(data)
      try {
        localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }))
      } catch {
        // Cache writes are optional in private browsing or with a full quota.
      }
    } catch {
      if (!cached) chart.textContent = 'GitHub activity is temporarily unavailable.'
    } finally {
      this.setAttribute('aria-busy', 'false')
    }
  }

  private render(data: ActivityData) {
    const chart = this.querySelector<HTMLElement>('[data-activity-chart]')
    const summary = this.querySelector<HTMLElement>('[data-activity-total]')
    if (!chart || !summary) return

    const dates = data.contributions
    const end = Date.parse(`${dates[dates.length - 1].date}T00:00:00Z`)
    const start = Math.max(Date.parse(`${dates[0].date}T00:00:00Z`), end - 399 * DAY)
    const firstSunday = start - new Date(start).getUTCDay() * DAY
    const weekCount = Math.ceil(((end - firstSunday) / DAY + 1) / 7)
    const calendar = new Map(dates.map((day) => [day.date, day]))
    const labels: string[] = []
    const weeks: string[] = []
    let previousMonth = -1

    for (let week = 0; week < weekCount; week++) {
      const cells: string[] = []
      for (let day = 0; day < 7; day++) {
        const timestamp = firstSunday + (week * 7 + day) * DAY
        if (timestamp < start || timestamp > end) continue
        const date = new Date(timestamp)
        const iso = date.toISOString().slice(0, 10)
        if (cells.length === 0 && date.getUTCMonth() !== previousMonth) {
          previousMonth = date.getUTCMonth()
          labels.push(
            `<text x="${week * 16}" y="0" dominant-baseline="hanging" fill="currentColor">${MONTHS[previousMonth]}</text>`
          )
        }
        const activity = calendar.get(iso) ?? { date: iso, count: 0, level: 0 }
        cells.push(
          `<rect x="0" y="${22 + day * 16}" width="12" height="12" rx="2" ry="2" data-date="${iso}" data-level="${activity.level}"><title>${activity.count} contributions on ${iso}</title></rect>`
        )
      }
      weeks.push(`<g transform="translate(${week * 16},0)">${cells.join('')}</g>`)
    }

    // SVG text is generated only from fixed labels, validated dates, and finite numbers.
    const width = weekCount * 16 - 4
    chart.classList.remove('flex')
    chart.innerHTML = `<svg class="block" width="${width}" height="130" viewBox="0 0 ${width} 130" role="img" aria-label="GitHub contribution calendar">${labels.join('')}${weeks.join('')}</svg>`
    chart.removeAttribute('role')
    const year = new Date(start).getUTCFullYear()
    summary.textContent = `${data.total.lastYear} contributions in ${year} ~ ${year + 1}`
  }
}

if (!customElements.get('github-activity-calendar')) {
  customElements.define('github-activity-calendar', GitHubActivityCalendar)
}
