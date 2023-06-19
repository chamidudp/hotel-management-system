const express = require("express");
const contactUsController = require("../app/controllers/contactUsController");

const router = express.Router();

router.get("/", contactUsController.getAllContactUs);
router.post("/", contactUsController.createContactUs);
router.put("/:id", contactUsController.updateContactUs);
router.delete("/:id", contactUsController.deleteContactUs);
router.get("/:id", contactUsController.getContactUsById);

module.exports = router;