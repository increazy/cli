const path = require('path')

module.exports = async(cli, email, password) => {
    const response = (await cli.http('p:/auth', 'post', { email, password })).data
    const { user } = response
    cli.exec('mkdir', ['-p', path.resolve(__dirname, '../../.data')])
    cli.file.write('.auth', user.cli_key)

    return user
}