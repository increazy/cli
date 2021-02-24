const fs = require('fs')

module.exports = (cli) => {
    const staticFolder = process.cwd() + '/.increazy/.serve'
    const code = cli.file.readCwd(process.cwd(), 'hooks/default.js')
    const folder = process.cwd() + '/hooks'
    const hooksFiles = fs.readdirSync(folder)

    const hooksParts = hooksFiles
        .filter(hook => !['default.js'].includes(hook))
        .map(hook => `...${cli.file.readCwd(folder, hook)},`)

    const hookTemplate = cli.file.read('../src/commands/serve/template/hooks.js')
    const hookCompleted = hookTemplate.replace('//hooks', `...${code},${hooksParts.join(' ')}`)

    cli.file.writeCwd(staticFolder, 'hooks.js', hookCompleted)
}