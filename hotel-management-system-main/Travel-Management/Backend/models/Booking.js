const mongoose=require("mongoose");

//model for place bookings
const bookingSchema = new mongoose.Schema({
    
    place:{
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
    persons:{
        type:String,
        required:true,
    },
 
 
 

}) 

module.exports = mongoose.model("Booking",bookingSchema);