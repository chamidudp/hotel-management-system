const router=require("express").Router();
const Booking = require("../models/Booking");
const CarBooking=require("../models/CarBooking");


//routes car booking

//get all bookings from DB
router.route("/").get((req,res)=>{
    CarBooking.find().then((carBookings)=>{
        res.json(carBookings);
    }).catch((err)=>{
        console.log(err);
    })
})



//add new booking to the DB
router.route("/add").post((req,res)=>{
    const vehicle=req.body.vehicle;
    const name=req.body.name;
    const contactNumber=req.body.contactNumber;
    const address=req.body.address;
    const days=req.body.days;
  

    const newCarBooking =new CarBooking({
       vehicle,
       name,
       contactNumber,
       address,
       days
      
  
    }).save().then(()=>{
        res.json("Your Car Booking Successfully added.");
    }).catch((err)=>{
        console.log(err);
    })
  
  })

  // delete booking from db with an id
router.route("/delete/:id").delete((req,res)=>{
    let bookingId =  req.params.id;

    Booking.findByIdAndDelete(bookingId).then(()=>{
        res.json("Car deleted");
    }).catch((err)=>{
        console.log(err);
    })
})


  module.exports=router;
  