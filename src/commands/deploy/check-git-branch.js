module.exports = (cli, env, settings) => {
    if (env.startsWith('production')) {
        if (!cli.git('branch').includes('* master')) {
            throw new Error('You need to be using the master task to deploy to production; Run `increazy end-task` to continue')
        }
    }
}