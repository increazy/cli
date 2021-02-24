const getHistory = require('../_utils/get-files-history')

module.exports = async(cli, folder) => {
    const history = getHistory(folder)
    cli.file.writeCwd(folder, '.increazy/.history', JSON.stringify(history, null, 2))
}