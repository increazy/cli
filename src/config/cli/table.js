const Table = require('cli-table')
const table = require('cli-table')

module.exports = (head, rows) => {
    const instance = new table({ head })

    rows.forEach(row => {
        instance.push(row)
    })

    setTimeout(() => {
        console.log(instance.toString())
    }, 500)
}