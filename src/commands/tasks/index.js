module.exports = (cli, program) => {
    program
        .command('tasks')
        .description('View all tasks and activate them at the moment')
        .action(async() => {
            try {
                await cli.middleware(['auth'])
                cli.echo('cyan', '* Is your current task\n')
                cli.echo('white', cli.git('branch -a').replace(/remotes\/origin\//g, ''))
                cli.echo('cyan', '\n* Is your current task')
            } catch (error) {
                cli.echo('red', '❌ ' + error.message)
            }
        })
}