const commitTaskIfChanges = require('../_utils/commit-task-if-changes')
const getCurrentBranch = require('../_utils/get-current-brach')
const humanizeDuration = require('humanize-duration')
const mergeToMaster = require('./merge-to-master')
const pushCurrentTask = require('./push-current-task')

module.exports = (cli, program) => {
    program
        .command('end-task')
        .description('Finish the current task (git merge)')
        .action(async() => {
            try {

                await cli.middleware(['new-version', 'auth', 'check-folder'])
                await commitTaskIfChanges(cli, 'end this task')
                const branch = await getCurrentBranch(cli)
                await pushCurrentTask(cli, branch)
                await mergeToMaster(cli, branch)

                const startTaskTime = cli.file.env(`time.${branch}`)
                const taskMillisecondsDuration = (+new Date()) - startTaskTime
                const taskDuration = humanizeDuration(taskMillisecondsDuration)

                cli.echo('green', `✅ '${branch}' was finalized and sent to master, now you can deploy it`)
                cli.echo('white', `⏳ That task lasted ${taskDuration}`)
                cli.echo('white', '🚗 we moved you to the task master now')
            } catch (error) {
                if (error.message !== '') {
                    cli.echo('red', '❌ ' + error.message)
                }
            }
        })
}