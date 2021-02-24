const fs = require('fs')

module.exports = (cli) => {
    const staticFolder = process.cwd() + '/.increazy/.serve'
    const engineTemplate = cli.file.read('../src/commands/serve/template/engine.js')
    
    cli.file.writeCwd(staticFolder, 'engine.js', engineTemplate)
}