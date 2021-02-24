module.exports = async(cli, task, fromList) => {
    const tryCreate = fromList ? 'already' : cli.git(`checkout -b ${task}`)
    if (tryCreate.includes('already')) {
        cli.git(`checkout ${task}`)
        await cli.git(`pull origin ${task} --force`)
        cli.echo('yellow', '🚸 This task already exists, we recovered it, now it\'s just coding!')
    } else {
        cli.echo('green', '✅ We created the task for you, now just code!')
    }
}