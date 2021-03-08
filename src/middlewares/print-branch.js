const getCurrentBranch = require('../commands/_utils/get-current-brach')

module.exports = async cli => {
    const branch = await getCurrentBranch(cli)

    cli.echo('white', `🔖 Current task: ${branch}`)
}