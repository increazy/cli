const fs = require('fs')

module.exports = (cli, folder, files) => {
    folder = `${folder}/drive`

    files.forEach(file => {
        const _folder = `${folder}/${file.folder || 'default'}`
        fs.mkdirSync(_folder, { recursive: true })

        const name = `${file.name}.${file.extension}`
        const content = file.content.split(';base64,').pop()
        cli.file.writeCwd(_folder, name, content, { encoding: 'base64' })
    })
}