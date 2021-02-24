module.exports = async(cli, message) => {
    const status = cli.git('status')

    if (!status.includes('nothing to commit')) {
        cli.echo('yellow', `💾 Save your changes before ${message}`)
        await cli.delay(600)
        const commit = await cli.input('📝 Write a message to your commit:')
        const commitFormatted = commit.replace('\'', '').replace('"', '')

        cli.git('add .')
        cli.git(`commit -m "m: '${commitFormatted}'"`)
    }
}