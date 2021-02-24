const getCurrentBrach = require('./get-current-brach')

module.exports = async cli => {
    const syncLoading = cli.loading([
        'Taking tasks from other devs..'
    ], 900, 'Tasks received!').start()

    await cli.git('fetch --all')
    await cli.git('pull --all')

    const tasksStr = await cli.git('branch -a').replace(/remotes\/origin\//g, '')
    const othersTasks = tasksStr.split('\n')
        .map(t => t.trim())
        .filter(t => t !== '')
        .filter(t => !t.startsWith('*'))

    const currentFormatted = await getCurrentBrach(cli)
    const tasks = [currentFormatted].concat(othersTasks)
    await syncLoading.end()

    return tasks.filter((task, index) => tasks.indexOf(task) === index)
}