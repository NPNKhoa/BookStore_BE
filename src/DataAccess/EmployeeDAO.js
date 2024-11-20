const Employee = require('../Models/Employee');

class EmployeeDAO {
  async create(employeeData) {
    const employee = new Employee(employeeData);
    return await employee.save();
  }

  async findById(id) {
    return await Employee.findById(id);
  }

  async update(id, updateData) {
    return await Employee.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await Employee.findByIdAndDelete(id);
  }

  async findAll() {
    return await Employee.find();
  }

  async findByPhone(phone) {
    return await Employee.findOne({ phone });
  }
}

module.exports = new EmployeeDAO();
