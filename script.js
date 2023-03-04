const codeEls = document.querySelectorAll('.coupon input')
const tooltipEls = document.querySelectorAll('.tooltip')
const form = document.querySelector('form')
const codeInputEl = document.querySelector('input[name=code-input]')
const validCodes = Array.from(codeEls).map(codeEl => codeEl.value)
let timeout
const handleCopy = el => {
  return () => {
    navigator.clipboard.writeText(el.value)
      .then(() => {
        el.setSelectionRange(0, -1)
        /**
         * hide all currently displayed tooltips
         * if there is any
         */
        tooltipEls.forEach(tooltip => tooltip.style.display = 'none')
        /**
         * select and display the tooltip for the clicked coupon
         */
        const tooltip = el.nextElementSibling
        const copiedCodeEl = tooltip.querySelector('.copied-code')
        navigator.clipboard.readText()
          .then(code => copiedCodeEl.textContent = code)
        tooltip.style.display = 'block'
        /**
         * clear any existing timeout
         * before assigning a new one to the timeout variable
         */
        if (typeof timeout === 'number') {
          clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
          tooltip.style.display = 'none'
          copiedCodeEl.textContent = ''
        }, 2000)
      })
  }
}
const handleSubmit = (event) => {
  event.preventDefault()
  const formData = new FormData(form)
  alert(`Coupon Code ${formData.get('code-input')} has been applied successfully.`)
}
for (const codeEl of codeEls) {
  codeEl.addEventListener('click', handleCopy(codeEl))
}
form.addEventListener('submit', handleSubmit)