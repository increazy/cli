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
    if (box) {
        box.style.display = ['block', null, '', undefined].includes(box.style.display) ? 'none' : 'block'
    }

}

if (window.innerWidth >= 1024) {
    const mobileElements = document.querySelectorAll('*[pwa-is-mobile]')
    for (let i = 0; i < mobileElements.length; i++) {
        const element = mobileElements[i];
        element.remove();
    }
} else {
    const desktopElements = document.querySelectorAll('*[pwa-is-desktop]')
    for (let i = 0; i < desktopElements.length; i++) {
        const element = desktopElements[i];
        element.remove();
    }
}