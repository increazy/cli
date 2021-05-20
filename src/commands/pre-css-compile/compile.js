const commandExistsSync = require('command-exists').sync
const fs = require('fs')
const emptyDir = require('empty-dir')
const path = require('path')
const rimraf = require('rimraf')

module.exports = async (cli) => {
  const loading = cli.loading(['Compiling preprocessor...'], 1000, 'Preprocessor has compiled in css folder!')
  try {
    await cli.middleware(['new-version', 'auth', 'check-folder', 'print-branch'])
    loading.start()

    const folder = process.cwd()
    const isSass = fs.existsSync(path.resolve(folder, 'sass'))
    const isLess = fs.existsSync(path.resolve(folder, 'less'))

    if (isSass) {
      if (fs.existsSync(path.resolve(folder, 'css'))) {
        rimraf.sync(path.resolve(folder, 'css'))
      }

      cli.exec('exec', ['sass --no-source-map sass:css'])
    } else if (isLess) {

    } else {
      throw new Error('CSS preprocessor was not configured in this project, use "increazy pre-css" to configure ')
    }

    await loading.end()
  } catch (error) {
    await loading.end()
    cli.echo('red', '❌ ' + error.message)
  }
}