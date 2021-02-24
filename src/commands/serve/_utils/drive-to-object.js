const fs = require('fs')

module.exports = () => {
    const folder = process.cwd() + '/drive'
    const files = {}
    const subFolders = fs.readdirSync(folder)

    for (const subFolder of subFolders) {
        if (!subFolder.includes('.') && subFolder !== '') {
            const subFolderPath = folder + '/' + subFolder
            const filenames = fs.readdirSync(subFolderPath)

            for (const file of filenames) {
                if (file.includes('.')) {
                    const names = file.split('.')
                    files[names[0]] = `/drive/${subFolder}/${file}`
                }
            }
        }
    }

    return files
}