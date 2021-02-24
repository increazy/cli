module.exports = async(cli, task) => {
    const pull = await cli.git(`pull origin ${task}`)
    if (pull.includes('CONFLICT (content)')) {
        cli.echo('red', '❌ We detected a conflict in the edits, fix it before continuing:')
        cli.echo('white', 'Auto-merging' + pull.split('Auto-merging')[1])
        throw new Error('')
    }

    cli.git(`commit -m "increazy: finish task '${task}'"`)
    await cli.git(`push origin ${task}`)
}