const express = require("express");
const hallBookingController = require('../app/controllers/hallBookingController');

const router = express.Router();

router.get("/", hallBookingController.getAllHallBookings);
router.get("/:id", hallBookingController.getHallBookingById);
router.post("/", hallBookingController.createHallBooking);
router.put("/:id", hallBookingController.updateHallBooking);
router.delete("/:id", hallBookingController.deleteHallBooking);
router.get("/customer/:id", hallBookingController.getHallBookingByCustomerId);
router.get("/hall/:hallID", hallBookingController.getHallBookingByHallId);

module.exports = router;