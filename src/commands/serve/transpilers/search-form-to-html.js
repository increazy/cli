module.exports = async(cli, code) => {
    const regex = /<pwa-search-form (?<declaration>.*?)>(?<content>.*?)<\/pwa-search-form>/gms
    let match

    while ((match = regex.exec(code)) !== null) {
        const newValue = match[0]
            .replace(/pwa-search-form/g, 'div')
            .replace('pwa-search-box', 'onfocus="toggleSuggests()" onfocusout="toggleSuggests()" type="search"')
            .replace('pwa-search-button', 'onclick="toggleSuggests()"')
        code = code.replace(match[0], newValue)
    }

    return code
}