const express = require('express');
const router = express.Router();
const Employee = require('../model/EmployeeSchema');
const mongoose = require('mongoose');

//ENDPOINT 1
// http://localhost:8080/api/v1/emp/employees

router.get('/employees', (req ,res) => {
    Employee.find({})
        .then((emps) => {
            res.status(200).json({emps})
        })
        .catch((err) => {
            res.json({err})
        })
})


//ENDPOINT 2
// http://localhost:8080/api/v1/emp/employees
router.post('/employees', (req, res) => {
    const {firstname, lastname, email, gender, salary} = req.body

    //validate gender
    if(gender.toLowerCase() !== "male" && gender.toLowerCase() !== "female"
        && gender.toLowerCase() !== "other") {
        res.json({"message" : "gender field must be male/female/other"})
    }
    else{
        const newEmployee = new Employee({
            firstname,
            lastname,
            email,
            gender,
            salary
        })
    
        newEmployee
            .save()
            .then(() => {
                console.log('Employee saved to the database');
                res.status(201).json({ message: 'Employee added successfully.' });
            })
            .catch((error) => {
                res.status(500).json({ error: 'Employee failed to be added.' });
            }); 
    }
})







module.exports = router;