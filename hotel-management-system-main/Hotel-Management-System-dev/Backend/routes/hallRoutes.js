const express = require("express");
const hallController = require("../app/controllers/hallController");

const router = express.Router();

router.get("/", hallController.getAllHalls);
router.get("/:id", hallController.getHallById);
router.post("/", hallController.createHall);
router.put("/:id", hallController.updateHall);
router.delete("/:id", hallController.deleteHall);
router.get("/type/:type", hallController.getHallByType);
router.get("/capacity/:capacity", hallController.getHallByCapacity);
router.get("/price/:price", hallController.getHallByPrice);

module.exports = router;
