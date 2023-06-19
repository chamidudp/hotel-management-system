const express = require("express");
const receptionistController = require("../app/controllers/receptionistController");

const router = express.Router();

router.get("/", receptionistController.getAllReceptionists);
router.get("/:id", receptionistController.getReceptionistById);
router.post("/", receptionistController.createReceptionist);
router.put("/:id", receptionistController.updateReceptionist);
router.delete("/:id", receptionistController.deleteReceptionist);
router.post("/login", receptionistController.login);

module.exports = router;