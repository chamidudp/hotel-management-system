const db = require("../../config/db");
const Customer = require("../models/customer");

// Get all customers
function getAllCustomers() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM customers", (err, rows) => {
      if (err) reject(err);
      else {
        const users = rows.map((row) => {
          return new Customer(
            row.ID,
            row.NAME,
            row.EMAIL,
            row.NIC,
            row.ADDRESS,
            row.PHONE,
            row.PASSWORD
          );
        });
        resolve(users);
      }
    });
  });
}

// Sign up customer
function signUpCustomer(name, email, nic, address, phone, password) {
  console.log(name, email, nic, address, phone, password);
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO customers (NAME, EMAIL, NIC, ADDRESS, PHONE, PASSWORD) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, nic, address, phone, password],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

// Get customer by email
function getCustomerByEmail(email) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM customers WHERE EMAIL = ?",
      [email],
      (err, rows) => {
        if (err) reject(err);
        else {
          const user = rows.map((row) => {
            return {
              ID: row.ID,
              NAME: row.NAME,
              EMAIL: row.EMAIL,
              NIC: row.NIC,
              ADDRESS: row.ADDRESS,
              PHONE: row.PHONE,
              PASSWORD: row.PASSWORD,
            };
          });
          resolve(user[0]);
        }
      }
    );
  });
}

// Get customer by id
function getCustomerById(id) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM customers WHERE ID = ?",
      [id],
      (err, rows) => {
        if (err) reject(err);
        else {
          const user = rows.map((row) => {
            return {
              ID: row.ID,
              NAME: row.NAME,
              EMAIL: row.EMAIL,
              NIC: row.NIC,
              ADDRESS: row.ADDRESS,
              PHONE: row.PHONE,
              PASSWORD: row.PASSWORD,
            };
          });
          resolve(user[0]);
        }
      }
    );
  });
}

//update customer
function updateCustomer(id, name, email, nic, address, phone, password) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE customers SET name = ?, email = ?, nic = ?, address = ?, phone = ?, password = ? WHERE id = ?",
      [name, email, nic, address, phone, password, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows > 0);
      }
    );
  });
}

//delete customer
function deleteCustomer(id) {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM customers WHERE id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows > 0);
    });
  });
}

module.exports = {
  getAllCustomers,
  signUpCustomer,
  getCustomerByEmail,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
