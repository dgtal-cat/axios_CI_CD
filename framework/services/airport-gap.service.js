import { config } from '../config/airport-gap.config'

const axios = require('axios').default

export const airportGap = {
  getToken: config.token,
  getEmail: config.email,
  getPassword: config.password,
  getAllAirports: async () => {
    const resp = await axios.get(config.baseUrl + '/airports')
    return resp.data.data
  },
  getAirportById: async (id) => {
    try {
      const resp = await axios.get(config.baseUrl + `/airports/${id}`)
      return resp.data.data
    } catch (axiosError) {
      return axiosError
    }
  },
  getDistanceBetweenAirports: async (airportA, airportB) => {
    const resp = await axios({
      method: 'post',
      url: config.baseUrl + '/airports/distance',
      data: {
        from: airportA,
        to: airportB
      }
    })
    return resp.data.data
  },
  checkTokenFromApi: async (email, password) => {
    try {
      const resp = await axios({
        method: 'post',
        url: config.baseUrl + '/tokens',
        data: {
          email: email,
          password: password
        }
      })
      return resp.data.token
    } catch (axiosError) {
      return axiosError.response
    }
  },
  addAirportToFavorites: async (airportId, note = null) => {
    const resp = await axios({
      method: 'post',
      headers: {
        Authorization: `Bearer ${config.token}`
      },
      url: config.baseUrl + '/favorites',
      data: {
        airport_id: airportId,
        note: note
      }
    })
    return resp.data.data
  },
  updateNote: async (id, note) => {
    const resp = await axios({
      method: 'patch',
      headers: {
        Authorization: `Bearer ${config.token}`
      },
      url: config.baseUrl + `/favorites/${id}`,
      data: {
        note: note
      }
    })
    return resp.data.data
  },
  getFavoritesList: async () => {
    const resp = await axios({
      method: 'get',
      headers: {
        Authorization: `Bearer ${config.token}`
      },
      url: config.baseUrl + '/favorites'
    })
    return resp.data
  },
  deleteAirportFromFavorites: async (airportId) => {
    const resp = await axios({
      method: 'delete',
      headers: {
        Authorization: `Bearer ${config.token}`
      },
      url: config.baseUrl + '/favorites/clear_all'
    })
    return resp
  },
  clearFavorites: async () => {
    const resp = await axios({
      method: 'delete',
      headers: {
        Authorization: `Bearer ${config.token}`
      },
      url: config.baseUrl + '/favorites/clear_all'
    })
    return resp
  }
}
