const faker = require('faker')

module.exports = () => ({
    title: faker.random.word(),
    value: faker.commerce.productMaterial(),
    price: 'R$ ' + (faker.commerce.price() + '').replace('.', ','),
})