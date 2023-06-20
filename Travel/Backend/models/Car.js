const mongoose=require("mongoose");

//model for cars
const carSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    fuelType:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    seats:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
}) 

module.exports = mongoose.model("Car",carSchema);