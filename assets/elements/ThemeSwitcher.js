import { isAuthenticated } from '/functions/auth.js'
import { jsonFetchOrFlash } from '/functions/api.js'

export class ThemeSwitcher extends HTMLElement {
  connectedCallback () {
    this.classList.add('theme-switcher')
    this.innerHTML = `
        <input type="checkbox" is="input-switch" id="theme-switcher" aria-label="Changer de thème">
        <label for="theme-switcher">
          <svg class="icon icon-moon">
            <use xlink:href="/sprite.svg#moon"></use>
          </svg>
          <svg class="icon icon-sun">
            <use xlink:href="/sprite.svg#sun"></use>
          </svg>
        </label>`
    const input = this.querySelector('input')
    input.addEventListener('change', e => {
      const themeToRemove = e.currentTarget.checked ? 'light' : 'dark'
      const themeToAdd = e.currentTarget.checked ? 'dark' : 'light'
      document.body.classList.add(`theme-${themeToAdd}`)
      document.body.classList.remove(`theme-${themeToRemove}`)
      if (!isAuthenticated()) {
        localStorage.setItem('theme', themeToAdd)
      } else {
        jsonFetchOrFlash('/api/profil/theme', {
          body: { theme: themeToAdd },
          method: 'POST'
        }).catch(console.error)
      }
    })

    // On lit le theme utilisateur
    if (!isAuthenticated()) {
      const savedTheme = localStorage.getItem('theme')
      // Si l'utilisateur n'a pas déjà de préférence
      if (savedTheme === null) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        input.checked = mq.matches
      } else {
        document.body.classList.add(`theme-${savedTheme}`)
        input.checked = savedTheme === 'dark'
      }
    } else {
      input.checked = document.body.classList.contains('theme-dark')
    }
  }
}
