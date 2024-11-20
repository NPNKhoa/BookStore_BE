const BookDAO = require('../DataAccess/BookDAO');
const EmployeeDAO = require('../DataAccess/EmployeeDAO');
const {
  NotFoundError,
  ConflictError,
  CredentialsError,
} = require('../Utils/Error');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

class AuthenticationService {
  async login(loginData) {
    const existingUser = await EmployeeDAO.findByPhone(loginData.phone);

    if (!existingUser) {
      throw new CredentialsError('Not found employee with this phone');
    }

    const isValid = await bcrypt.compare(
      loginData.password,
      existingUser.password
    );

    if (!isValid) {
      throw new CredentialsError('Invalid phone or password');
    }

    const token = jsonwebtoken.sign(
      { userId: existingUser._id },
      'secretjsonwebtokenkey12345678'
    );

    return token;
  }
}

module.exports = new AuthenticationService();
