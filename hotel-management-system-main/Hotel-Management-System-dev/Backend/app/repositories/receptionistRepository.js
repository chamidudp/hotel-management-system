const db = require("../../config/db");
const Receptionist = require("../models/receptionist");

// Get all receptionists
function getAllReceptionists() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM receptionist", (err, rows) => {
            if (err) reject(err);
            else {
                const receptionists = rows.map((row) => {
                    return new Receptionist(
                        row.ID,
                        row.NAME,
                        row.EMAIL,
                        row.PASSWORD,
                        row.PHONE
                    );
                });
                resolve(receptionists);
            }
        });
    });
}

// Sign up receptionist
function signUpReceptionist(name, email, password, phone) {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO receptionist (NAME, EMAIL, PASSWORD, PHONE) VALUES (?, ?, ?, ?)",
            [name, email, password, phone],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
}

// Get receptionist by email
function getReceptionistByEmail(email) {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM receptionist WHERE EMAIL = ?",
            [email],
            (err, rows) => {
                if (err) reject(err);
                else {
                    const receptionist = rows.map((row) => {
                        return new Receptionist(
                            row.ID,
                            row.NAME,
                            row.EMAIL,
                            row.PASSWORD,
                            row.PHONE
                        );
                    });
                    resolve(receptionist[0]);
                }
            }
        );
    });
}

// Get receptionist by id
function getReceptionistById(id) {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM receptionist WHERE ID = ?",
            [id],
            (err, rows) => {
                if (err) reject(err);
                else {
                    const receptionist = rows.map((row) => {
                        return new Receptionist(
                            row.ID,
                            row.NAME,
                            row.EMAIL,
                            row.PASSWORD,
                            row.PHONE
                        );
                    });
                    resolve(receptionist[0]);
                }
            }
        );
    });
}

// Update receptionist
function updateReceptionist(id, name, email, password, phone) {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE receptionist SET name = ?, email = ?, password = ?, phone = ? WHERE id = ?",
            [name, email, password, phone, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.affectedRows > 0);
            }
        );
    });
}

// Delete receptionist
function deleteReceptionist(id) {
    return new Promise((resolve, reject) => {
        db.query(
            "DELETE FROM receptionist WHERE id = ?",
            [id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.affectedRows > 0);
            }
        );
    });
}

module.exports = {
    getAllReceptionists,
    signUpReceptionist,
    getReceptionistByEmail,
    getReceptionistById,
    updateReceptionist,
    deleteReceptionist,
};
