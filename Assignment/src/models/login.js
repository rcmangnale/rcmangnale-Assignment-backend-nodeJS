const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    }
})



const login =new mongoose.model("login",employeeSchema);

module.exports = login;