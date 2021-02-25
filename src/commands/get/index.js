const checkGit = require('./check-git')
const chooseProject = require('./choose-project')
const createGit = require('./create-git')
const createHistory = require('./create-history')
const downloadLoader = require('./download-loader')
const downloadProject = require('./download-project')
const saveCode = require('./save-code')
const saveDrive = require('./save-drive')
const saveSettings = require('./save-settings')


module.exports = (cli, program) => {
    program
        .command('get')
        .description('Download a project in the current folder ')
        .action(async() => {
            const loading = downloadLoader(cli)

            try {
                if (!cli.exec('which', ['git'])) {
                    return cli.echo('red', '❌ We recommend installing Git to use the cli')
                }

                await cli.middleware(['new-version', 'auth'])
                const { project, folder } = await chooseProject(cli)

                const gitStatus = await checkGit(cli, project, folder)

                loading.start()
                const settings = await downloadProject(cli, project, gitStatus)
                saveDrive(cli, folder, settings.files)
                saveCode(cli, folder, settings.codes)
                saveSettings(cli, folder, settings.pwa)
                createHistory(cli, folder)

                if (gitStatus === 0) {
                    await createGit(cli, folder, settings.pwa)
                }

                await loading.end()
            } catch (error) {
                await loading.end()
                cli.echo('red', '❌ ' + error.message)
                cli.dev(error)
            }
        })
}