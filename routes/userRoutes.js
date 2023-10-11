const express = require('express');
const router = express.Router();
const User = require('../model/UserSchema');
require('dotenv').config();
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

// ENDPOINT 1 (SIGNUP)
// http://localhost:8080/api/v1/user/signup
router.post('/signup', (req, res) => {
    const {username, email, password} = req.body

    // Check if there isnt a mongodb connection 
    if(mongoose.connection.readyState !== 1){
        res.status(201).json({"message" : "user created but not saved into the database"})
    }

    // IF CONNECTED TO  MONGODB
    // Check whether password field is empty and hash it before
    // passing it into User
    if(password.length > 0){
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) return;
            const newUser = new User({
                username,
                email,
                password: hash
            })

            newUser
                .save()
                .then(() => {
                    console.log('User saved to the database');
                    res.status(201).json({ message: 'User registered successfully' });
                })
                .catch((error) => {
                    console.error('Error saving user:', error);
                    res.status(500).json({ error: 'User registration failed' });
                });  
        })
    }
})

// ENDPOINT 2 (LOGIN)
//http://localhost:8080/api/v1/user/login
router.post('/login', (req ,res) => {
    const {username, email, password} = req.body;

    if(mongoose.connection.readyState !== 1){
        res.status(503).json({"message" : "Dataabse connection is required to use this endpoint."})
    }

    // Finds username or password that matches the payload
    User.findOne({$or: [{username}, {email}]})
        .then((user) => {
            //chech if user exist
            if(user == null){ 
                res.status(404).json({
                    "status": false,
                    "message": "Invalid Username and password"
                })
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                  res.json({err})
                } else {
                  if (result === true) {
                    res.status(200).json({
                        "status" : true,
                        "username" : user.username,
                        "message" : "User logged in successfully"
                    })

                  } else {
                    res.status(404).json({
                        "status": false,
                        "message": "Invalid Username and password"
                    })
                  }
                }
              });


        })
        .catch((err) => {
            res.json({err})
        })

})



module.exports = router;