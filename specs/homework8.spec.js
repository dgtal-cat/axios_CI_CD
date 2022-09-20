import { airportGap } from '../framework/services/airport-gap.service'

describe('Базовая проверка работы API', () => {
  test('Проверяем, что при запросе аэропортов ответ от API успешный', async () => {
    const result = await airportGap.getAllAirports()
    expect(typeof result).toEqual('object')
  })
})

describe('Получение аэропорта по ID', () => {
  test('ID аэропорта в ответе соответствует запрошенному', async () => {
    const result = await airportGap.getAirportById('KIX')
    expect(result.id).toEqual('KIX')
  })

  test('Город аэропорта в ответе соответствует запрошенному', async () => {
    const result = await airportGap.getAirportById('KIX')
    expect(result.attributes.city).toEqual('Osaka')
  })

  // негативная проверка при отправке несуществующего ID аэропорта
  test.only('Возвращение ошибки при отправке некорректного ID', async () => {
    const result = await airportGap.getAirportById('ФЫВ')
    expect(result.code).toBe('ERR_UNESCAPED_CHARACTERS')
  })
})

describe('Проверка расчета дистанции между аэропортами', () => {
  // проверка дистанции в км
  test('Дистанция между GKA и YBR равна 12273.353367816571 км', async () => {
    const result = await airportGap.getDistanceBetweenAirports('GKA', 'YBR')
    expect(result.attributes.kilometers).toEqual(12273.353367816571)
  })

  // проверим, что наоборот дистанция такая же
  test('Дистанция между YBR и GKA равна 12273.353367816571 км', async () => {
    const result = await airportGap.getDistanceBetweenAirports('YBR', 'GKA')
    expect(result.attributes.kilometers).toEqual(12273.353367816571)
  })

  // проверка дистанции в милях
  test('Дистанция между KIX и MAG равна 2821.506289782851 миль', async () => {
    const result = await airportGap.getDistanceBetweenAirports('KIX', 'MAG')
    expect(result.attributes.miles).toEqual(2821.506289782851)
  })
})

describe('Проверка API токена', () => {
  test('Возвращение токена по email и password', async () => {
    const result = await airportGap.checkTokenFromApi(airportGap.getEmail, airportGap.getPassword)
    expect(result).toEqual(airportGap.getToken)
  })

  // негативная проверка на возвращение токена при некорректных кредах
  test('Возвращение ошибки при некорректных email и password', async () => {
    const result = await airportGap.checkTokenFromApi('fake@email.com', 'fakePassword111')
    expect(result.status).toBe(401)
    expect(result.statusText).toBe('Unauthorized')
  })
})

describe('Работа с избранными аэропортами', () => {
  // очищаем избранное перед каждой проверкой для корректности
  beforeEach(async () => await airportGap.clearFavorites())

  test('Добавление аэропорта в избранное', async () => {
    const result = await airportGap.addAirportToFavorites('YBR')
    expect(result.attributes.airport.iata).toEqual('YBR')
  })

  test('Добавление аэропорта в избранное с заметкой', async () => {
    const result = await airportGap.addAirportToFavorites('KIX', 'Тестовая заметка для KIX')
    expect(result.attributes.note).toEqual('Тестовая заметка для KIX')
  })

  test('Добавление с заметкой и обновление заметки', async () => {
    // добавляем в избранное аэропорт с заметкой
    const addedAirpot = await airportGap.addAirportToFavorites('KIX', 'Тестовая заметка для KIX')

    // обновляем запись
    const result = await airportGap.updateNote(addedAirpot.id, 'Измененная заметка для KIX')
    expect(result.attributes.note).toEqual('Измененная заметка для KIX')
  })

  test('Получение списка избранных аэропортов', async () => {
    // добавляем 2 аэропорта в избранное
    await airportGap.addAirportToFavorites('KIX')
    await airportGap.addAirportToFavorites('MAG')

    // проверяем наличие списка и соответствие кол-ва записей
    const result = await airportGap.getFavoritesList()
    expect(result.data.length).toEqual(2)
  })

  test('Удаление аэропорта из избранного', async () => {
    // добавляем в избранное аэропорт с заметкой
    const addedAirpot = await airportGap.addAirportToFavorites('MAG')

    // удаляем добавленный аэропорт
    const result = await airportGap.deleteAirportFromFavorites(addedAirpot.id)

    // проверяем статус ответа при удалении
    expect(result.status).toEqual(204)

    // запрашиваем избранное ещё раз
    const favoritesList = await airportGap.getFavoritesList()

    // проверяем, что список избраноого пуст
    expect(favoritesList.data.length).toBe(0)
  })

  test('Очистка избранного успешно', async () => {
    // добавляем 2 аэропорта в избранное
    await airportGap.addAirportToFavorites('KIX')
    await airportGap.addAirportToFavorites('MAG')

    // очищаем избранное
    const result = await airportGap.clearFavorites()

    // проверяем статус ответа при удалении
    expect(result.status).toEqual(204)

    // запрашиваем избранное ещё раз
    const favoritesList = await airportGap.getFavoritesList()

    // проверяем, что список избраноого пуст
    expect(favoritesList.data.length).toBe(0)
  })
})
