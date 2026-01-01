const redStr = (str) => /*html*/ `<span class="red">${str}</span>`
const $ = (selectors) => document.querySelector(selectors)
const $$ = (selectors) => document.querySelectorAll(selectors)
const $cl = (selectors) => $(selectors).classList
const $toggleVisible = (selectors, isVisible) => {
  $(selectors).style.display = isVisible ? 'block' : 'none'
}

const ls = {
  get: (key) => localStorage.getItem(key),
  set: (key, value) => localStorage.setItem(key, value),
}
