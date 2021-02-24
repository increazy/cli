module.exports = async(cli, code) => {
    const regex = /<pwa-hidden-serve(?<params>.*?)>(?<content>.*?)<\/pwa-hidden-serve>/gms
    let match

    while ((match = regex.exec(code)) !== null) {
        code = code.replace(match[0], '')
    }

    return code
}