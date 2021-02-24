const shell = require('shelljs')

module.exports = (command, params) => {
    params = Array.isArray(params) ? params : [params]
    const response = shell[command](...params)
    if (response.stderr) return response.stderr

    return response.stdout
}