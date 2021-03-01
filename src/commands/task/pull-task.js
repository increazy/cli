module.exports = async(cli, task, fromList) => {
    const tryCreate = fromList ? 'already' : await cli.git(`branch ${task}`)
    if (tryCreate.includes('already')) {
        await cli.git(`checkout ${task}`)
        await cli.git(`pull origin ${task} --force`)
        cli.echo('yellow', '🚸 This task already exists, we recovered it, now it\'s just coding!')
    } else {
        await cli.git('add .')
        await cli.git(`commit -m "increazy: create task '${task}'"`)
        await cli.git(`push origin ${task}`)
        await cli.git(`checkout ${task}`)
        cli.echo('green', '✅ We created the task for you, now just code!')
    }
}