const fs = require('fs')
const createHistory = require('../get/create-history')
const downloadProject = require('../get/download-project')
const downloadLoader = require('../get/download-loader')
const saveCode = require('../get/save-code')
const saveDrive = require('../get/save-drive')
const saveSettings = require('../get/save-settings')
const rimraf = require('rimraf')
const commitTaskIfChanges = require('../_utils/commit-task-if-changes')


module.exports = (cli, program) => {
    program
        .command('rebase')
        .description('Download the project, updating the current task code with online')
        .action(async() => {
            const loading = downloadLoader(cli)

            try {
                if (!cli.exec('which', ['git'])) {
                    return cli.echo('red', '❌ We recommend installing Git to use the cli')
                }

                await cli.middleware(['new-version', 'auth', 'check-folder'])

                const confirmDeploy = await cli.input({
                    type: 'confirm',
                    message: `🚸 Are you sure you want to rebase? By doing this you will download the dashboard code and overwrite the current task`
                })

                if (!confirmDeploy) throw new Error('Rebase has been canceled')

                await commitTaskIfChanges(cli, 'rebase')


                const project = JSON.parse(cli.file.readCwd(process.cwd(), '.increazy/.project'))
                const folder = process.cwd()

                loading.start()
                if (fs.existsSync(`${folder}/drive`)) {
                    rimraf.sync(`${folder}/drive`)
                }
                if (fs.existsSync(`${folder}/pages`)) {
                    rimraf.sync(`${folder}/pages`)
                }
                if (fs.existsSync(`${folder}/*.*`)) {
                    rimraf.sync(`${folder}/*.*`)
                }

                const settings = await downloadProject(cli, project, '0')
                saveDrive(cli, folder, settings.files)
                saveCode(cli, folder, settings.codes, 0)
                saveSettings(cli, folder, settings.pwa)
                createHistory(cli, folder)

                await loading.end()

                const status = await cli.git('status')
                const rChanges = /working directory\)\n\n(?<changes>.*?)\n\n/gms
                const changes = rChanges.exec(status)
                if ((changes || []).length > 1) {
                    cli.echo('white', '👀 See the files that have been modified:', 1000)
                    cli.echo('white', changes[1], 1200)
                }

                const rUntracked = /be committed\)\n\n(?<changes>.*?)\nno changes/ms
                const untracked = rUntracked.exec(status)
                if ((untracked || []).length > 1) {
                    cli.echo('white', '👀 See the files that have been untracked:', 1000)
                    cli.echo('white', untracked[1], 1200)
                }
            } catch (error) {
                await loading.end()
                cli.echo('red', '❌ ' + error.message)
                cli.dev(error)
            }
        })
}