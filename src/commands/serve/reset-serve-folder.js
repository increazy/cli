const fs = require('fs')
const rimraf = require('rimraf')
const path = require('path')

module.exports = cli => {
    const serveFolder = path.resolve(process.cwd(), '.increazy/.serve')
    if (fs.existsSync(serveFolder)) {
        rimraf.sync(serveFolder)
    }

    fs.mkdirSync(serveFolder, { recursive: true })

    return serveFolder
}