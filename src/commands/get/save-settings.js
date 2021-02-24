const fs = require('fs')

module.exports = (cli, folder, project) => {
    folder = `${folder}/.increazy`
    fs.mkdirSync(folder, { recursive: true })

    cli.file.writeCwd(folder, '.project', JSON.stringify(project, null, 2))
}