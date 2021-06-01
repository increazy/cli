const getHistory = require('../_utils/get-files-history')

const allowedFiles = [
    'cart.html', 'category.html', 'display_rules.json', 'footer.html',
    'global_vars.json', 'header.html', 'home.html', 'product_card.html',
    'product_modal.json', 'product.html', 'scripts_body.html', 'scripts_head.html',
    'search.html', '/blocks/', '/css/', '/drive/', '/hooks/', '/js/', '/pages/'
]

module.exports = async(cli, showContinueDeploying = true) => {
    const folder = process.cwd()
    const currentHistory = getHistory(folder)
    const oldHistory = JSON.parse(cli.file.readCwd(folder, '.increazy/.history'))

    const changes = currentHistory.reduce((changes, file) => {
        let oldFind = null
        const split = file.path.split('/')
        const path = split[split.length - 1]
        oldHistory.forEach(oldFile => {
            if (oldFile.path.endsWith(path)) {
                oldFind = oldFile
            }
        })

        const oldDate = oldFind === null ? null : (new Date(oldFind.date)).getTime()
        const newDate = (new Date(file.date)).getTime()

        const isValidFile = allowedFiles.reduce((result, match) => {
            if (file.path.includes(match)) {
                return true
            }
            return result
        }, false)

        if (isValidFile) {
            if (oldFind === null) {
                changes.push(['new', file.path])
            } else if (oldDate < newDate) {
                changes.push(['change', file.path])
            }
        }

        return changes
    }, [])


    const currentFilesName = currentHistory.map(c => {
        const split = c.path.split('/')
        return split[split.length - 1]
    })
    const oldHistoryNames = oldHistory.map(c => {
        const split = c.path.split('/')
        return split[split.length - 1]
    })

    oldHistory.forEach(oldFile => {
        const split = oldFile.path.split('/')
        const path = split[split.length - 1]
        if (!currentFilesName.includes(path) && !oldFile.path.includes('/.increazy/') && !oldFile.path.includes('/.git/')) {
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