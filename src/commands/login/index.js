const authWithCredentials = require('./auth-with-credentials')
const getCredentials = require('./get-credentials')
const loader = require('./loader')

module.exports = (cli, program) => {
    program
        .command('login')
        .description('Login your Increazy account')
        .action(async() => {
            const loading = loader(cli)

            try {
                const { email, password } = await getCredentials(cli)
                loading.start()

                const user = await authWithCredentials(cli, email, password)
                cli.echo('green', `🎈 Hello ${user.name}, welcome to the Increazy CLI!`, 1000)
                cli.echo('white', 'You can now run the other commands to start managing your projects.', 1200)
            } catch (error) {
                cli.echo('red', '🚫 you got your email or password wrong.')
                cli.dev(error)
            } finally {
                await loading.end()
            }
        })
}