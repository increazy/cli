const fs = require('fs')
const path = require('path')

const subBlock = code => {
    const regex = /<pwa-html:(?<value>.*?)\/>/gms
    let match

    while ((match = regex.exec(code)) !== null) {
        const { value } = match.groups
        const target = path.resolve(process.cwd(), 'blocks', `${value.trim()}.html`)

        if (fs.existsSync(target)) {
            const content = fs.readFileSync(target)
            code = code.replace(match[0], `<!-- block ${value} --> ${content}`)
        } else {
            code = code.replace(match[0], `<!-- unknown block ${value} -->`)
        }
    }

    return code
}

module.exports = async(cli, code) => {
    const regex = /<pwa-html:(?<value>.*?)\/>/gms
    let match

    while ((match = regex.exec(code)) !== null) {
        const { value } = match.groups
        const target = path.resolve(process.cwd(), 'blocks', `${value.trim()}.html`)

        if (fs.existsSync(target)) {
            let content = fs.readFileSync(target)
            content = subBlock(content.toString())
            code = code.replace(match[0], `<!-- block ${value} --> ${content}`)
        } else {
            code = code.replace(match[0], `<!-- unknown block ${value} -->`)
        }
    }

    return code
}