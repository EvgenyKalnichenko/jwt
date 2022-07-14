export default class User {
  constructor (data) {
    this.id = data.id
    this.email = data.email
    this.isActivated = data.isActivated
  }
}
