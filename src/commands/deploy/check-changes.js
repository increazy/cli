const getHistory = require('../_utils/get-files-history')

module.exports = async(cli, showContinueDeploying = true) => {
    const folder = process.cwd()
    const currentHistory = getHistory(folder)
    const oldHistory = JSON.parse(cli.file.readCwd(folder, '.increazy/.history'))

    const changes = currentHistory.reduce((changes, file) => {
        let oldFind = null
        oldHistory.forEach(oldFile => {
            if (oldFile.path === file.path) {
                oldFind = oldFile
            }
        })

        if (oldFind === null) {
            changes.push(['new', file.path])
        } else if (oldFind.date !== file.date) {
            changes.push(['change', file.path])
        }

        return changes
    }, [])


    const currentFilesName = currentHistory.map(c => c.path)
    oldHistory.forEach(oldFile => {
        if (!currentFilesName.includes(oldFile.path) && !oldFile.path.includes('/.increazy/') && !oldFile.path.includes('/.git/')) {
            changes.push(['remove', oldFile.path])
        }
    })

    if (changes.length > 0) {
        cli.echo('white', '👀 See the files that have been modified:')
        cli.table(['type', 'file'], changes)
    } else if (showContinueDeploying) {
        const confirmDeploy = await cli.input({
            type: 'confirm',
            message: `🤔 You don't edit anything, are you sure you want to continue the deployment? `
        })

        if (!confirmDeploy) throw new Error('0')
    }

    return {
        changes: JSON.parse(JSON.stringify(changes)),
        saveNewHistory: () => {
            cli.file.writeCwd(folder, '.increazy/.history', JSON.stringify(currentHistory, null, 2))
        }
    }
}