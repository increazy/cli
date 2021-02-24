const envBody = {
    labIndividual: {
        testcase: true,
        shared: false,
        indexed: false
    },
    labShared: {
        testcase: true,
        shared: true,
        indexed: false
    },
    productionWithSeo: {
        testcase: false,
        shared: true,
        indexed: true
    },
    productionWithoutSeo: {
        testcase: false,
        shared: true,
        indexed: false
    },
}

module.exports = async cli => {
    const options = {
        labIndividual: 'Individual test environment',
        labShared: 'Shared test environment',
        productionWithSeo: 'Production environment with ACTIVE SEO',
        productionWithoutSeo: 'Production environment with SEO DISABLED',
    }
    const selected = await cli.input({
        type: 'list',
        message: '🌈 Choose the environment to deploy ',
        choices: Object.values(options)
    })

    const index = Object.values(options).indexOf(selected)
    const env = Object.keys(options)[index]

    return {
        env,
        body: envBody[env]
    }
}