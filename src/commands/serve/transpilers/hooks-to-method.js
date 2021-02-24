module.exports = async(cli, code) => {
    const regex = /pwa-hook(?<event>.*?)="(?<declaration>.*?)"/gm
    let match

    while ((match = regex.exec(code)) !== null) {
        const { declaration, event } = match.groups
        const eventName = event.includes('.') ? event.replace('.', 'on') : 'data-onload'
        const cropedDeclaration = declaration.split(':')
        const name = cropedDeclaration[0]
        const params = cropedDeclaration.length > 1 ? cropedDeclaration.slice(1).join(':') : ''

        if (eventName === 'data-onload') {
            code = code.replace(match[0], `data-onload="${name}$%$${params}"`)
        } else {
            code = code.replace(match[0], `${eventName}="$hook('${name}', this, '${params}')"`)
        }
    }

    return code
}