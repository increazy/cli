const middlewares = {
    auth: require('../../middlewares/auth')
}

module.exports = async(cli, toExecute) => {
    let currentName = ''

    try {
        for (let i = 0; i < toExecute.length; i++) {
            currentName = toExecute[i]
            const middleware = middlewares[currentName]

            await middleware(cli)
        }
    } catch (error) {
        cli.echo('red', `[${currentName}] error: ${error.message}`)
        throw new Error()
    }
}