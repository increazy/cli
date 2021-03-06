const Configstore = require('configstore')
const dataURI = require('datauri')
const fs = require('fs')
const path = require('path')

const config = new Configstore('increazy-cli', { foo: 'bar' })

module.exports = {
    env(name, value = null) {
        if (value === null) return config.get(name)
        config.set(name, value)
        return value
    },

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

    sizeCwd(folder, name) {
        const filename = path.resolve(folder, name)
        var stats = fs.statSync(filename)
        return stats.size / (1024*1024);
    },
}