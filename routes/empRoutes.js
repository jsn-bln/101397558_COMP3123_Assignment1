const express = require('express');
const router = express.Router();
const Employee = require('../model/EmployeeSchema');
const mongoose = require('mongoose');




const isGenderValid = (gender) => {
    return ['male', 'female', 'other'].includes(gender.toLowerCase());
  };



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
    if(!isGenderValid(gender)) {
        res.json({"message" : "gender field must be male/female/other"})
    }
    else{
        const newEmployee = new Employee({
            firstname,
            lastname,
            email,
            gender: gender.toLowerCase(),
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

//ENDPOINT 3
//http://localhost:8080/api/v1/emp/employees/{eid}

router.get('/employees/:eid', (req, res) => {
    const eid = req.params.eid;
    Employee.findOne({_id: eid})
        .then((user) => {
            res.status(200).json({user})
        })
        .catch((err) => {
            res.json({err})
        })
})


//ENDPOINT 4
//http://localhost:8080/api/v1/emp/employees/{eid}

router.put('/employees/:eid', (req, res) => {
    const eid = req.params.eid;
    Employee.findOne({_id: eid})
        .then((user) => {
            // Checks if theres a values passed in body
            // if no values are found then will retain the original value
            user.firstname = req.body.firstname || user.firstname;
            user.lastname = req.body.lastname || user.lastname;
            user.email = req.body.email || user.email;
            user.salary = req.body.salary || user.salary;
            
            // validate gender
            if(req.body.gender != null){
                if(isGenderValid(req.body.gender)){
                    user.gender = req.body.gender.toLowerCase();
                }
            }
                
                

            user.save()
                .then(() => {
                    if(!isGenderValid(req.body.gender) && req.body.gender !== null)
                    {
                        res.status(400).json({'message' : 'invalid gender type, gender wasnt updated!'})
                    }
                    else{
                        res.status(200).json({'message' : 'Employee has been updated!'})
                    }
                })
                .catch((err) => {
                    res.json({err})
                })
        })
        .catch((err) => {
            res.json({err})
        })
})


router.delete('/employees', (req, res) => {
    const eid = req.query.eid

    Employee.deleteOne({_id: eid})
        .then(() => {
            res.status(204).json({'message' : 'Employee deleted successfully!'})
        })
        .catch((err) => {
            res.json({'message' : 'Employee doesnt exist!'})
        })
})







module.exports = router;