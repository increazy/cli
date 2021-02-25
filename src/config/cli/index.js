const variables = require('../variables')

const echo = require('./echo')
const exec = require('./exec')
const file = require('./file')
const git = require('./git')
const http = require('./http')
const input = require('./input')
const loading = require('./loading')
const middleware = require('../../middlewares')
const prompt = require('./prompt')
const table = require('./table')
const user = require('./user')

module.exports = {
    echo,
    exec,
    file,
    git,
    input,
    loading,
    prompt,
    table,
    user,

    dev(message = null) {
        if (message === null) return variables.dev
        if (variables.dev) {
            console.log('\n', message, '\n')
        }
    },
    delay(timeout = 500) {
        return new Promise(resolve => setTimeout(resolve, timeout))
    },
    http(path, method, body) {
        return http(this, path, method, body)
    },
    async middleware(toExecute) {
        await middleware(this, toExecute)
    },
}