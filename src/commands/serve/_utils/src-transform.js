const faker = require('faker')
const driveToObject = require('./drive-to-object')

module.exports = (code, regex, target) => {
    const files = driveToObject()
    let match

    while ((match = regex.exec(code)) !== null) {
        const { src } = match.groups
        const newValue = files[src] ? files[src] : faker.image.animals(600, 600)
        code = code.replace(match[0], target.replace('%', newValue))
    }

    return code
}