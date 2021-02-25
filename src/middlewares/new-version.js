const latestVersion = require('latest-version')
const package = require('../../package.json')

module.exports = async cli => {
    const latest = await latestVersion('increazy')
    if (latest !== package.version) {
        cli.echo('yellow', `🎉 New version available (${package.version} -> ${latest}) run 'yarn global upgrade increazy' or 'npm update -g increazy'`)
    }
}