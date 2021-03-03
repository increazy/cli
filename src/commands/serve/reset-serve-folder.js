const fs = require('fs')
const rimraf = require('rimraf')

module.exports = cli => {
    const serveFolder = process.cwd() + '/.increazy/.serve'
    if (fs.existsSync(serveFolder)) {
        rimraf.sync(serveFolder)
    }

    fs.mkdirSync(serveFolder, { recursive: true })

    return serveFolder
}