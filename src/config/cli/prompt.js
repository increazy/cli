const inquirer = require('inquirer')
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

module.exports = async(message, options, suggestOnly = false) => {
    const response = await inquirer.prompt([{
        type: 'autocomplete',
        name: 'input',
        suggestOnly,
        message,
        source: function(answers, input) {
            input = input || ''
            input = input.toLowerCase().trim()

            return options.filter(o => o.toLowerCase().trim().includes(input))
        }
    }])

    if (Array.isArray(response)) {
        return response.map(r => r[settings[0].name])
    }

    return response.input
}