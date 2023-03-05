const codeEls = document.querySelectorAll('input[name^="coupon-code-"]')
const tooltips = document.querySelectorAll('.tooltip')
const form = document.querySelector('form')
const codeInput = document.querySelector('input[name=code-input]')

let timeout

const handleCopy = el => {
  return () => {
    /**
     * 1. copy coupon code to clipboard
     */
    navigator.clipboard.writeText(el.value)
      .then(() => {
        /**
         * 2. select and highlight clicked coupon code
         */
        el.setSelectionRange(0, -1)
        /**
         * 3. hide all currently displayed tooltips
         *    if there is any
         */
        tooltips.forEach(tooltip => tooltip.style.display = 'none')
        /**
         * 4. select the tooltip for the clicked coupon
         */
        const tooltip = el.nextElementSibling
        /**
         * 5. insert the copied code to the tooltip
         *    before displaying the tooltip
         */
        const copiedCodeEl = tooltip.querySelector('.copied-code')
        navigator.clipboard.readText()
          .then(code => copiedCodeEl.textContent = code)
        tooltip.style.display = 'block'
        /**
         * 6. clear any existing timeout
         *    before assigning a new one to the variable
         */
        if (typeof timeout === 'number') {
          clearTimeout(timeout)
        }
        /**
         * 7. display the tooltip for 2 seconds
         */
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
  const code = formData.get('code-input')
  formData.set('code-input', '')
  codeInput.value = ''
  alert(`Coupon Code ${code} has been applied successfully.`)
}
for (const codeEl of codeEls) {
  codeEl.addEventListener('click', handleCopy(codeEl))
}
form.addEventListener('submit', handleSubmit)