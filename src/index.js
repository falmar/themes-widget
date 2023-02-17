import builder from './builder.js'

const ENDPOINT = 'https://api.staging.heycarson.com'

const initialOptions = {
  element: null,
  apiKey: null,
  developer: '',
  darkMode: false
}

class ThemesWidget {
  constructor (options = {}) {
    this.options = { ...initialOptions, ...options }

    this.developer = null
  }

  async render () {
    if (!(this.options.element instanceof Element)) {
      throw new Error('options.element: HTMLElement is required')
    }

    if (!this.developer) {
      this.developer = (
        await fetch(`${ENDPOINT}/v1/themes/developers/${this.options.developer}`).then(res => res.json())
      )
    }

    builder(this.options.element, {
      developer: this.developer,
      dark: this.options.darkMode
    })
  }

  destroy () {
    if (!this.options.element || !this.options.element.childNodes.length) {
      return
    }

    this.options.element.removeChild(this.options.element.childNodes[0])
  }
}

export default ThemesWidget
