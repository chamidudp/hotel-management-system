require("dotenv").config();

const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const contactUsRoutes = require("./routes/contactUsRoutes");
const customerRoutes = require("./routes/customerRoutes");
const hallRoutes = require("./routes/hallRoutes");
const hallBookingRoutes = require("./routes/hallBookingRoutes");
const receptionistRoutes = require("./routes/receptionistRoutes");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const roomBookingRoutes = require("./routes/roomBookingRoutes");

const port = 8080;

// express app
const app = express();

// middleware
app.use(express.json());

// cors
app.use(cors());

// routes
app.use("/admin", adminRoutes);
app.use("/contactUs", contactUsRoutes);
app.use("/customer", customerRoutes);
app.use("/hall", hallRoutes);
app.use("/hallBooking", hallBookingRoutes);
app.use("/receptionist", receptionistRoutes);
app.use("/room", roomRoutes);
app.use("/roomBooking", roomBookingRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
