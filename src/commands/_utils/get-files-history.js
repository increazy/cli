const fs = require('fs')

const getHistory = folder => {
    let history = []
    const folders = fs.readdirSync(folder)

    for (const file of folders) {
        const filePath = `${folder}/${file}`
        const isDirectory = fs.lstatSync(filePath).isDirectory()

        if (isDirectory) {
            history = history.concat(getHistory(filePath))
        } else if (!filePath.includes('/.increazy/') && !filePath.includes('/.git/')) {
            history.push({
                path: filePath,
                date: fs.statSync(filePath).mtime.toString()
            })
        }
    }

    return history
}

module.exports = getHistory