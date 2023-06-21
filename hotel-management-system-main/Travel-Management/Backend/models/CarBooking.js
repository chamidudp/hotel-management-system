const mongoose=require("mongoose");

//model for car booking
const CarbookingSchema = new mongoose.Schema({
    
    vehicle:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    days:{
        type:String,
        required:true,
    },
 
 
 

}) 

module.exports = mongoose.model("Carbooking",CarbookingSchema);