const createHistory = require('../get/create-history')
const checkChanges = require('../deploy/check-changes')
const downloadProject = require('../get/download-project')
const downloadLoader = require('../get/download-loader')
const saveCode = require('../get/save-code')
const saveDrive = require('../get/save-drive')
const saveSettings = require('../get/save-settings')


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

                await cli.middleware(['auth'])
                const project = JSON.parse(cli.file.readCwd(process.cwd(), '.increazy/.project'))
                const folder = process.cwd()

                loading.start()
                fs.rmdirSync(`${folder}/drive`, { recursive: true })
                fs.rmdirSync(`${folder}/pages`, { recursive: true })
                fs.rmdirSync(`${folder}/*.*`, { recursive: true })

                const settings = await downloadProject(cli, project, '0')
                saveDrive(cli, folder, settings.files)
                saveCode(cli, folder, settings.codes)
                saveSettings(cli, folder, settings)
                createHistory(cli, folder)

                await loading.end()

                const status = cli.git('status')
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