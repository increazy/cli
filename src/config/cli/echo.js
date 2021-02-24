const chalk = require('chalk')

module.exports = (color, msg, timeout = 500) => {
    setTimeout(() => {
        console.log(chalk.keyword(color)(msg))
    }, timeout)
}