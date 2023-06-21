const db = require("../../config/db");
const Admin = require("../models/admin");

//get all admins
function getAllAdmins() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM admin", (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                const admins = rows.map((row) => {
                    return new Admin(
                        row.ID,
                        row.NAME,
                        row.EMAIL,
                        row.PASSWORD
                    );
                });
                resolve(admins);
            }
        });
    });
}

// Sign up admin
function signUpAdmin(name, email, password) {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO admin (NAME, EMAIL, PASSWORD) VALUES (?, ?, ?)",
            [name, email, password],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
}

// Get admin by email
function getAdminByEmail(email) {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM admin WHERE EMAIL = ?",
            [email],
            (err, rows) => {
                if (err) reject(err);
                else {
                    const admin = rows.map((row) => {
                        return new Admin(
                            row.ID,
                            row.NAME,
                            row.EMAIL,
                            row.PASSWORD
                        );
                    });
                    resolve(admin[0]);
                }
            }
        );
    });
}

//update admin
function updateAdmin(id, name, email, password) {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE admin SET NAME = ?, EMAIL = ?, PASSWORD = ? WHERE ID = ?",
            [name, email, password, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.affectedRows > 0);
            }
        );
    });
}

//delete admin
function deleteAdmin(id) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM admin WHERE ID = ?", [id], (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows > 0);
        });
    });
}

//get admin by id
function getAdminById(id) {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM admin WHERE ID = ?",
            [id],
            (err, rows) => {
                if (err) reject(err);
                else {
                    const admin = rows.map((row) => {
                        return new Admin(
                            row.ID,
                            row.NAME,
                            row.EMAIL,
                            row.PASSWORD
                        );
                    });
                    resolve(admin[0]);
                }
            }
        );
    })
}


module.exports = {
    getAllAdmins,
    signUpAdmin,
    getAdminByEmail,
    updateAdmin,
    deleteAdmin,
    getAdminById
};