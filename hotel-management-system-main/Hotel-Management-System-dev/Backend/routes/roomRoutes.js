const express = require("express");
const roomController = require("../app/controllers/roomController");

const router = express.Router();

router.get("/", roomController.getAllRooms);
router.get("/:id", roomController.getRoomById);
router.post("/", roomController.createRoom);
router.put("/:id", roomController.updateRoom);
router.delete("/:id", roomController.deleteRoom);
router.get("/type/:type", roomController.getRoomByType);
router.get("/capacity/:capacity", roomController.getRoomByCapacity);
router.get("/price/:price", roomController.getRoomByPrice);

module.exports = router;