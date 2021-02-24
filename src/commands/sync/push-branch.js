module.exports = async(cli, branch) => {
    const pull = cli.git(`pull origin ${branch}`)
    if (pull.includes('CONFLICT (content)')) {
        cli.echo('red', '❌ We detected a conflict in the edits, fix it before continuing:')
        return cli.echo('white', 'Auto-merging' + pull.split('Auto-merging')[1])
    }

    await cli.git(`push origin ${branch}`)
}