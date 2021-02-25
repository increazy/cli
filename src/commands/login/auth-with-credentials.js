const path = require('path')
const fs = require('fs')

module.exports = async(cli, email, password) => {
    const response = (await cli.http('p:/auth', 'post', { email, password })).data
    const { user } = response
    fs.mkdirSync(path.resolve(__dirname, '../../../.data'), { recursive: true })
    cli.file.env('auth', user.cli_key)

    return user
}