const axios = require('axios')
const variables = require('../variables')

module.exports = (cli, path, method, body = {}) => {
    try {
        const isPublic = path.startsWith('p:')
        path = path.replace('p:', '')

        const headers = isPublic ? {} : {
            'cli-token': cli.file.env('auth')
        }

        const instance = axios.create({
            baseURL: variables.api,
            timeout: 3600000,
            headers
        })

        return instance[method](path, body)
    } catch (error) {
        cli.echo('red', 'There was an error in the connection.')
        cli.dev(error)
    }
}