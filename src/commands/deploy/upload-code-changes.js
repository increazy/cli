const fs = require('fs')
const path = require('path')

module.exports = async(cli, changes, codes, settings, branch) => {
    changes = changes.filter(c => !c[1].includes('/drive/'))
    let changesToUpload = []

    for (let i = 0; i < changes.length; i++) {
        const change = changes[i]

        if (change[0] === 'remove') {
            const paths = change[1].split('/')
            const names = paths[paths.length - 1].split('.')
            let name = names[0]
            const extension = names[1] === 'js' ? 'javascript' : names[1]
            const isHook = change[1].includes('/hooks/')
            const isJs = change[1].includes('/js/')
            const isCss = change[1].includes('/css/')
            const isPage = change[1].includes('/pages/')
            const isBlock = change[1].includes('/blocks/')

            if (isHook) {
                name = `hook_${name}`
            } else if (isJs) {
                name = `javascript_${name}`
            } else if (isCss) {
                name = `css_${name}`
            } else if (isBlock) {
                name = `block_${name}`
            }

            changesToUpload.push({
                type: 'remove',
                name: isPage ? name : `__${name}`,
                extension
            })
        } else {
            for (let j = 0; j < codes.length; j++) {
                const code = codes[j]
                const filename = code.name + '.' + (code.extension === 'javascript' ? 'js' : code.extension)
                const cleanedFilename = filename
                    .replace(/^__css_/, '')
                    .replace(/^__javascript_/, '')
                    .replace(/^__hook_/, '')
                    .replace(/^__block_/, '')
                    .replace(/^__/, '')

                if (change[1].endsWith(cleanedFilename) || (change[1].endsWith('/default.js') && cleanedFilename === 'hooks.js')) {
                    changesToUpload.push({
                        ...code,
                        type: change[0],
                        content: change[0] !== 'remove' ? code.content : ''
                    })
                }
            }
        }
    }

    const response = await cli.http(`/upload/code/${settings._id}`, 'post', { changes: changesToUpload })

    fs.mkdirSync(path.resolve(process.cwd(), '.increazy/.backup'), { recursive: true })

    response.data.olds.forEach(code => {
        cli.file.writeCwd(process.cwd(), `.increazy/.backup/${code.name}.${code.extension}`, code.content)
    })

    await cli.git('add .')
    await cli.git('commit -m "cli: backup dashboard files"')
    await cli.git(`push origin ${branch}`)
}