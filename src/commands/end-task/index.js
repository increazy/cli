const commitTaskIfChanges = require('../_utils/commit-task-if-changes')
const getCurrentBranch = require('../_utils/get-current-brach')
const mergeToMaster = require('./merge-to-master')
const pushCurrentTask = require('./push-current-task')

module.exports = (cli, program) => {
    program
        .command('end-task')
        .description('Finish the current task (git merge)')
        .action(async() => {
            try {
                await cli.middleware(['auth'])
                await commitTaskIfChanges(cli, 'end this task')
                const branch = getCurrentBranch(cli)
                await pushCurrentTask(cli, branch)
                mergeToMaster(cli, branch)

                cli.echo('green', `✅ '${branch}' was finalized and sent to master, now you can deploy it`)
                cli.echo('white', '🚗 we moved you to the task master now')
            } catch (error) {
                if (error.message !== '') {
                    cli.echo('red', '❌ ' + error.message)
                }
            }
        })
}