const AuthenticationService = require('../Services/AuthenticationService');
const handleError = require('../Utils/handleError');
const { validateLogin } = require('../Validators/LoginValidator');

class BookController {
  async login(req, res) {
    const { error } = validateLogin(req.body);

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    try {
      const token = await AuthenticationService.login(req.body);

      res.status(201).json({ token });
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = new BookController();
