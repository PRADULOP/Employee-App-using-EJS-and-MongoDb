const express = require('express');
const mongoose = require('mongoose');
const Employee = require('..//model/employee'); 
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Home route: Display all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();  
        res.render('pages/home', { employees });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching employee data');
    }
});

// Add Employee route (GET)
router.get('/add', (req, res) => {
    res.render('pages/add');
});


// Add Employee route (POST) - Insert new employee to the database
router.post('/add', async (req, res) => {
    const { employeeName, employeeDesignation, employeeLocation, salary } = req.body;

    try {
        const newEmployee = new Employee({
            employeeName,
            employeeDesignation,
            employeeLocation,
            salary
        });

       
        await newEmployee.save();
        
        
        res.redirect('/');
    } catch (error) {
        console.log(error);  
        res.status(500).send('Error adding employee');
    }
});



// Delete Employee route (POST) - Delete an employee by ID
router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await Employee.findByIdAndDelete(id);  
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error deleting employee');
    }
});


// Update Employee route (GET) - Display the employee data to edit
router.get('/update/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const employee = await Employee.findById(id);  
        if (employee) {
            res.render('pages/update', { employee });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching employee for update');
    }
});


// Update Employee route (POST) - Update employee data
router.post('/update/:id', async (req, res) => {
    const id = req.params.id;
    const { employeeName, employeeDesignation, employeeLocation, salary } = req.body;

    try {
        await Employee.findByIdAndUpdate(id, {
            employeeName,
            employeeDesignation,
            employeeLocation,
            salary: parseInt(salary),
        });  
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating employee');
    }
});

module.exports = router;
