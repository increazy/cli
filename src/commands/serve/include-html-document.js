module.exports = (cli, filename) => {
    const html = cli.file.read('../src/commands/serve/template/index.html')
    const file = cli.file.readCwd(process.cwd(), `${filename}.html`)
    const heads = cli.file.readCwd(process.cwd(), 'scripts_head.html')
    const scripts = cli.file.readCwd(process.cwd(), 'scripts_body.html')
    const header = cli.file.readCwd(process.cwd(), 'header.html')
    const footer = cli.file.readCwd(process.cwd(), 'footer.html')
    const modal = cli.file.readCwd(process.cwd(), 'product_modal.html')

    const project = JSON.parse(cli.file.readCwd(process.cwd(), '.increazy/.project'))

    return html
        .replace('{title}', 'Serving: ' + project.name)
        .replace('{body}', header + file + footer + modal)
        .replace('{heads}', heads)
        .replace('{scripts}', scripts)
}