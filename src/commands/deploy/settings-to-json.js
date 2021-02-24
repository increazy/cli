const fs = require('fs');

module.exports = async(cli) => {
    const filePath = process.cwd() + '/.increazy/'
    const content = await cli.file.readCwd(filePath, '.project')
    return JSON.parse(content)
}