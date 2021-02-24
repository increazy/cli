const faker = require('faker')

module.exports = () => ({
    id: faker.random.number(),
    total: 'R$ ' + (faker.commerce.price() + '').replace('.', ','),
    subtotal: 'R$ ' + (faker.commerce.price() + '').replace('.', ','),
    discount: faker.random.number(100),
    delivery_price: 'R$ ' + (faker.commerce.price() + '').replace('.', ','),
    coupon: faker.random.word(),
    count: faker.random.number(100),
    items: [{
        id: faker.random.number(),
        name: faker.commerce.productName(),
        price: 'R$ ' + (faker.commerce.price() + '').replace('.', ','),
        discount: faker.random.number(100),
        quantity: faker.random.number(10),
        total: 'R$ ' + (faker.commerce.price() + '').replace('.', ','),
        path: faker.helpers.slugify(),
        image: faker.image.imageUrl()
    }]
})