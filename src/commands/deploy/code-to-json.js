const fs = require('fs');

const generate = (cli, folderName, callback) => {
    const folder = process.cwd() + `/${folderName}`
    const files = [];

    const _files = fs.readdirSync(folder)
    for (const file of _files) {
        if (file.includes('.') && !file.startsWith('.')) {
            const names = file.split('.')
            files.push(callback({
                name: names[0],
                extension: names[1],
                content: cli.file.readCwd(folder, file)
            }))
        }
    }

    return files
}

module.exports = async(cli) => {
    const hooks = generate(cli, 'hooks', file => ({
        metadata: 'hook',
        name: file.name === 'default' ? '__hooks' : `__hook_${file.name}`,
        extension: 'javascript',
        content: file.content
    }))

    const blocks = generate(cli, 'blocks', file => ({
        metadata: 'block',
        name: `__block_${file.name}`,
        extension: 'html',
        content: file.content
    }))

    const js = generate(cli, 'js', file => ({
        metadata: 'js',
        name: ['custom', 'index'].includes(file.name) ? '__custom' : `__javascript_${file.name}`,
        extension: 'javascript',
        content: file.content
    }))

    const css = generate(cli, 'css', file => ({
        metadata: 'css',
        name: ['global', 'mobile', 'async'].includes(file.name) ? `__${file.name}` : `__css_${file.name}`,
        extension: 'css',
        content: file.content
    }))

    const pagesData = JSON.parse(cli.file.readCwd(process.cwd(), '.increazy/.pages'))

    const pages = generate(cli, 'pages', file => {
        const find = pagesData.filter(p => p.name === file.name)
        const metadata = find.length > 0 ? find[0].metadata : {
            title: file.name,
            description: file.name,
            keywords: file.name,
            path: file.name
        }

        return {
            metadata,
            name: file.name,
            extension: 'html',
            content: file.content
        }
    })

    const root = generate(cli, '', file => ({
        metadata: null,
        name: `__${file.name}`,
        extension: file.extension,
        content: file.content
    }))

    return hooks.concat(css).concat(js).concat(pages).concat(blocks).concat(root)
}