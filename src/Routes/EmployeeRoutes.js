const express = require('express');
const EmployeeController = require('../Controllers/EmployeeController.js');

const router = express.Router();

router.post('/', EmployeeController.createEmployee);

router.get('/', EmployeeController.getAllEmployees);

router.get('/:employeeId', EmployeeController.getEmployeeById);

router.put('/:employeeId', EmployeeController.updateEmployee);

router.delete('/:employeeId', EmployeeController.deleteEmployee);

module.exports = router;
