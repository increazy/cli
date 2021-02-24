module.exports = async(cli, folder, project) => {
    const gitignore = '.increazy/.history'
    cli.file.writeCwd(folder, '.gitignore', gitignore)

    cli.exec('cd', [folder])
    cli.git('init')
    cli.git('add .')
    cli.git('commit -m "initial commit"')
    cli.git(`remote add origin ${project.git}`)
    await cli.git('push -u origin master --force')
}