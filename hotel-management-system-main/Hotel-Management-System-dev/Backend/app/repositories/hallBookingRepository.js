const db = require("../../config/db");
const HallBooking = require("../models/hallBooking");

// Get all hall bookings
function getAllHallBookings() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM hall_booking", (err, rows) => {
            if (err) reject(err);
            else {
                const hallBookings = rows.map((row) => {
                    return new HallBooking(
                        row.ID,
                        row.HALL_ID,
                        row.CUSTOMER_ID,
                        row.BOOKING_DATE,
                        row.BOOKING_TIME,
                    );
                });
                resolve(hallBookings);
            }
        });
    });
}

// Get hall booking by id
function getHallBookingById(id) {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM hall_booking WHERE id = ?",
            [id],
            (err, rows) => {
                if (err) reject(err);
                else if (rows.length === 0) resolve(null);
                else {
                    const hallBooking = new HallBooking(
                        rows[0].ID,
                        rows[0].HALL_ID,
                        rows[0].CUSTOMER_ID,
                        rows[0].BOOKING_DATE,
                        rows[0].BOOKING_TIME
                    );
                    resolve(hallBooking);
                }
            }
        );
    });
}

// Get hall bookings by customer id
function getHallBookingByCustomerId(customer_id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM hall_booking where hall_id = " + customer_id, (err, rows) => {
            if (err) reject(err);
            else {
                const hallBookings = rows.map((row) => {
                    return new HallBooking(
                        row.ID,
                        row.HALL_ID,
                        row.CUSTOMER_ID,
                        row.BOOKING_DATE,
                        row.BOOKING_TIME,
                    );
                });
                resolve(hallBookings);
            }
        });
    });
}


//get hall booking by hall id
function getHallBookingByHallId(hall_id) {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM hall_booking WHERE hall_id = ?",
            [hall_id],
            (err, rows) => {
                if (err) reject(err);
                else if (rows.length === 0) resolve(null);
                else {
                    const hallBooking = new HallBooking(
                        rows[0].ID,
                        rows[0].HALL_ID,
                        rows[0].CUSTOMER_ID,
                        rows[0].BOOKING_DATE,
                        rows[0].BOOKING_TIME
                    );
                    resolve(hallBooking);
                }
            }
        );
    });
}

// Create hall booking
function createHallBooking(
    hall_id,
    customer_id,
    booking_date,
    booking_time,
) {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO hall_booking (hall_id, customer_id, booking_date, booking_time) VALUES (?, ?, ?, ?)",
            [
                hall_id,
                customer_id,
                booking_date,
                booking_time,
            ],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
}

// Update hall booking
function updateHallBooking(
    id,
    hall_id,
    customer_id,
    booking_date,
    booking_time,
) {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE hall_booking SET hall_id = ?, customer_id = ?, booking_date = ?, booking_time = ? WHERE id = ?",
            [
                hall_id,
                customer_id,
                booking_date,
                booking_time,
                id,
            ],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.affectedRows > 0);
            }
        );
    });
}

//delete hall booking
function deleteHallBooking(id) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM hall_booking WHERE id = ?", [id], (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows > 0);
        });
    });
}

module.exports = {
    getAllHallBookings,
    getHallBookingById,
    getHallBookingByCustomerId,
    getHallBookingByHallId,
    createHallBooking,
    updateHallBooking,
    deleteHallBooking,
};

