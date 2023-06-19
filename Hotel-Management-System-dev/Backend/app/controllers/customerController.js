require("dotenv").config();
const customerService = require("../services/customerService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get all customers
async function getAllCustomers(req, res) {
  try {
    const customers = await customerService.getAllCustomers();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Customer Sign up
async function signUpCustomer(req, res) {
  try {
    const { name, email, nic, address, phone, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const customer = await customerService.signUpCustomer(
      name,
      email,
      nic,
      address,
      phone,
      hashedPassword
    );
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Customer Login
async function loginCustomer(req, res) {
  try {
    const { email, password } = req.body;
    const customer = await customerService.getCustomerByEmail(email);

    if (customer) {
      const validPassword = await bcrypt.compare(password, customer.PASSWORD);
      if (validPassword) {
        const token = jwt.sign(
          { id: customer.ID, email: customer.EMAIL },
          process.env.JWT_SECRET
        );
        res.json({
          token,
          id: customer.ID,
          name: customer.NAME,
          email: customer.EMAIL,
          nic: customer.NIC,
          address: customer.ADDRESS,
          phone: customer.PHONE,
        });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Get customer by id
async function getCustomerById(req, res) {
  try {
    const id = req.params.id;
    const customer = await customerService.getCustomerById(id);
    if (!customer) {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.json(customer);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Update customer
async function updateCustomer(req, res) {
  try {
    const id = req.params.id;
    const { name, email, nic, address, phone, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await customerService.updateCustomer(
      id,
      name,
      email,
      nic,
      address,
      phone,
      hashedPassword
    );
    if (!result) {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete customer
async function deleteCustomer(req, res) {
  try {
    const id = req.params.id;
    const result = await customerService.deleteCustomer(id);

    if (!result) {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllCustomers,
  signUpCustomer,
  loginCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
