module.exports = async cli => {
    const loading = cli.loading([
        'Sending user data..',
        'Authenticating..',
        'Retrieving the response..',
    ], 700, 'Authentication done!').start()

    try {
        const response = (await cli.http('/auth', 'get')).data
        const { user } = response
        cli.user.set(user)
    } catch (error) {
        cli.dev(error)
        throw new Error('your login is wrong, run `increazy login` to renew it ')
    } finally {
        await loading.end()
    }
}