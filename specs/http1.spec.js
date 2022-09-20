import fetch from 'node-fetch'

const URL = 'https://reqres.in/'

describe('Отправляем http запросы', () => {
    test('Получить список пользователей get api/users 200', async () => {
        const path = 'api/users'
        const response = await fetch(URL + path, { method: 'GET' })
        const data = await response.json()
        expect(response.status).toEqual(200)
        expect(data.page).toEqual(1)
    })
    test('Получить список пользователей с query params get api/users 200', async () => {
        const path = 'api/users?'
        const params = new URLSearchParams({
            page: 2
        })

        const { status } = await fetch(URL + path + params, { method: 'GET' })
        expect(status).toEqual(200)
    })
    test('Создать пользователя post api/users 201', async () => {
        const path = 'api/users'
        const user = {
            name: 'morpheus',
            job: 'leader'
        }
        const response = await fetch(URL + path, { method: 'POST', body: JSON.stringify(user) })
        expect(response.status).toEqual(201)
    })
})
