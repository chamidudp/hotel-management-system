const express = require("express");
const customerController = require("../app/controllers/customerController");

const router = express.Router();

router.get("/", customerController.getAllCustomers);
router.post("/signup", customerController.signUpCustomer);
router.post("/login", customerController.loginCustomer);
router.get("/:id", customerController.getCustomerById);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);
router.post("/login", customerController.loginCustomer);

module.exports = router;
