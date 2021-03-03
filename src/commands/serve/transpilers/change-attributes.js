const faker = require('faker')

module.exports = async(cli, code) => {
    const regex = /pwa-to-page="(?<page>.*?)"/gms
    let match

    while ((match = regex.exec(code)) !== null) {
        const { page } = match.groups
        if (page.startsWith('/')) {
            if (page === '/') {
                code = code.replace(match[0], `onclick="window.location.href = '/'"`)
            } else if (page.includes('catalogsearch')) {
                code = code.replace(match[0], `onclick="window.location.href = '/search'"`)
            } else {
                const pages = JSON.parse(cli.file.readCwd(process.cwd(), '.increazy/.pages'))
                const pagesNames = pages.map(p => p.name.toLowerCase())
                if (pagesNames.includes(page.toLowerCase().replace('/', ''))) {
                    code = code.replace(match[0], `onclick="window.location.href = '/p${page}'"`)
                } else {
                    code = code.replace(match[0], `onclick="window.location.href = '/category'"`)
                }
            }
        } else if (page === 'home') {
            code = code.replace(match[0], `onclick="window.location.href = '/'"`)
        } else {
            code = code.replace(match[0], `onclick="window.location.href = '/p/${page}'"`)
        }
    }

    return code
        .replace(/pwa-toggle-cart/g, 'onclick="$hook(`cart-on-toggle`, this, ``)"')
        .replace(/pwa-to-product-page/g, 'onclick="window.location.href = `/product`"')
        .replace(/pwa-to-category-page/g, 'onclick="window.location.href = `/category`"')
        .replace(/pwa-to-subcategory-page/g, 'onclick="window.location.href = `/category`"')
        .replace(/pwa-to-search/g, 'onclick="window.location.href = `/search`" data-old')
        .replace(/component\.list\[0\]\.skus\[0\]\.sale_price/g, '')
        .replace(/| price/g, '')
        .replace(/pwa-attribute-filter/g, 'div')
        .replace(/pwa-price-filter/g, 'div')
        .replace(/pwa-tags-filter/g, 'div')
        .replace(/pwa-variation-filter/g, 'div')
        .replace(/activeSKU\.sale_price/g, 'R$ ' + (faker.commerce.price() + '').replace('.', ','))
        .replace(/activeSKU\.old_price/g, 'R$ ' + (faker.commerce.price() + '').replace('.', ','))
        .replace(/skus\[0\]\.sale_price/g, 'R$ ' + (faker.commerce.price() + '').replace('.', ','))
        .replace(/skus\[0\]\.old_price/g, 'R$ ' + (faker.commerce.price() + '').replace('.', ','))
}