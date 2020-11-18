'use strict'
const User = use('App/Models/User')
class AuthController {
  async store({ request, response, auth }) {
    const { email, password } = request.all()
    const user = await User.findBy('email', email)
    const token = auth.attempt(email, password, { isAdmin: user.isAdmin })
    return token
  }
}

module.exports = AuthController
