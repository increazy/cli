const compile = require('./compile')

module.exports = (cli, program) => {
  program
      .command('pre-css-compile')
      .description('Compile Sass or Less preprocessors')
      .action(async() => {
        compile(cli)
      })
}