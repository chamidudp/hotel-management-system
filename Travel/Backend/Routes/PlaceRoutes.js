const router=require("express").Router();
const Place=require("../models/Places");
const multer = require("multer");

// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "placesImages/");
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

//all routes of the tourist places page backend

//get all places from DB
router.route("/").get((req,res)=>{
    Place.find().then((places)=>{
        res.json(places);
    }).catch((err)=>{
        console.log(err);
    })
})

//find place by ID
router.route("/find/:id").get((req,res)=>{
    let placeID =  req.params.id;

    Place.findById(placeID).then((response)=>{
        res.json(response);
    }).catch((err)=>{
        console.log(err);
    })
})

//add new place to the DB
router.route("/add").post(upload.single("image"),(req,res)=>{
    const name=req.body.name;
    const description=req.body.description;
    const days=req.body.days;
    const price=req.body.price;
    const activities=req.body.activities;
    const image = req.file.path; // the path to the uploaded file
    

    const newPlace =new Place({
        name,
        description,
        days,
        price,
        activities,
        image
      

    }).save().then(()=>{
        res.json("New Place Added.");
    }).catch((err)=>{
        console.log(err);
    })

})

//update place details with an id
router.route("/update/:id").put((req,res)=>{
    let placeID=req.params.id;

    const{placeName,placeDescription,placeDays}=req.body;

    const updatePlace={
        name,
        description,
        days,
        price,
        activities,
        image
    }
    Place.findByIdAndUpdate(placeID,updatePlace).then(()=>{
        res.json("Place Details Updated.");
    }).catch((err)=>{
        console.log(err);
    })
})

//delete place from db wit an id

router.route("/delete/:id").delete((req,res)=>{
    let placeID=req.params.id;

    Place.findByIdAndDelete(placeID).then(()=>{
        res.json("Place Deleted.");
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports=router;

