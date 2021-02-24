const faker = require('./faker')

module.exports = async(cli, code) => {
    const regex = /{{(?<value>.*?)}}/gms
    let match

    while ((match = regex.exec(code)) !== null) {
        const { value } = match.groups
        const newValue = faker(value)

        code = code.replace(match[0], newValue)
    }


    return code
}