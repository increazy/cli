const hooks = {
    //hooks
}

window.slides = {}

const componentMocked = {
    $slide(selector, options) {
        if (document.querySelector(selector)) {
            if (selector in window.slides) {
                window.slides[selector].destroy()
                delete window.slides[selector]
            }

            const slide = new Swiper(selector, options)
            window.slides[selector] = slide
            return
        }
    },

    $wait(selector, callback) {
        const waitForEl = function() {
            if (document.querySelector(selector)) {
                callback(document.querySelector(selector))
            } else {
                setTimeout(waitForEl, 100)
            }
        }

        waitForEl()
    }
}

const defaultHooks = ['cart-', 'product-list']

function $hook(name, el, params) {
    try {
        name = `--${name}`
        defaultHooks.forEach(hook => {
            if (name.startsWith(`--${hook}`)) {
                name = name.replace(/^--/, '')
            }
        })

        if (!(name in hooks)) {
            return console.info(`Hook '${name}' not found`)
        }

        const hook = hooks[name]
        hook(componentMocked, el, ...(params || '').split(':'))
    } catch (error) {
        console.warn(error)
    }
}

const hooksOnLoad = document.querySelectorAll('*[data-onload]')
for (let i = 0; i < hooksOnLoad.length; i++) {
    const hook = hooksOnLoad[i]
    const params = hook.getAttribute('data-onload').split('$%$')
    $hook(params[0], hook, params[1])
}