const faker = require('faker')

module.exports = () => ({
    label: faker.commerce.color(),
    name: faker.commerce.color(),
    value: faker.commerce.color(),
    count: faker.random.number(),
})