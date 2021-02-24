module.exports = async(cli, code) => {
    const regex = /<pwa-cart(?<params>.*?)\/>/gms
    let match
    const cart = cli.file.readCwd(process.cwd(), 'cart.html')

    while ((match = regex.exec(code)) !== null) {
        code = code.replace(match[0], cart)
    }


    return code
}