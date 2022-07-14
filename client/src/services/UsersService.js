import $api from '@/http'

export default class UsersService {
  static async fetchUsers () {
    return $api.get('/users')
  }
}
