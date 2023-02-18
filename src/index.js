import builder, { changeWidget, checkSize } from './builder.js'

const initialOptions = {
  endpoint: 'https://api.heycarson.com',
  element: null,
  apiKey: null,
  developer: '',
  darkMode: false
}

const fetchDeveloper = async (endpoint, dev) => {
  return await fetch(`${endpoint}/v1/themes/developers/${dev}`)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }

      if (res.status === 404) {
        return null
      }

      const body = res.json()

      throw new Error('Something went wrong' + (body?.message ? `: ${body.message}` : ''))
    })
}

class ThemesWidget {
  constructor (options = {}) {
    this.options = { ...initialOptions, ...options }

    this.developer = null

    this.container = null
    this.viewportHandler = null
    this.observerTimeout = null

    this.observer = new ResizeObserver(entries => {
      clearTimeout(this.observerTimeout)

      if (!entries.length) {
        return
      }

      const { width } = entries[0].contentRect

      this.observerTimeout = setTimeout(() => {
        checkSize(this.container, width)
      }, 100)
    })
  }

  async render (options = {}) {
    if (!(this.options.element instanceof Element)) {
      throw new Error('options.element: HTMLElement is required')
    }

    this.options = { ...initialOptions, ...this.options, ...options, element: this.options.element }

    if (this.developer?.slug !== this.options.developer) {
      this.developer = await fetchDeveloper(this.options.endpoint, this.options.developer)
    }

    if (!this.developer) {
      throw new Error('Developer not found')
    }

    let rating = Number(this.developer.review_rating || this.developer.overall_rating || 0)
    rating = rating.toFixed(Math.floor(rating) === rating ? 0 : 1)

    if (!this.container) {
      this.container = builder(this.options.element, {
        rating,
        developer: this.developer.slug,
        dark: this.options.darkMode,
        reviews: this.developer.review_count
      })

      this.observer.observe(this.container)
    } else {
      changeWidget(this.container, {
        rating,
        developer: this.developer.slug,
        dark: this.options.darkMode,
        reviews: this.developer.review_count
      })
    }
  }

  destroy () {
    if (!this.options.element || !this.options.element.childNodes.length) {
      return
    }

    this.observer.disconnect()

    this.container.removeEventListener('resize', this.viewportHandler)

    this.options.element.removeChild(this.container)
  }
}

export default ThemesWidget
