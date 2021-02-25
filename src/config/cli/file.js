const configuration = require('global-configuration')
const dataURI = require('datauri')
const fs = require('fs')
const setConfiguration = require('global-configuration/set')
const path = require('path')

module.exports = {
    write(name, content, type) {
        // const filename = path.resolve(__dirname, '../../../.data/', name)
        // fs.writeFileSync(filename, content)

        setConfiguration({
            [name]: content
        })
        return content
    },

    read(name) {
        // const filename = path.resolve(__dirname, '../../../.data/', name)
        // return fs.readFileSync(filename).toString()
        return configuration[name]
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