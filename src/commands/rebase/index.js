const rebase = require('./rebase')

module.exports = (cli, program) => {
    program
        .command('rebase')
        .description('Download the project, updating the current task code with online')
        .action(async() => {
            await rebase(cli, true)
        })
}