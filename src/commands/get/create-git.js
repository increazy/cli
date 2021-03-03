module.exports = async(cli, folder, project) => {
    const gitignore = '.increazy/.history\n.increazy/.serve'
    cli.file.writeCwd(folder, '.gitignore', gitignore)

    cli.exec('cd', [folder])
    await cli.git('init')
    await cli.git('add .')
    await cli.git('commit -m "initial commit"')
    await cli.git(`remote add origin ${project.git}`)
    await cli.git('push -u origin master --force')
}