const inquirer = require('inquirer')

module.exports = async settings => {
    settings = typeof settings === 'string' ? { type: 'input', message: settings } : settings
    settings = Array.isArray(settings) ? settings : [settings]
    settings = settings.map(item => {
        item.name = 'input'
        return item
    })

    const response = await inquirer.prompt(Array.isArray(settings) ? settings : [settings])

    if (Array.isArray(response)) {
        return response.map(r => r[settings[0].name])
    }

    return response[settings[0].name]
}