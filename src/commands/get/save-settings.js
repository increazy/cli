module.exports = (cli, folder, project) => {
    folder = `${folder}/.increazy`
    cli.exec('mkdir', ['-p', folder])

    const data = {
        ...project.pwa,
        connection: project.connection
    }

    cli.file.writeCwd(folder, '.project', JSON.stringify(data, null, 2))
}