import supertest from 'supertest'
import BuildUser from '../framework/fixtures/builder/newUser'

const { faker } = require('@faker-js/faker')

// import faker from ' @faker-js/faker';
// import api from '../framework/services';

describe('Регистрация', () => {
  test('User can register into the system', async () => {
    // todo вынести в helper
    const user = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    // Сгенерировать пользователя
    const r = await supertest('https://try.vikunja.io')
      .post('/api/v1/register')
      .set('Accept', 'application/json')
      .send(user)
    expect(r.status).toEqual(200)
  })
  test('User can register into the system with Builder', async () => {
    // Сгенерировать пользователя
    const user = new BuildUser().addEmail().addPassword().addUsername().generate()

    const r = await supertest('https://try.vikunja.io')
      .post('/api/v1/register')
      .set('Accept', 'application/json')
      .send(user)
    expect(r.status).toEqual(200)
  })

  test('Popular method with filter', async () => {
    const { body } = await supertest('https://trucker.group')
      .get(
        '/api/v2/public/auctions?page=1&page_size=5&filter%5Bexecutor_status_in%5D%5B%5D=auction&filter%5Bexecutor_status_in%5D%5B%5D=timed_out&filter%5Bdistance_gteq%5D=0&filter%5Bdistance_lteq%5D=5000&filter%5Bcargo_weight_gteq%5D=0&filter%5Bcargo_weight_lteq%5D=10000&filter%5Bs%5D=loaded_at%20desc'
      )
      .set('Accept', 'application/json')
      .send()
    const found = body.auctions.find((item) => item.id === 190414)
    expect(found.id).toEqual(190414)
  })
  test('Popular method with flatmap', async () => {
    const { body } = await supertest('https://trucker.group')
      .get(
        '/api/v2/public/auctions?page=1&page_size=5&filter%5Bexecutor_status_in%5D%5B%5D=auction&filter%5Bexecutor_status_in%5D%5B%5D=timed_out&filter%5Bdistance_gteq%5D=0&filter%5Bdistance_lteq%5D=5000&filter%5Bcargo_weight_gteq%5D=0&filter%5Bcargo_weight_lteq%5D=10000&filter%5Bs%5D=loaded_at%20desc'
      )
      .set('Accept', 'application/json')
      .send()
    const arrayOfOrdersArrays = body.auctions.flatMap((auctions) => auctions.orders)
    expect(arrayOfOrdersArrays.length).toBeGreaterThan(1)
  })
})
