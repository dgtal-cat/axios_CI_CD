// закинул сюда запрос в апи просто в функцию для более удобного логирования и выявления своих ошибок при запросах в тестах

const axios = require('axios').default

const ENV = {
  baseUrl: 'https://airportgap.dev-tester.com/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer token=RXCQnnvWqnzB2Q9etDYcy5Ff'
  }
}

const test = async () => {
  const resp = await axios({
    method: 'post',
    headers: ENV.headers,
    url: ENV.baseUrl + '/airports/distance',
    data: {
      from: 'GKA',
      to: 'YBR'
    }
  })

  console.log(resp)
}

test()
