const faker = require('faker')

const getRandomValue = value => {
    value = value.toLowerCase()

    if (value.includes('price')) return 'R$ ' + (faker.commerce.price() + '').replace('.', ',')
    if (value.includes('quantity')) return faker.random.number(10)
    return faker.random.word()
}

module.exports = (value) => {
    const oldValue = value
    value = value.trim().replace(/\n/g, '').split(' ')[0]
    value = value.trim().split('.')

    const fakers = {
        $paginate: require('./filter'),
        filter: require('./filter'),
        category: require('./category'),
        bc: require('./category'),
        option: require('./freight'),
        freight: require('./freight'),
        product: require('./product'),
        suggest: require('./product'),
        kit: require('./product'),
        linked: require('./product'),
        $user: require('./user'),
        $cart: require('./cart'),
        activeSKU: require('./product')().skus[0],
    }

    const entity = value[0]
    const parts = value.slice(1)

    if (!(entity in fakers)) return getRandomValue(oldValue)

    let response = typeof fakers[entity] === 'function' ? fakers[entity]() : fakers[entity]
    for (const part of parts) {
        if (!(part in response)) return getRandomValue(oldValue)
        response = response[part]
        if (typeof response !== 'object') break
    }

    return response
}