import { account, bookStore } from '../framework/services/bookstore.service'

describe('Тесты авторизации', () => {
  test('Проверка авторизации тестового пользователя', async () => {
    const result = await account.isAuthorized(account.getUsername, account.getPassword)
    expect(result.status).toBe(200)
  })

  test('Негативная проверка авторизации', async () => {
    const result = await account.isAuthorized('fakeName', 'fakePass')
    expect(result.status).toBe(404)
  })
})

describe('Тесты книжного магазина', () => {
  test('Получение списка книг', async () => {
    const result = await bookStore.getBooks()
    expect(result.books.length).not.toBe(0)
  })

  test.each`
    title                                          | isbn
    ${'Git Pocket Guide'}                          | ${'9781449325862'}
    ${'Learning JavaScript Design Patterns'}       | ${'9781449331818'}
    ${'Designing Evolvable Web APIs with ASP.NET'} | ${'9781449337711'}
    ${'Speaking JavaScript'}                       | ${'9781449365035'}
    ${'Книга не найдена'}                          | ${'9595959595959'}
    ${'Книга не найдена'}                          | ${'1111111222222'}
  `('Проверка метода получения названия книги по ISBN', async ({ isbn, title }) => {
    expect(await bookStore.getBookTitleByIsbn(isbn)).toBe(title)
  })
})
