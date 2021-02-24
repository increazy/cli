const shell = require('shelljs')

module.exports = (command) => {
    const response = shell.exec(`git ${command}`, { silent: true })
    const msg = response.stderr + '\n' + response.stdout
    return msg
}