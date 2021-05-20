const faker = require('faker')

const skuObject = () => ({
    id: faker.random.number(),
    sku: faker.commerce.productMaterial(),
    images: [
        faker.image.imageUrl(600, 600),
        faker.image.imageUrl(600, 600),
        faker.image.imageUrl(600, 600),
        faker.image.imageUrl(600, 600)
    ],
    sale_price: 'R$ ' + (faker.commerce.price() + '').replace('.', ','),
    old_price: 'R$ ' + (faker.commerce.price() + '').replace('.', ','),
    discount: faker.random.number(100),
    installment: {
        number: faker.random.number(10),
        value: 'R$ ' + (faker.commerce.price() + '').replace('.', ',')
    },
})

module.exports = () => ({
    id: faker.random.number(),
    name: faker.commerce.productName(),
    promotional_price: 'R$ ' + (faker.commerce.price() + '').replace('.', ','),
    price: 'R$ ' + (faker.commerce.price() + '').replace('.', ','),
    has_options: false,
    has_skus: false,
    sku: faker.commerce.productMaterial(),
    meta_title: faker.commerce.productName(),
    meta_description: faker.lorem.paragraph(),
    description: faker.lorem.paragraph(),
    images: [
        faker.image.imageUrl(600, 600),
        faker.image.imageUrl(600, 600),
        faker.image.imageUrl(600, 600),
        faker.image.imageUrl(600, 600)
    ],
    image: faker.image.imageUrl(600, 600),
    in_stock: faker.random.boolean(),
    in_search: faker.random.boolean(),
    in_catalog: faker.random.boolean(),
    id_categories: [faker.random.number()],
    skus: [skuObject()],
    'skus[0]': skuObject(),
    installment: {
        number: faker.random.number(10),
        value: 'R$ ' + (faker.commerce.price() + '').replace('.', ',')
    },
    breadcumb: [],
    categories_string: "",
    path: faker.helpers.slugify()
})