const router=require("express").Router();
const Car = require("../models/Car");
const multer = require("multer");

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .png and .jpeg format allowed!"));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter: fileFilter,
});
//all routes of the car rental page backend

//get all cars from DB
router.route("/").get((req,res)=>{
    Car.find().then((cars)=>{
        res.json(cars);
        
    }).catch((err)=>{
        console.log(err)
    })
})

//find car by ID
router.route("/find/:id").get((req,res)=>{
    let carID =  req.params.id;

    Car.findById(carID).then((response)=>{
        res.json(response);
    }).catch((err)=>{
        console.log(err);
    })
})

//add a car to the DB
router.route("/add").post(upload.single("image"), (req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const fuelType = req.body.fuelType;
    const price = req.body.price;
    const seats = req.body.seats;
    const image = req.file.path; // the path to the uploaded file
    console.log(req.body);
    const newCar = new Car({
      name,
      type,
      fuelType,
      price,
      seats,
      image,
    })
      .save()
      .then(() => {
        res.json("New Car Added");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  

// delete car from db with an id
router.route("/delete/:id").delete((req,res)=>{
    let carID =  req.params.id;

    Car.findByIdAndDelete(carID).then(()=>{
        res.json("Car deleted");
    }).catch((err)=>{
        console.log(err);
    })
})

//update car details with an id

router.route("/update/:id").put((req,res)=>{
    let carID = req.params.id;

    const {name,type,fuelType,price,seats,image} = req.body;

    const updateCar={
        name,
        type,
        fuelType,
        price,
        seats,
        image
    }

    Car.findByIdAndUpdate(carID,updateCar).then(()=>{
        res.json("Car details updated");
    }).catch((err)=>{
        console.log(err);
    })

})


module.exports=router;