import { config } from '../config/bookstore.config'

const axios = require('axios').default

export const account = {
  getUsername: config.username,
  getPassword: config.password,
  isAuthorized: async (username, password) => {
    try {
      const resp = await axios({
        method: 'post',
        url: config.baseUrl + '/Account/v1/Authorized',
        data: {
          userName: username,
          password: password
        }
      })
      return resp
    } catch (axiosError) {
      return axiosError.response
    }
  }
}

export const bookStore = {
  getBooks: async () => {
    const resp = await axios.get(config.baseUrl + '/BookStore/v1/Books')
    return resp.data
  },
  getBookTitleByIsbn: async (isbn) => {
    const resp = await axios.get(config.baseUrl + '/BookStore/v1/Books')
    const bookByIsbn = await resp.data.books.find((book) => book.isbn === isbn)
    if (bookByIsbn !== undefined) {
      return bookByIsbn.title
    } else return 'Книга не найдена'
  }
}
