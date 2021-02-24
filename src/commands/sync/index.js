const commitTaskIfChanges = require("../_utils/commit-task-if-changes")
const getCurrentBrach = require("../_utils/get-current-brach")
const pushBranch = require("./push-branch")

module.exports = (cli, program) => {
    program
        .command('sync')
        .description('Synchronizes current task')
        .action(async() => {
            try {
                await cli.middleware(['auth'])
                const branch = await getCurrentBrach(cli)
                cli.echo('white', `🎈 Synchronizing task '${branch}'..`)
                await commitTaskIfChanges(cli, 'sync')
                await pushBranch(cli)
                cli.echo('white', `✅ '${branch}' was synchronized!`)
            } catch (error) {
                cli.echo('red', '❌ ' + error.message)
            }
        })
}