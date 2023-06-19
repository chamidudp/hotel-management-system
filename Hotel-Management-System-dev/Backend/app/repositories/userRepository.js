const db = require("../../config/db");
const User = require("../models/user");

function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users", (err, rows) => {
      if (err) reject(err);
      else {
        const users = rows.map((row) => {
          return new User(row.ID, row.NAME, row.EMAIL);
        });
        resolve(users);
      }
    });
  });
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, rows) => {
      if (err) reject(err);
      else if (rows.length === 0) resolve(null);
      else {
        const user = new User(rows[0].ID, rows[0].NAME, rows[0].EMAIL);
        resolve(user);
      }
    });
  });
}

function createUser(name, email) {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      }
    );
  });
}

function updateUser(id, name, email) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows > 0);
      }
    );
  });
}

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows > 0);
    });
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
