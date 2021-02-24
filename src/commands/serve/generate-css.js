const fs = require('fs')
const srcTransform = require('./_utils/src-transform')

const transpileCSS = (cli, file, parts = []) => {
    const code = cli.file.readCwd(process.cwd(), `css/${file}.css`)
    const codeAppended = code + parts.join(' ')

    return srcTransform(codeAppended, /pwa-url\((?<src>.*?)\)/gm, 'url(%)')
}

module.exports = (cli) => {
    const staticFolder = process.cwd() + '/.increazy/.serve'

    cli.file.writeCwd(staticFolder, 'async.css', transpileCSS(cli, 'async'))
    cli.file.writeCwd(staticFolder, 'mobile.css', transpileCSS(cli, 'mobile'))

    const folder = process.cwd() + '/css'
    const cssFiles = fs.readdirSync(folder)

    const cssParts = cssFiles
        .filter(css => !['async.css', 'global.css', 'mobile.css'].includes(css))
        .map(css => cli.file.readCwd(folder, css))
    cli.file.writeCwd(staticFolder, 'global.css', transpileCSS(cli, 'global', cssParts))

}