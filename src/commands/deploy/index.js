const checkChanges = require('./check-changes')
const checkGitBranch = require('./check-git-branch')
const codeToJSON = require('./code-to-json')
const deployLoader = require('./deploy-loader')
const getCurrentBranch = require('../_utils/get-current-brach')
const setEnv = require('./set-env')
const settingsToJSON = require('./settings-to-json')
// const compilePreprocessor = require('../pre-css-compile/compile')
const uploadCodeChanges = require('./upload-code-changes')
const uploadDriveChanges = require('./upload-drive-changes')
const fs = require('fs')

module.exports = (cli, program) => {
    program
        .command('deploy')
        .description('Sends the project to deploy')
        .action(async() => {
            const loading = deployLoader(cli)

            try {
                await cli.middleware(['new-version', 'auth', 'check-folder', 'print-branch'])
                const { env, body } = await setEnv(cli)

                console.time('🕓 Deployment duration: ')
                // await compilePreprocessor(cli)
                const { changes, saveNewHistory } = await checkChanges(cli)
                const settings = await settingsToJSON(cli)
                const branch = await getCurrentBranch(cli)
                await checkGitBranch(cli, env, settings)

                setTimeout(() => loading.start(), 500)
                const codes = await codeToJSON(cli)
                await uploadDriveChanges(cli, changes, settings)

                if (branch === 'master') {
                    await uploadCodeChanges(cli, changes, codes, settings, branch)
                    saveNewHistory()
                }

                const _body = {
                    project: { codes },
                    s3: true,
                    ...body
                }

                const response = (await cli.http(`/projects/${settings._id}`, 'post', _body)).data
                await loading.end()

                cli.echo('green', `🌍 ${response.url}`)
                setTimeout(() => {
                    console.timeEnd('🕓 Deployment duration: ')
                }, 500)
            } catch (error) {
                setTimeout(async () => {
                    await loading.end()
                    if (error.message === '0') return
                    cli.echo('red', '❌ a' + error.message)
                    if (error.response) {
                        cli.dev(error.response.data)
                    } else {
                        cli.dev(error)
                    }
                }, 600)
            }
        })
}