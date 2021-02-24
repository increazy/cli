module.exports = cli => {
    const serveFolder = process.cwd() + '/.increazy/.serve'
    cli.exec('rm', ['-rf', serveFolder])
    cli.exec('mkdir', ['-p', serveFolder])

    return serveFolder
}