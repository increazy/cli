module.exports = async cli => {
    const tasksStr = await cli.git('branch')
    const current = tasksStr.split('\n').filter(t => t.startsWith('*'))[0]
    return current.replace('*', '').trim()
}