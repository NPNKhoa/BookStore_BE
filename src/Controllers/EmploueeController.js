const EmployeeService = require('../Services/EmployeeService');
const { validateEmployee } = require('../Validators/EmployeeValidator');
const { validateObjectId } = require('../Validators/commonValidators');
const handleError = require('../handleError');

class EmployeeController {
  async createEmployee(req, res) {
    const { error } = validateEmployee(req.body);

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    try {
      const employee = await EmployeeService.createEmployee(req.body);

      res.status(201).json(employee);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getEmployeeById(req, res) {
    const { error: idError } = validateObjectId(req.params.employeeId);

    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    try {
      const employee = await EmployeeService.getEmployeeById(
        req.params.employeeId
      );

      res.status(200).json(employee);
    } catch (error) {
      handleError(error, res);
    }
  }

  async updateEmployee(req, res) {
    const { error: idError } = validateObjectId(req.params.employeeId);

    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    const { error } = validateEmployee(req.body);

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    try {
      const employee = await EmployeeService.updateEmployee(
        req.params.employeeId,
        req.body
      );

      res.status(200).json(employee);
    } catch (error) {
      handleError(error, res);
    }
  }

  async deleteEmployee(req, res) {
    const { error: idError } = validateObjectId(req.params.employeeId);

    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    try {
      await EmployeeService.deleteEmployee(req.params.employeeId);

      res.status(204);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getAllEmployees(req, res) {
    try {
      const employees = await EmployeeService.getAllEmployees();

      res.status(200).json(employees);
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = new EmployeeController();
