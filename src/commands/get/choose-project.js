const fs = require('fs')
const rimraf = require('rimraf')

module.exports = async cli => {
    const loading = cli.loading([
        'Sending request..',
        'Retrieving the project list..',
    ], 1000, 'List retrieved!').start()

    const projects = (await cli.http('/projects', 'get')).data
    await loading.end()

    const choices = projects.map(p => p.name)
    const selected = await cli.prompt('🚩 Choose a project', choices)

    let folderAnswered = ''
    while (folderAnswered === '') {
        await cli.delay(500)
        folderAnswered = await cli.input('📁 What is the name of the folder to download the project?')
        if (folderAnswered === '') {
            cli.echo('red', 'The project folder must have a name', 0)
        }
    }

    const subfolder = cli.dev() ? 'projects/' : ''
    const folder = process.cwd() + `/${subfolder}` + folderAnswered

    const index = choices.indexOf(selected)
    const project = projects[index]
    if (project.business !== 'ecommerce') {
        throw new Error('🚫 B2B or other types of projects are not yet allowed by the Increazy CLI')
    }

    if (fs.existsSync(folder)) {
        const toOverwrite = await cli.input({
            type: 'confirm',
            message: `🚧 The folder '${folderAnswered}' already exists, if we continue we will recreate it, do you want to continue?`
        })

        if (!toOverwrite) throw new Error('❌ Aborted')
        if (fs.existsSync(folder)) {
            rimraf.sync(folder)
        }
    }

    fs.mkdirSync(folder, { recursive: true })

    return { project, folder }
}