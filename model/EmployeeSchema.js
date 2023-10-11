const mongoose = require('mongoose')


const employeeSchema = mongoose.Schema({
    firstname : {
        type: String,
        required: true,
        maxLength: 100
    },
    lastname : {
        type: String,
        required: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50
    },
    gender : {
        type: String,
        required: true,
        maxLength: 25
    },
    salary: {
        type: Number,
        required: true
    }
})

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;