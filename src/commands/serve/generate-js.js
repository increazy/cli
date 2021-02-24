const fs = require('fs')

module.exports = (cli) => {
    const staticFolder = process.cwd() + '/.increazy/.serve'
    const code = cli.file.readCwd(process.cwd(), 'js/custom.js')
    const folder = process.cwd() + '/js'
    const jsFiles = fs.readdirSync(folder)

    const jsParts = jsFiles
        .filter(js => !['custom.js'].includes(js))
        .map(js => cli.file.readCwd(folder, js))


    cli.file.writeCwd(staticFolder, 'custom.js', code + jsParts.join(' '))
}