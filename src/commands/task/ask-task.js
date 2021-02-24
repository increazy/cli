const slugify = require('slugify')

module.exports = async(cli, tasks) => {
    let task = ''
    while (task === '') {
        const taskName = await cli.prompt('📝 What do you want to name your task?', tasks, true)
        task = slugify(taskName.trim())

        if (task === '') {
            cli.echo('yellow', '🚸 Enter a name for the task, if choosing an existing one, press tab before enter')
            await cli.delay(600)
        }
    }

    const fromList = tasks.includes(task)

    return { task, fromList }
}