const express = require('express')
const fs = require('fs')
const generateCss = require('./generate-css')
const generateEngine = require('./generate-engine')
const generateHooks = require('./generate-hooks')
const generateJs = require('./generate-js')
const includeHtmlDocument = require('./include-html-document')
const resetServeFolder = require('./reset-serve-folder')
const rimraf = require('rimraf')
const path = require('path')
const transpilers = require('./transpilers')

module.exports = (cli, program) => {
    program
        .command('serve')
        .description('See a preview of the pwa layout ')
        .action(async() => {
            const serveFolder = resetServeFolder(cli)
            const app = express()

            app.use('/static', express.static(serveFolder))
            app.use('/drive', express.static(process.cwd() + '/drive'))

            const action = async(page, res) => {
                const serveFolder = path.resolve(process.cwd(), '.increazy/.serve')
                if (fs.existsSync(serveFolder)) {
                    rimraf.sync(serveFolder)
                }

                fs.mkdirSync(serveFolder, { recursive: true })
                generateCss(cli)
                generateJs(cli)
                generateHooks(cli)
                generateEngine(cli)

                const code = includeHtmlDocument(cli, page)
                const codeTransformed = await transpilers(cli, code)

                res.set('Content-Type', 'text/html')
                res.send(Buffer.from(codeTransformed))
            }

            app.get('/', async(req, res) => {
                await action('home', res)
            })

            app.get('/product', async(req, res) => {
                await action('product', res)
            })

            app.get('/category', async(req, res) => {
                await action('category', res)
            })

            app.get('/search', async(req, res) => {
                await action('search', res)
            })

            app.get('/p/:page', async(req, res) => {
                await action('pages/' + req.params.page, res)
            })

            app.listen(9000, () => {
                cli.echo('green', '🌍 Preview can be seen on http://localhost:9000')
            })
        })
}