const db = require("../../config/db");
const ContactUs = require("../models/contactUs");

//get all contactUs
function getAllContactUs() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM contact_us", (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                const contactUs = rows.map((row) => {
                    return new ContactUs(
                        row.ID,
                        row.NAME,
                        row.EMAIL,
                        row.SUBJECT,
                        row.MESSAGE
                    );
                });
                resolve(contactUs);
            }
        });
    });
}

//create contactUs
function createContactUs(name, email, subject, message) {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO contact_us (NAME, EMAIL, SUBJECT, MESSAGE) VALUES (?, ?, ? , ?)",
            [name, email, subject, message],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
}

//update contactUs
function updateContactUs(id, name, email, message) {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE contact_us SET name = ?, email = ?, subject = ? , message = ? WHERE id = ?",
            [name, email, subject, message, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.affectedRows > 0);
            }
        );
    });
}

//delete contactUs
function deleteContactUs(id) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM contact_us WHERE id = ?", [id], (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows > 0);
        });
    });
}

//get one contactUs
function getContactUsById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM contact_us WHERE id = ?", [id], (err, rows) => {
            if (err) reject(err);
            else if (rows.length === 0) resolve(null);
            else {
                const contactUs = new ContactUs(
                    rows[0].ID,
                    rows[0].NAME,
                    rows[0].EMAIL,
                    rows[0].SUBJECT,
                    rows[0].MESSAGE
                );
                resolve(contactUs);
            }
        });
    });
}

module.exports = {
    getAllContactUs,
    createContactUs,
    updateContactUs,
    deleteContactUs,
    getContactUsById,
};
