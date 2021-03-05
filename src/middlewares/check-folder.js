const fs = require('fs')
const path = require('path')

module.exports = async cli => {
    const increazyFolder = path.resolve(process.cwd(), '.increazy')
    if (!fs.existsSync(increazyFolder)) {
        throw new Error('You are not in a project folder')
    }
}