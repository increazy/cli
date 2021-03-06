const fs = require('fs')

module.exports = (cli, folder, codes, gitStatus) => {
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
            name = name === 'custom.js' ? 'index.js' : name
        } else if (code.metadata === 'block') {
            subfolder = 'blocks/'
            console.log(name)
            name = name.replace(/^__block_/, '')
        }

        const _folder = `${folder}/${subfolder}`
        fs.mkdirSync(_folder, { recursive: true })
        cli.file.writeCwd(_folder, name.replace(/^__/, ''), code.content)
    })

    if (!fs.existsSync(`${folder}/blocks`)) {
        fs.mkdirSync(`${folder}/blocks`, { recursive: true })
    }

    fs.mkdirSync(`${folder}/.increazy`, { recursive: true })
    if (+gitStatus !== 1) {
        cli.file.writeCwd(folder, '.increazy/.pages', JSON.stringify(pages, null, 2))
    }
}