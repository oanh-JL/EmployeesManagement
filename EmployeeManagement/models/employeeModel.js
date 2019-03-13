const mongoose= require("mongoose");
const Schema=mongoose.Schema;
const User= require("./userModel");
const Department= require("./departmentModel")
const Employee= new Schema({
    Name:{type: String, required:true},
    DateofBirth: {type: String, required:true},
    Address:{type: String, required:true},
    Gender:{type: String, required:true},
    PhoneNumber:{type: Number, required: true},
    Position: {type: String, required: true},
    User:{type:mongoose.Schema.ObjectId, ref:'User', required:true, unique: true},
    Department :{type: mongoose.Schema.ObjectId, ref:'Department', required:true} 

});

module.exports= mongoose.model("employeeModel", Employee);