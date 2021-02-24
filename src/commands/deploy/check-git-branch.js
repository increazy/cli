module.exports = async(cli, env, settings) => {
    if (env.startsWith('production')) {
        const branch = await cli.git('branch')
        if (!branch.includes('* master')) {
            throw new Error('You need to be using the master task to deploy to production; Run `increazy end-task` to continue')
        }
    }
}