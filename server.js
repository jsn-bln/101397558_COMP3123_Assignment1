const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = require('./model/UserSchema')


require('dotenv').config();


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

const uri = process.env.URI

mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}); 
const db = mongoose.connection;
db.once('open', () => {
    console.log("Connected to MongoDb!")
})



// ROUTES
// ENDPOINT 1 (SIGNUP)
// http://localhost:8080/api/v1/user/signup
app.post('/api/v1/user/signup', (req, res) => {
    const {username, email, password} = req.body

    // Check if there isnt a mongodb connection 
    if(mongoose.connection.readyState !== 1){
        //Validation 
        res.status(201).json({"message" : "user created"})

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
app.post('/api/v1/user/login', (req ,res) => {

})








app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`))