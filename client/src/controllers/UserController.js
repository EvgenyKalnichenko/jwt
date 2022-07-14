import AuthService from '@/services/AuthService'
import User from '@/models/User'
import { API_URL } from '@/http'
import { ref } from 'vue'
import axios from 'axios'

export default function UserController () {
  const user = ref(null)
  const isAuth = ref(false)
  const setUsers = (response) => {
    localStorage.setItem('token', response.data.accessToken)
    isAuth.value = true
    user.value = new User(response.data.user)
  }
  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password)
      setUsers(response)
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }
  const registration = async (email, password) => {
    try {
      const response = await AuthService.registration(email, password)
      setUsers(response)
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }
  const logout = async () => {
    try {
      await AuthService.logout()
      localStorage.removeItem('token')
      isAuth.value = false
      user.value = null
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }
  const checkAuth = async () => {
    try {
      const response = await axios.get('/refresh', {
        withCredentials: true,
        baseURL: API_URL
      })
      setUsers(response)
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }
  return {
    login,
    registration,
    logout,
    checkAuth,
    user,
    isAuth
  }
}
