const faker = require('faker')

module.exports = () => ({
    id: faker.random.number(),
    name: faker.commerce.productMaterial(),
    meta_title: faker.commerce.productMaterial(),
    level: faker.random.number(),
    meta_description: faker.lorem.paragraph(),
    description: faker.lorem.paragraph(),
    in_menu: faker.random.boolean(),
    breadcumb: [],
    path: faker.helpers.slugify()
})