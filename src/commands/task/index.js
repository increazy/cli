const commitTaskIfChanges = require('../_utils/commit-task-if-changes')
const getAllTasks = require('../_utils/get-all-tasks')
const askTask = require('./ask-task')
const pullTask = require('./pull-task')
const rebase = require('../rebase/rebase')

module.exports = (cli, program) => {
    program
        .command('task')
        .description('Create or get a separate task for you (git branch)')
        .action(async() => {
            try {
                await cli.middleware(['new-version', 'auth', 'check-folder', 'print-branch'])
                await commitTaskIfChanges(cli, 'change task')
                const tasks = await getAllTasks(cli)
                const { fromList, task } = await askTask(cli, tasks)

                await pullTask(cli, task, fromList)
                cli.file.env(`time.${task}`, +new Date())

                if (!fromList) await rebase(cli, false)
                await cli.git('add .')
                await cli.git(`commit -m "cli: creating ${task}"`)
                await cli.git('fetch')
                await cli.git(`push origin ${task}`)
            } catch (error) {
                cli.echo('red', '❌ ' + error.message)
            }
        })
}