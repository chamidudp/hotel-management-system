const router=require("express").Router();
const Booking=require("../models/Booking");


//routes for place booking

//get all bookings from DB
router.route("/").get((req,res)=>{
    Booking.find().then((bookings)=>{
        res.json(bookings);
    }).catch((err)=>{
        console.log(err);
    })
})



//add new booking to the DB
router.route("/add").post((req,res)=>{
    const place=req.body.place;
    const name=req.body.name;
    const contactNumber=req.body.contactNumber;
    const address=req.body.address;
    const persons=req.body.persons;
  

    const newBooking =new Booking({
       place,
       name,
       contactNumber,
       address,
       persons
      
  
    }).save().then(()=>{
        res.json("Your Booking Successfully added.");
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
  