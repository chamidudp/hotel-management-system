const hallBookinnRepository = require('../repositories/hallBookingRepository');

async function getAllHallBookings() {
    return await hallBookinnRepository.getAllHallBookings();
}

async function getHallBookingById(id) {
    return await hallBookinnRepository.getHallBookingById(id);
}

async function getHallBookingByCustomerId(customer_id) {

    return await hallBookinnRepository.getHallBookingByCustomerId(customer_id);
}

async function getHallBookingByHallId(hall_id) {
    return await hallBookinnRepository.getHallBookingByHallId(hall_id);
}

async function createHallBooking(customer_id, hall_id, booking_date, booking_time) {
    return await hallBookinnRepository.createHallBooking(customer_id, hall_id, booking_date, booking_time);
}

async function updateHallBooking(id, customer_id, hall_id, booking_date, booking_time) {
    return await hallBookinnRepository.updateHallBooking(id, customer_id, hall_id, booking_date, booking_time);
}

async function deleteHallBooking(id) {
    return await hallBookinnRepository.deleteHallBooking(id);
}

module.exports = {
    getAllHallBookings,
    getHallBookingById,
    getHallBookingByCustomerId,
    getHallBookingByHallId,
    createHallBooking,
    updateHallBooking,
    deleteHallBooking,
}