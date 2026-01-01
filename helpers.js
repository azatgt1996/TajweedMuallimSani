const redStr = (str) => /*html*/ `<span class="red">${str}</span>`
const $ = (selectors) => document.querySelector(selectors)

const ls = {
  get: (key) => localStorage.getItem(key),
  set: (key, value) => localStorage.setItem(key, value),
}
