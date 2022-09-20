import api from '../framework/services'

describe('Отправляем http запросы рефакторинг', () => {
  test('Получить список пользователей get api/users 200', async () => {
    const response = await api().Users().get()
    const data = await response.json()
    expect(response.status).toEqual(200)
    expect(data.page).toEqual(1)
  })
  test('Получить список пользователей get api/users 200 supertest', async () => {
    const response = await api().Users().getS()
    expect(response.status).toEqual(200)
    expect(response.body.page).toEqual(1)
  })
  test('Получить список пользователей с query params get api/users 200', async () => {
    const params = new URLSearchParams({
      page: 2
    })
    const response = await api().Users().get(params)
    expect(response.status).toEqual(200)
  })
  test('Создать пользователя post api/users 201', async () => {
    const user = {
      name: 'morpheus',
      job: 'leader'
    }
    const response = await api().Users().create(user)
    expect(response.status).toEqual(201)
  })
})
