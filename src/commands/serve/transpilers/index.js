module.exports = async(cli, code) => {
    const transpilers = [
        require('./include-blocks'),
        require('./newsletter-to-form'),
        require('./search-form-to-html'),
        require('./product-list-to-html'),
        require('./import-components'),
        require('./hidden-serve-tag'),
        require('./hooks-to-method'),
        require('./change-all-src'),
        require('./mustache-to-fake-data'),
        require('./change-attributes'),
    ]

    for (const transpile of transpilers) {
        code = await transpile(cli, code)
        code = await transpile(cli, code)
    }

    return code
}