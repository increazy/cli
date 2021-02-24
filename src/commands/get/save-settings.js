const fs = require('fs')

module.exports = (cli, folder, project) => {
    folder = `${folder}/.increazy`
    fs.mkdirSync(folder, { recursive: true })

    const data = {
        ...project.pwa,
        connection: project.connection
    }

    cli.file.writeCwd(folder, '.project', JSON.stringify(data, null, 2))
}