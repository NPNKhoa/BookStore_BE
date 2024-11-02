const EmployeeDAO = require('../DataAccess/EmployeeDAO');
const { NotFoundError, ConflictError } = require('../Error.js');

class EmployeeService {
  async createEmployee(employeeData) {
    return await EmployeeDAO.create(employeeData);
  }

  async getEmployeeById(id) {
    const employee = await EmployeeDAO.findById(id);

    if (!employee) {
      throw new NotFoundError('Employee not found');
    }

    return employee;
  }

  async updateEmployee(id, updateData) {
    const employee = await EmployeeDAO.update(id, updateData);

    if (!employee) {
      throw new NotFoundError('Employee not found');
    }

    return employee;
  }

  async deleteEmployee(id) {
    const employee = await EmployeeDAO.delete(id);

    if (!employee) {
      throw new NotFoundError('Employee not found');
    }

    return employee;
  }

  async getAllEmployees() {
    return await EmployeeDAO.findAll();
  }
}

module.exports = new EmployeeService();
