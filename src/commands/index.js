const cli = require('../config/cli')

module.exports = program => {
    require('./deploy')(cli, program)
    require('./end-task')(cli, program)
    require('./get')(cli, program)
    require('./login')(cli, program)
    // require('./pre-css')(cli, program)
    // require('./pre-css-compile')(cli, program)
    require('./rebase')(cli, program)
    require('./serve')(cli, program)
    require('./sync')(cli, program)
    require('./task')(cli, program)
    require('./tasks')(cli, program)
}