const { phone } = require('faker')
const faker = require('faker')

module.exports = () => ({
    id: faker.random.number(),
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    cpf: '000.000.000-00',
    store: faker.random.number(),
    corporateDocument: '00.000.000/0000-00',
    social: faker.company.companyName(),
    fantasy: faker.company.companyName(),
    cartIdSaved: faker.random.number(),
    phone: faker.phone.phoneNumber()
})