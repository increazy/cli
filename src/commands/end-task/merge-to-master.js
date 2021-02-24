module.exports = async(cli, branch) => {
    await cli.git('checkout master')
    const pull = cli.git('pull origin master')
    if (pull.includes('CONFLICT (content)')) {
        cli.echo('red', '❌ We detected a conflict in the edits, fix it before continuing:')
        cli.echo('white', 'Auto-merging' + pull.split('Auto-merging')[1])
        throw new Error('')
    }

    await cli.git(`merge ${branch}`)
    await cli.git('push origin master')
}