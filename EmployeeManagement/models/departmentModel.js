const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const Department=new Schema({
    Name: { type:String, required: true, unique: true}
})


module.exports=mongoose.model("departmentModel", Department);