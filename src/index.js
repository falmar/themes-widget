import builder, { changeWidget } from './builder.js'

const ENDPOINT = 'https://api.staging.heycarson.com'

const initialOptions = {
  element: null,
  apiKey: null,
  developer: '',
  darkMode: false
}

const fetchDeveloper = async dev => {
  return await fetch(`${ENDPOINT}/v1/themes/developers/${dev}`)
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
  }

  async render (options = {}) {
    if (!(this.options.element instanceof Element)) {
      throw new Error('options.element: HTMLElement is required')
    }

    this.options = { ...initialOptions, ...this.options, ...options, element: this.options.element }

    if (this.developer?.slug !== this.options.developer) {
      this.developer = await fetchDeveloper(this.options.developer)
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

    this.container.removeEventListener('resize', this.viewportHandler)

    this.options.element.removeChild(this.container)
  }
}

export default ThemesWidget
