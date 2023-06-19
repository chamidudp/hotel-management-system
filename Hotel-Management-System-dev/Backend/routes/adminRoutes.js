const express = require("express");
const adminController = require("../app/controllers/adminController");

const router = express.Router();

router.get("/", adminController.getAllAdmins);
router.post("/signup", adminController.signUpAdmin);
router.post("/login", adminController.loginAdmin);
router.get("/:id", adminController.getAdminById);
router.put("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
