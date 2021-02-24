const fs = require('fs')
const path = require('path')
const dataURI = require('datauri')

module.exports = {
    write(name, content, type) {
        const filename = path.resolve(__dirname, '../../../.data/', name)
        fs.writeFileSync(filename, content)
        return content
    },

    read(name) {
        const filename = path.resolve(__dirname, '../../../.data/', name)
        return fs.readFileSync(filename).toString()
    },

    writeCwd(folder, name, content, type) {
        const filename = path.resolve(folder, name)
        fs.writeFileSync(filename, content, type)
        return content
    },

    readCwd(folder, name, type) {
        const filename = path.resolve(folder, name)
        return fs.readFileSync(filename, type).toString()
    },

    async dataURICwd(folder, name) {
        const filename = path.resolve(folder, name)
        return dataURI(filename)
    },
}