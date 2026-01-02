const redStr = (str) => /*html*/ `<span class="red">${str}</span>`

const ls = {
  get: (key) => localStorage.getItem(key),
  set: (key, value) => localStorage.setItem(key, value),
}
