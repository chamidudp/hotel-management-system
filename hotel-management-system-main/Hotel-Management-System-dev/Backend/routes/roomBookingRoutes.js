const express = require("express");
const roomBookingController = require("../app/controllers/roomBookingController");

const router = express.Router();

router.get("/", roomBookingController.getAllRoomBookings);
router.get("/:id", roomBookingController.getRoomBookingById);
router.post("/", roomBookingController.createRoomBooking);
router.put("/:id", roomBookingController.updateRoomBooking);
router.delete("/:id", roomBookingController.deleteRoomBooking);
router.get("/customer/:id", roomBookingController.getRoomBookingByCustomerId);
router.get("/room/:roomID", roomBookingController.getRoomBookingByRoomId);

module.exports = router;