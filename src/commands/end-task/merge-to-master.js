module.exports = async(cli, branch) => {
    await cli.git('checkout master')
    await cli.git('pull origin master')
    const merge = await cli.git(`merge ${branch}`)
    if (merge.includes('CONFLICT (content)')) {
        cli.echo('red', '❌ We detected a conflict in the edits, fix it before continuing:')
        cli.echo('white', 'Auto-merging' + merge.split('Auto-merging')[1])
        throw new Error('')
    }
    await cli.git('push origin master')
}