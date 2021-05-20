const commandExistsSync = require('command-exists').sync
const fs = require('fs')
const emptyDir = require('empty-dir')
const path = require('path')
const getCurrentBranch = require('../_utils/get-current-brach')

module.exports = (cli, program) => {
  program
      .command('pre-css')
      .description('Add Sass or Less preprocessors to the project')
      .action(async() => {

        const loading = cli.loading(['Setting preprocessor...'], 1000, 'Preprocessor has installed! Use increazy pre-css-watch or increazy pre-css-compile')
          try {
            await cli.middleware(['new-version', 'auth', 'check-folder', 'print-branch'])

            const branch = await getCurrentBranch(cli)
            if (branch !== 'master') {
              throw new Error('You need to be in the "master" task to execute this command ')
            }

            const preProcessor = await cli.input({
              type: 'list',
              message: '🌈 Select the preprocessor to be used',
              choices: [ 'Less', 'Sass' ]
            })

            loading.start()

            const folder = process.cwd()
            if (preProcessor === 'Sass') {
              if (!commandExistsSync('sass')) {
                throw new Error('Sass is not installed on your system, see how to install: https://sass-lang.com/install')
              }

              if (fs.existsSync(path.resolve(folder, 'sass'))) {
                throw new Error('Sass preprocessor is already configured in the project ')
              }

              let gitignore = fs.readFileSync(path.resolve(folder, '.gitignore'))
              gitignore += "\ncss/*"
              fs.writeFileSync(path.resolve(folder, '.gitignore'), gitignore)

              if (!fs.existsSync(path.resolve(folder, 'css'))) {
                fs.mkdirSync(path.resolve(folder, 'css'))
              }

              const emptyCSS = emptyDir.sync(path.resolve(folder, 'css'));
              if (!emptyCSS) {
                fs.renameSync(path.resolve(folder, 'css'), path.resolve(folder, 'sass'))
                fs.mkdirSync(path.resolve(folder, 'css'))
              } else {
                fs.mkdirSync(path.resolve(folder, 'sass'))
                fs.mkdirSync(path.resolve(folder, 'css'))
              }

              await cli.git('add .')
              await cli.git(`commit -m "cli: adding preprocessor sass"`)
              await cli.git('fetch')
              await cli.git(`push origin master`)
            }

            await loading.end()
          } catch (error) {
            await loading.end()
            cli.echo('red', '❌ ' + error.message)
          }
      })
}