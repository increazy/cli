const srcTransform = require('../_utils/src-transform')

module.exports = async(cli, code) => {
    return srcTransform(code, /pwa-src="(?<src>.*?)"/gm, 'src="%"')
}