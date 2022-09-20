const axios = require('axios').default

const config = {
  baseUrl: 'https://airportgap.dev-tester.com/api',
  token: 'RXCQnnvWqnzB2Q9etDYcy5Ff'
}

describe('Базовая проверка работы API', () => {
  test('Проверяем, что при запросе аэропортов ответ от API успешный', async () => {
    const response = await axios.get(config.baseUrl + '/airports', {
      headers: {
        Authorization: `Bearer token=${config.token}`
      }
    })
    expect(response.status).toEqual(200)
  })

  test('Проверяем, что при запросе аэропортов в ответе от API пришел объект', async () => {
    const response = await axios.get(config.baseUrl + '/airports', {
      headers: {
        Authorization: `Bearer token=${config.token}`
      }
    })

    //  Заходим внутрь ответа (data > data), чтобы проверить, что мы получили объект именно в качестве ответа от API, а не сам объект response
    expect(typeof response.data.data).toEqual('object')
  })
})

describe('Получение аэропорта по ID', () => {
  test('Успешный ответ при запросе аэропорта', async () => {
    const response = await axios.get(config.baseUrl + '/airports/KIX', {
      headers: {
        Authorization: `Bearer token=${config.token}`
      }
    })
    expect(response.status).toEqual(200)
  })

  test('ID аэропорта в ответе соответствует запрошенному', async () => {
    const response = await axios.get(config.baseUrl + '/airports/KIX', {
      headers: {
        Authorization: `Bearer token=${config.token}`
      }
    })
    expect(response.data.data.id).toEqual('KIX')
  })

  test('Город аэропорта в ответе соответствует запрошенному', async () => {
    const response = await axios.get(config.baseUrl + '/airports/KIX', {
      headers: {
        Authorization: `Bearer token=${config.token}`
      }
    })
    expect(response.data.data.attributes.city).toEqual('Osaka')
  })
})

describe('Проверка расчета дистанции между аэропортами', () => {
  // проверка дистанции в км
  test('Дистанция между GKA и YBR равна 12273.353367816571 км', async () => {
    const response = await axios({
      method: 'post',
      headers: {
        Authorization: `Bearer token=${config.token}`
      },
      url: config.baseUrl + '/airports/distance',
      data: {
        from: 'GKA',
        to: 'YBR'
      }
    })
    expect(response.data.data.attributes.kilometers).toEqual(12273.353367816571)
  })

  // проверим, что наоборот дистанция такая же
  test('Дистанция между YBR и GKA равна 12273.353367816571 км', async () => {
    const response = await axios({
      method: 'post',
      headers: {
        Authorization: `Bearer token=${config.token}`
      },
      url: config.baseUrl + '/airports/distance',
      data: {
        from: 'YBR',
        to: 'GKA'
      }
    })
    expect(response.data.data.attributes.kilometers).toEqual(12273.353367816571)
  })

  // проверка дистанции в милях
  test('Дистанция между KIX и MAG равна 2821.506289782851 миль', async () => {
    const response = await axios({
      method: 'post',
      headers: {
        Authorization: `Bearer token=${config.token}`
      },
      url: config.baseUrl + '/airports/distance',
      data: {
        from: 'KIX',
        to: 'MAG'
      }
    })
    expect(response.data.data.attributes.miles).toEqual(2821.506289782851)
  })
})
