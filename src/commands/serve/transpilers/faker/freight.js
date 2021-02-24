const faker = require('faker')

module.exports = () => ({
    title: faker.lorem.sentence(),
    price: 'R$ ' + (faker.commerce.price() + '').replace('.', ','),
})