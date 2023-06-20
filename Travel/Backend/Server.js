const express=require("express");

const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const cors = require("cors");
const Routes=require("./Routes/Routes");
const placeRoutes=require("./Routes/PlaceRoutes");
const BookingRoutes=require("./Routes/BookingRoutes");
const CarBookingRoutes=require("./Routes/CarBookingRoutes");


const app=express();

//create folders for save images in backend
app.use('/uploads', express.static('uploads'))
app.use('/placesImages', express.static('placesImages'))

//initialize PORT to run backend
const PORT=process.env.PORT || 8000;

//mongoDb connection URL
const mongoDb_URL="mongodb+srv://pimuditha:pimuditha1234@cluster0.2hgccca.mongodb.net/carsDB?retryWrites=true&w=majority";

//bodyparser used to get data from frontend
app.use(bodyParser.json({limit: '1000kb'}));
app.use(bodyParser.urlencoded({limit: '1000kb', extended: true}));
app.use(express.json());

//cors used to run frontend and backend simultaniously
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
  }));

//use Car routes ,place routes and booking routes 
app.use("/",Routes);
app.use("/place",placeRoutes);
app.use("/booking",BookingRoutes);
app.use("/carbooking",CarBookingRoutes);

//connect to mongoDB
mongoose.connect(mongoDb_URL).then(()=>{
    console.log("DB connected...");
}).catch((err)=>{
    console.log(err);
});


//start server
app.listen(PORT,()=>console.log(`Server is running on Port ${PORT}`));