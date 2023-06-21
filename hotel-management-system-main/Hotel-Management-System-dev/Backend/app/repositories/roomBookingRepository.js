const db = require("../../config/db");
const RoomBooking = require("../models/roomBooking");

//get all roomBookings
function getAllRoomBookings() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM room_booking", (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                const roomBookings = rows.map((row) => {
                    return new RoomBooking(
                        row.ID,
                        row.ROOM_ID,
                        row.CUSTOMER_ID,
                        row.BOOKING_DATE,
                        row.BOOKING_TIME,
                    );
                });
                resolve(roomBookings);
            }
        });
    });
}

//get roomBooking by id
function getRoomBookingById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM room_booking WHERE id = ?", [id], (err, rows) => {
            if (err) reject(err);
            else if (rows.length === 0) resolve(null);
            else {
                const roomBooking = new RoomBooking(
                    rows[0].ID,
                    rows[0].ROOM_ID,
                    rows[0].CUSTOMER_ID,
                    rows[0].BOOKING_DATE,
                    rows[0].BOOKING_TIME
                );
                resolve(roomBooking);
            }
        });
    });
}

//get roomBooking by customer id
function getRoomBookingByCustomerId(customer_id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM room_booking where room_id = " + customer_id, (err, rows) => {
            if (err) reject(err);
            else {
                const roomBookings = rows.map((row) => {
                    return new RoomBooking(
                        row.ID,
                        row.HALL_ID,
                        row.CUSTOMER_ID,
                        row.BOOKING_DATE,
                        row.BOOKING_TIME,
                    );
                });
                resolve(roomBookings);
            }
        });
    });
}


//get roomBooking by room id
function getRoomBookingByRoomId(room_id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM room_booking WHERE room_id = ?", [room_id], (err, rows) => {
            if (err) reject(err);
            else if (rows.length === 0) resolve(null);
            else {
                const roomBooking = new RoomBooking(
                    rows[0].ID,
                    rows[0].ROOM_ID,
                    rows[0].CUSTOMER_ID,
                    rows[0].BOOKING_DATE,
                    rows[0].BOOKING_TIME
                );
                resolve(roomBooking);
            }
        });
    });
}

//add roomBooking
function addRoomBooking(room_id, customer_id, booking_date, booking_time) {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO room_booking (room_id, customer_id, booking_date, booking_time) VALUES (?, ?, ?, ?)",
            [room_id, customer_id, booking_date, booking_time],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            }
        );
    });
}

//update roomBooking
function updateRoomBooking(id, room_id, customer_id, booking_date, booking_time) {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE room_booking SET room_id = ?, customer_id = ?, booking_date = ?, booking_time = ? WHERE id = ?",
            [room_id, customer_id, booking_date, booking_time, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.affectedRows > 0);
            }
        );
    });
}

//delete roomBooking
function deleteRoomBooking(id) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM room_booking WHERE id = ?", [id], (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows > 0);
        });
    });
}

module.exports = {
    getAllRoomBookings,
    getRoomBookingById,
    getRoomBookingByCustomerId,
    getRoomBookingByRoomId,
    addRoomBooking,
    updateRoomBooking,
    deleteRoomBooking,
};


