const db = require("../../config/db");
const Hall = require("../models/hall");

//get all halls
function getAllHalls() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM hall", (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                const halls = rows.map((row) => {
                    return new Hall(
                        row.ID,
                        row.NAME,
                        row.TYPE,
                        row.CAPACITY,
                        row.PRICE,
                        row.DESCRIPTION,
                        row.IMAGE
                    );
                });
                resolve(halls);
            }
        });
    });
}

//create hall
function createHall(name, type, capacity, price, description, image) {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO hall (NAME, TYPE, CAPACITY, PRICE, DESCRIPTION, IMAGE) VALUES (?, ?, ?, ?, ?, ?)",
            [name, type, capacity, price, description, image],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
}

//update hall
function updateHall(id, name, type, capacity, price, description, image) {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE hall SET name = ?, type = ?, capacity = ?, price = ?, description = ?, image = ? WHERE id = ?",
            [name, type, capacity, price, description, image, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.affectedRows > 0);
            }
        );
    });
}

//delete hall
function deleteHall(id) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM hall WHERE id = ?", [id], (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows > 0);
        });
    });
}

//get hall by id
function getHallById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM hall WHERE id = ?", [id], (err, rows) => {
            if (err) reject(err);
            else if (rows.length === 0) resolve(null);
            else {
                const hall = new Hall(
                    rows[0].ID,
                    rows[0].NAME,
                    rows[0].TYPE,
                    rows[0].CAPACITY,
                    rows[0].PRICE,
                    rows[0].DESCRIPTION,
                    rows[0].IMAGE
                );
                resolve(hall);
            }
        });
    });
}

//get halls by type
function getHallByType(type) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM hall WHERE type = ?", [type], (err, rows) => {
            if (err) reject(err);
            else {
                const halls = rows.map((row) => {
                    return new Hall(
                        row.ID,
                        row.NAME,
                        row.TYPE,
                        row.CAPACITY,
                        row.PRICE,
                        row.DESCRIPTION,
                        row.IMAGE
                    );
                });
                resolve(halls);
            }
        });
    });
}

//get halls less than capacity
function getHallByCapacity(capacity) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM hall WHERE capacity <= ?", [capacity], (err, rows) => {
            if (err) reject(err);
            else {
                const halls = rows.map((row) => {
                    return new Hall(
                        row.ID,
                        row.NAME,
                        row.TYPE,
                        row.CAPACITY,
                        row.PRICE,
                        row.DESCRIPTION,
                        row.IMAGE
                    );
                });
                resolve(halls);
            }
        });
    });
}

//get halls less than price
function getHallByPrice(price) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM hall WHERE price <= ?", [price], (err, rows) => {
            if (err) reject(err);
            else {
                const halls = rows.map((row) => {
                    return new Hall(
                        row.ID,
                        row.NAME,
                        row.TYPE,
                        row.CAPACITY,
                        row.PRICE,
                        row.DESCRIPTION,
                        row.IMAGE
                    );
                });
                resolve(halls);
            }
        });
    });
}

module.exports = {
    getAllHalls,
    createHall,
    updateHall,
    deleteHall,
    getHallById,
    getHallByType,
    getHallByCapacity,
    getHallByPrice
};
