const faker = require('faker')

module.exports = () => ({
    id: faker.random.number(),
    name: faker.commerce.productMaterial(),
    meta_title: faker.commerce.productMaterial(),
    level: faker.random.number(),
    meta_description: faker.commerce.productDescription(),
    in_menu: faker.random.boolean(),
    breadcumb: [],
    path: faker.helpers.slugify()
})