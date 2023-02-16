import "./main.css";

const $8b83a3ea098f8f5b$var$logoImgLight = "https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-light.svg";
const $8b83a3ea098f8f5b$var$logoImgDark = "https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-dark.svg";
const $8b83a3ea098f8f5b$var$starImg = "https://carson-themes.s3.amazonaws.com/assets/heycarson-star.svg";
const $8b83a3ea098f8f5b$var$DEVELOPER_PAGE = "https://heycarson.com/themes/developer/";
const $8b83a3ea098f8f5b$var$buildLogo = ({ dark: dark  })=>{
    const logoContainer = document.createElement("div");
    const logo = document.createElement("img");
    logoContainer.classList.add("hc-developer-widget__logo-container");
    logo.classList.add("hc-developer-widget__logo");
    logo.setAttribute("src", dark ? $8b83a3ea098f8f5b$var$logoImgDark : $8b83a3ea098f8f5b$var$logoImgLight);
    logoContainer.appendChild(logo);
    return logoContainer;
};
const $8b83a3ea098f8f5b$var$buildStar = ({ rating: rating , dark: dark  })=>{
    const starContainer = document.createElement("div");
    const star = document.createElement("img");
    const rate = document.createElement("span");
    starContainer.classList.add("hc-developer-widget__star-container");
    star.classList.add("hc-developer-widget__star");
    rate.classList.add("hc-developer-widget__rating");
    rate.classList.toggle("hc-developer-widget__rating--dark", dark);
    star.setAttribute("src", $8b83a3ea098f8f5b$var$starImg);
    rate.innerText = `${rating} / 5`;
    starContainer.appendChild(star);
    starContainer.appendChild(rate);
    return starContainer;
};
const $8b83a3ea098f8f5b$var$buildReviews = ({ developer: developer , reviews: reviews , dark: dark  })=>{
    const reviewContainer = document.createElement("div");
    const based = document.createElement("span");
    const review = document.createElement("a");
    reviewContainer.classList.add("hc-developer-widget__review-container");
    based.classList.add("hc-developer-widget__based");
    based.classList.toggle("hc-developer-widget__based--dark", dark);
    review.classList.add("hc-developer-widget__review");
    review.classList.toggle("hc-developer-widget__review--dark", dark);
    based.innerText = "Based on";
    review.innerText = `${reviews} reviews`;
    review.setAttribute("href", $8b83a3ea098f8f5b$var$DEVELOPER_PAGE + developer);
    review.setAttribute("target", "_blank");
    review.setAttribute("rel", "noopener");
    reviewContainer.appendChild(based);
    reviewContainer.appendChild(review);
    return reviewContainer;
};
function $8b83a3ea098f8f5b$export$2e2bcd8739ae039(element, options = {}) {
    const container = document.createElement("div");
    container.classList.add("hc-developer-widget");
    container.classList.toggle("hc-developer-widget--dark", options.dark);
    container.appendChild($8b83a3ea098f8f5b$var$buildLogo({
        dark: options.dark
    }));
    container.appendChild($8b83a3ea098f8f5b$var$buildStar({
        rating: Number(options.developer.review_rating || optionns.developer.overall_rating || 0).toFixed(1),
        dark: options.dark
    }));
    container.appendChild($8b83a3ea098f8f5b$var$buildReviews({
        developer: options.developer.slug,
        reviews: options.developer.review_count,
        dark: options.dark
    }));
    element.appendChild(container);
}



const $cf838c15c8b009ba$var$ENDPOINT = "https://api.staging.heycarson.com";
const $cf838c15c8b009ba$var$initialOptions = {
    element: null,
    apiKey: null,
    developer: "",
    darkMode: false
};
class $cf838c15c8b009ba$var$ThemesWidget {
    constructor(options = {}){
        this.options = {
            ...$cf838c15c8b009ba$var$initialOptions,
            ...options
        };
        this.developer = null;
    }
    async render() {
        if (!(this.options.element instanceof Element)) throw new Error("options.element: HTMLElement is required");
        if (!this.developer) this.developer = await fetch(`${$cf838c15c8b009ba$var$ENDPOINT}/v1/themes/developers/${this.options.developer}`).then((res)=>res.json());
        (0, $8b83a3ea098f8f5b$export$2e2bcd8739ae039)(this.options.element, {
            developer: this.developer,
            dark: this.options.darkMode
        });
    }
    destroy() {
        if (!this.options.element || !this.options.element.childNodes.length) return;
        this.options.element.removeChild(this.options.element.childNodes[0]);
    }
}
var $cf838c15c8b009ba$export$2e2bcd8739ae039 = $cf838c15c8b009ba$var$ThemesWidget;


export {$cf838c15c8b009ba$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=main.js.map
