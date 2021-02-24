module.exports = cli => {
    const status = cli.git('status')

    if (!status.includes('nothing to commit')) {
        throw new Error('Save your changes before changing or creating task')
    }
}