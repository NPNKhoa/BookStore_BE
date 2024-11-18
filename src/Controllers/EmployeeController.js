const EmployeeService = require('../Services/EmployeeService');
const { validateEmployee } = require('../Validators/EmployeeValidator');
const { validateObjectId } = require('../Validators/commonValidators');
const handleError = require('../Utils/handleError');
const { NotFoundError } = require('../Utils/Error');

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
    const idError = validateObjectId(req.params.employeeId);

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
    const idError = validateObjectId(req.params.employeeId);

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
    const idError = validateObjectId(req.params.employeeId);

    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    try {
      await EmployeeService.deleteEmployee(req.params.employeeId);

      res.sendStatus(204);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getAllEmployees(_, res) {
    try {
      const employees = await EmployeeService.getAllEmployees();

      if (Array.isArray(employees) && employees.length === 0) {
        throw new NotFoundError('Can not found any employees');
      }

      res.status(200).json(employees);
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = new EmployeeController();
