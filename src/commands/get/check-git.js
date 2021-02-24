module.exports = async(cli, project, folder) => {
    if (!['', null, undefined].includes(project.git)) {
        cli.echo('white', `🧡 Git repository checked! (${project.git})`)
        const loading = cli.loading(['Cloning Git repository...'], 1000, 'Git cloned!').start()
        cli.exec('cd', [folder])
        await cli.git(`clone ${project.git} .`)
        await loading.end()
        return 1
    }

    // const initGit = await cli.input({
    //     type: 'confirm',
    //     message: '🚧 Your project does not have a git configured, do you want to configure it?'
    // })

    // if (!initGit) {
    //     cli.echo('yellow', '😪 Skipping git configuration!')
    //     return -1
    // }

    let gitURL = ''
    while (!gitURL.startsWith('git@') || !gitURL.endsWith('.git') || gitURL === '') {
        await cli.delay(500)
        gitURL = await cli.input({
            message: '🌏 What url SSH is your repository in?',
            default: 'git@bitbucket.org:[agency]/[project].git'
        })

        if (!gitURL.startsWith('git@') || !gitURL.endsWith('.git')) {
            cli.echo('red', 'The repository url should follow this pattern: git@bitbucket.org:[agency]/[project].git', 0)
        }
    }

    await cli.http(`/projects/git/${project._id}`, 'post', { git: gitURL })
    return 0
}