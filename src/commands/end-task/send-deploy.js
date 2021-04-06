const checkChanges = require('../deploy/check-changes')
const checkGitBranch = require('../deploy/check-git-branch')
const codeToJSON = require('../deploy/code-to-json')
const deployLoader = require('../deploy/deploy-loader')
const getCurrentBranch = require('../_utils/get-current-brach')
const settingsToJSON = require('../deploy/settings-to-json')
const uploadCodeChanges = require('../deploy/upload-code-changes')
const uploadDriveChanges = require('../deploy/upload-drive-changes')

module.exports = async(cli, branch) => {
  await cli.delay(600)
  const confirmDeploy = await cli.input({
      type: 'confirm',
      message: `🌍 Can we deploy it in a test environment for you? So your changes will be posted on the dashboard `
  })
  if (!confirmDeploy) return

  const loading = deployLoader(cli)

  try {
    const env = 'labShared'
    const body = {
      testcase: true,
      shared: true,
      indexed: false
    }

    console.time('🕓 Deployment duration: ')
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
    loading.end()
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
}