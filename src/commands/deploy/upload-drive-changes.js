module.exports = async(cli, changes, settings) => {
    changes = changes.filter(c => c[1].includes('/drive/'))

    for (let i = 0; i < changes.length; i++) {
        const change = changes[i];
        if (change[0] !== 'remove') {

            if (cli.file.sizeCwd(change[1], '') > 1) {
                throw new Error(`${change[1]} exceeded the 1mb size limit.`)
            }

            changes[i].push(await cli.file.dataURICwd(change[1], ''))
        }
    }

    await cli.http(`/upload/drive/${settings._id}`, 'post', { changes })
}