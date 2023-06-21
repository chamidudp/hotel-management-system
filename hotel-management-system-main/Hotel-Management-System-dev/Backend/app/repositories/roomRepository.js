const db = require("../../config/db");
const Room = require("../models/room");

//get all rooms
function getAllRooms() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM room", (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                const rooms = rows.map((row) => {
                    return new Room(
                        row.ID,
                        row.NAME,
                        row.TYPE,
                        row.CAPACITY,
                        row.PRICE,
                        row.DESCRIPTION,
                        row.IMAGE
                    );
                });
                resolve(rooms);
            }
        });
    });
}

//create room
function createRoom(name, type, capacity, price, description, image) {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO room (NAME, TYPE, CAPACITY, PRICE, DESCRIPTION, IMAGE) VALUES (?, ?, ?, ?, ?, ?)",
            [name, type, capacity, price, description, image],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
}

//update room
function updateRoom(id, name, type, capacity, price, description, image) {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE room SET name = ?, type = ?, capacity = ?, price = ?, description = ?, image = ? WHERE id = ?",
            [name, type, capacity, price, description, image, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.affectedRows > 0);
            }
        );
    });
}

//delete room
function deleteRoom(id) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM room WHERE id = ?", [id], (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows > 0);
        });
    });
}

//get room by type
function getRoomByType(type) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM room WHERE type = ?", [type], (err, rows) => {
            if (err) reject(err);
            else {
                const room = rows.map((row) => {
                    return new Room(
                        row.ID,
                        row.NAME,
                        row.TYPE,
                        row.CAPACITY,
                        row.PRICE,
                        row.DESCRIPTION,
                        row.IMAGE
                    );
                });
                resolve(room[0]);
            }
        });
    });
}

//get room by id
function getRoomById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM room WHERE id = ?", [id], (err, rows) => {
            if (err) reject(err);
            else {
                const room = rows.map((row) => {
                    return new Room(
                        row.ID,
                        row.NAME,
                        row.TYPE,
                        row.CAPACITY,
                        row.PRICE,
                        row.DESCRIPTION,
                        row.IMAGE
                    );
                });
                resolve(room[0]);
            }
        });
    });
}

//get room by capacity
function getRoomByCapacity(capacity) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM room WHERE capacity >= ?", [capacity], (err, rows) => {
            if (err) reject(err);
            else {
                const room = rows.map((row) => {
                    return new Room(
                        row.ID,
                        row.NAME,
                        row.TYPE,
                        row.CAPACITY,
                        row.PRICE,
                        row.DESCRIPTION,
                        row.IMAGE
                    );
                });
                resolve(room[0]);
            }
        });
    });
}

//get room by price
function getRoomByPrice(price) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM room WHERE price <= ?", [price], (err, rows) => {
            if (err) reject(err);
            else {
                const room = rows.map((row) => {
                    return new Room(
                        row.ID,
                        row.NAME,
                        row.TYPE,
                        row.CAPACITY,
                        row.PRICE,
                        row.DESCRIPTION,
                        row.IMAGE
                    );
                });
                resolve(room[0]);
            }
        });
    });
}

module.exports = {
    getAllRooms,
    createRoom,
    updateRoom,
    deleteRoom,
    getRoomByType,
    getRoomById,
    getRoomByCapacity,
    getRoomByPrice
};
