module.exports = async(cli, code) => {
    const regex = /<pwa-newsletter (?<declaration>.*?)>(?<content>.*?)<\/pwa-newsletter>/gms
    let match

    while ((match = regex.exec(code)) !== null) {
        const newValue = match[0]
            .replace(/pwa-newsletter/g, 'div')
        code = code.replace(match[0], newValue)
    }

    return code
}