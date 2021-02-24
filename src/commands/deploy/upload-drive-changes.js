module.exports = async(cli, changes, settings) => {
    changes = changes.filter(c => c[1].includes('/drive/'))

    for (let i = 0; i < changes.length; i++) {
        const change = changes[i];
        if (change[0] !== 'remove') {
            changes[i].push(await cli.file.dataURICwd(change[1], ''))
        }
    }

    await cli.http(`/upload/drive/${settings._id}`, 'post', { changes })
}