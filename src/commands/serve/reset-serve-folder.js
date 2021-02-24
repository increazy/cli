const fs = require('fs')

module.exports = cli => {
    const serveFolder = process.cwd() + '/.increazy/.serve'
    fs.rmdirSync(serveFolder, { recursive: true })
    fs.mkdirSync(serveFolder, { recursive: true })


    return serveFolder
}