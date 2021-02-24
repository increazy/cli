const fs = require('fs')

module.exports = (cli, folder, codes) => {
    const pages = []

    codes.forEach(code => {
        let subfolder = ''
        let name = `${code.name}.${code.extension}`
        const invalidMetadata = typeof code.metadata !== 'object' || code.metadata === null
        const metadata = invalidMetadata ? {} : code.metadata

        if ('title' in metadata) {
            subfolder = 'pages/'
            name = `${code.name}.html`
            pages.push({...code, content: '' })
        } else if (code.metadata === 'hook') {
            subfolder = 'hooks/'
            name = code.name === '__hooks' ? 'default.js' : `${code.name.replace(/^__hook_/, '')}.js`
        } else if (code.extension === 'css') {
            subfolder = 'css/'
            name = name.replace(/^__css_/, '')
        } else if (code.extension === 'javascript') {
            subfolder = 'js/'
            name = name.replace('.javascript', '.js').replace(/^__javascript_/, '')
        }

        const _folder = `${folder}/${subfolder}`
        fs.mkdirSync(_folder, { recursive: true })
        cli.file.writeCwd(_folder, name.replace(/^__/, ''), code.content)
    })

    fs.mkdirSync(`${folder}/.increazy`, { recursive: true })
    cli.file.writeCwd(folder, '.increazy/.pages', JSON.stringify(pages, null, 2))
}