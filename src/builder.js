const logoImgLight = 'https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-light.svg'
const logoImgDark = 'https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-dark.svg'
const starImg = 'https://carson-themes.s3.amazonaws.com/assets/heycarson-star.svg'

const THEMES_PAGE = 'https://heycarson.com/themes'
const DEVELOPER_PAGE = 'https://heycarson.com/themes/developer/'
const smallBreakpoint = 410
const containerPadding = 32

export const checkSize = (container, width) => {
  const isSmall = width <= smallBreakpoint - containerPadding

  container
    .classList.toggle('hc-developer-widget--small', isSmall)
  container
    .querySelector('.hc-developer-widget__logo-container')
    .classList.toggle('hc-developer-widget__logo-container--small', isSmall)
  container
    .querySelector('.hc-developer-widget__star-container')
    .classList.toggle('hc-developer-widget__star-container--small', isSmall)
  container
    .querySelector('.hc-developer-widget__review-container')
    .classList.toggle('hc-developer-widget__review-container--small', isSmall)
}

export const changeWidget = (container, { dark, rating, reviews, developer } = {}) => {
  container
    .classList.toggle('hc-developer-widget--dark', dark)
  container
    .querySelector('.hc-developer-widget__logo')
    .setAttribute('src', dark ? logoImgDark : logoImgLight)
  container
    .querySelector('.hc-developer-widget__based')
    .classList.toggle('hc-developer-widget__based--dark', dark)

  const ratingEl = container.querySelector('.hc-developer-widget__rating')
  ratingEl.innerText = `${rating} / 5`
  ratingEl.classList.toggle('hc-developer-widget__rating--dark', dark)

  const reviewEl = container.querySelector('.hc-developer-widget__review')
  reviewEl.innerText = reviews === 1 ? '1 review' : `${reviews} reviews`
  reviewEl.setAttribute('href', `${DEVELOPER_PAGE}${developer}`)
  reviewEl.classList.toggle('hc-developer-widget__review--dark', dark)
}

const buildLogo = ({ dark }) => {
  const logoContainer = document.createElement('a')
  const logo = document.createElement('img')

  logoContainer.setAttribute('href', THEMES_PAGE + '?wgl=1')
  logoContainer.setAttribute('target', '_blank')
  logoContainer.setAttribute('rel', 'noopener')
  logoContainer.classList.add('hc-developer-widget__logo-container')
  logo.classList.add('hc-developer-widget__logo')
  logo.setAttribute('src', dark ? logoImgDark : logoImgLight)

  logoContainer.appendChild(logo)

  return logoContainer
}

const buildStar = ({ rating, dark }) => {
  const starContainer = document.createElement('div')
  const star = document.createElement('img')
  const rate = document.createElement('span')

  starContainer.classList.add('hc-developer-widget__star-container')
  star.classList.add('hc-developer-widget__star')
  rate.classList.add('hc-developer-widget__rating')
  rate.classList.toggle('hc-developer-widget__rating--dark', dark)

  star.setAttribute('src', starImg)
  rate.innerText = `${rating} / 5`

  starContainer.appendChild(star)
  starContainer.appendChild(rate)

  return starContainer
}

const buildReviews = ({ developer, reviews, dark }) => {
  const reviewContainer = document.createElement('div')
  const based = document.createElement('span')
  const review = document.createElement('a')

  reviewContainer.classList.add('hc-developer-widget__review-container')

  based.classList.add('hc-developer-widget__based')
  based.classList.toggle('hc-developer-widget__based--dark', dark)
  review.classList.add('hc-developer-widget__review')
  review.classList.toggle('hc-developer-widget__review--dark', dark)

  based.innerText = 'Based on'

  review.innerText = `${reviews} reviews`
  review.setAttribute('href', DEVELOPER_PAGE + developer + '?wgl=1')
  review.setAttribute('target', '_blank')
  review.setAttribute('rel', 'noopener')

  reviewContainer.appendChild(based)
  reviewContainer.appendChild(review)

  return reviewContainer
}

export default function builder (element, options = {}) {
  const container = document.createElement('div')

  container.classList.add('hc-developer-widget')
  container.classList.toggle('hc-developer-widget--dark', options.dark)

  container.appendChild(buildLogo({ dark: options.dark }))
  container.appendChild(buildStar({
    rating: options.rating,
    dark: options.dark
  }))
  container.appendChild(buildReviews({
    developer: options.developer,
    reviews: options.reviews,
    dark: options.dark
  }))

  element.appendChild(container)

  return container
}
