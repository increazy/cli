const cards = document.querySelectorAll('*[pwa-each-product]')
cards.forEach(card => {
    const size = +card.getAttribute('pwa-each-product')
    let html = ''
    for (let i = 0; i < size; i++) {
        html = html + card.outerHTML
    }
    card.parentElement.innerHTML = card.parentElement.innerHTML.replace(card.outerHTML, html)
})

toggleSuggests()

function toggleSuggests() {
    const box = document.querySelector('*[pwa-has-suggest]')
    box.style.display = ['block', null, '', undefined].includes(box.style.display) ? 'none' : 'block'
}