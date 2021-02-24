module.exports = async cli => {
    const email = await cli.input('🤗 What is your access email?')
    const password = await cli.input({
        type: 'password',
        message: '👁‍🗨 What is your password?'
    })

    return { email, password }
}