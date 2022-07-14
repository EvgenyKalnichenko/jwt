import axios from 'axios'

export const API_URL = 'http://localhost:5000/api'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use((config) => {
  return config
}, async (error) => {
  const originalRequest = error.config
  if (error.response.status === 401 && error.config && !error.config._isRetru) {
    originalRequest._isRetru = true
    try {
      const response = await axios.get('/refresh', {
        withCredentials: true,
        baseURL: API_URL
      })
      localStorage.setItem('token', response.data.accessToken)
      return $api.request(originalRequest)
    } catch (e) {
      console.log('Пользователь не авторизован!')
    }
  }
  throw error
})

export default $api
