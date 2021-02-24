const transformList = (regex, code, callback, regexName = /name="(?<value>.*?)"/gms) => {
    let match

    while ((match = regex.exec(code)) !== null) {
        const { declaration } = match.groups
        let matchName
        let mName

        while ((mName = regexName.exec(declaration)) !== null) {
            matchName = mName.groups.value
        }

        const regexSize = /size="(?<value>.*?)"/gms
        let matchSize = 6
        let mSize

        while ((mSize = regexSize.exec(declaration)) !== null) {
            matchSize = mSize.groups.value
        }

        code = code.replace(match[0], callback(match, matchName, matchSize))
    }

    return code
}

module.exports = async(cli, code) => {
    const productCard = cli.file.readCwd(process.cwd(), 'product_card.html')

    code = transformList(
        /<pwa-product-list (?<declaration>.*?)>(?<content>.*?)<\/pwa-product-list>/gms,
        code,
        (match, name, size) => {
            const { declaration } = match.groups

            return match[0]
                .replace(/pwa-product-list/g, 'div')
                .replace('pwa-each-product', `pwa-each-product="${size}"`)
                .replace('<pwa-product-card>', productCard)
                .replace(declaration, `${declaration} data-onload="product-list-${name}-loaded"`)
        }
    )

    code = transformList(
        /<pwa-result-list (?<declaration>.*?)>(?<content>.*?)<\/pwa-result-list>/gms,
        code,
        (match, name, size) => {
            return match[0]
                .replace(/pwa-result-list/g, 'div')
                .replace('pwa-each-product', `pwa-each-product="${size}"`)
                .replace('<pwa-product-card>', productCard)
        }
    )

    code = transformList(
        /<pwa-product-linkeds (?<declaration>.*?)>(?<content>.*?)<\/pwa-product-linkeds>/gms,
        code,
        (match, name, size) => {
            const { declaration } = match.groups

            return match[0]
                .replace(/pwa-product-list/g, 'div')
                .replace('pwa-each-linked', `pwa-each-product="${size}"`)
                .replace('<pwa-product-card>', productCard)
                .replace(declaration, `${declaration} data-onload="product-linked-${name}-loaded"`)
        }
    )

    return code
}