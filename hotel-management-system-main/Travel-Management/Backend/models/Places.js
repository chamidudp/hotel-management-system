const mongoose=require("mongoose");

//model for place
const placeSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    days:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    activities:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    }
    
}) 

module.exports = mongoose.model("Place",placeSchema);