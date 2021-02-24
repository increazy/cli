const ora = require('ora')

const _timeout = time => new Promise(resolve => setTimeout(resolve, time))

module.exports = (texts, timeout, latest) => ({
    start() {
        this.locked = false
        this.colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan']
        this.loader = new ora({
            text: texts[0],
            color: this.colors[0]
        })
        setTimeout(() => {
            this.loader.start()
            texts.shift()

            let colorIndex = 0
            const rainbow = index => {
                setTimeout(() => {
                    colorIndex++

                    if (texts.length - 1 < index) return
                    if (this.locked) return
                    if (colorIndex > this.colors.length - 1) {
                        colorIndex = 0
                    }

                    this.loader.color = this.colors[colorIndex]
                    this.loader.text = texts[index]

                    rainbow(index + 1)
                }, timeout)
            }

            rainbow(0)
        }, 600)
        return this
    },

    async end() {
        if (this.colors === undefined) return
        this.locked = true
        this.loader.color = this.colors[Math.floor(Math.random() * this.colors.length)]
        this.loader.text = latest

        await _timeout(timeout)
        this.loader.succeed()
    }
})