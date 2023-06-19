const roomBookingRepository = require('../repositories/roomBookingRepository');

async function getAllRoomBookings() {
    return await roomBookingRepository.getAllRoomBookings();
}

async function createRoomBooking(customerId, roomId, bookingDate, bookingTime) {
    return await roomBookingRepository.addRoomBooking(customerId, roomId, bookingDate, bookingTime);
}

async function updateRoomBooking(id, customerId, roomId, bookingDate, bookingTime) {
    return await roomBookingRepository.updateRoomBooking(id, customerId, roomId, bookingDate, bookingTime);
}

async function deleteRoomBooking(id) {
    return await roomBookingRepository.deleteRoomBooking(id);
}

async function getRoomBookingById(id) {
    return await roomBookingRepository.getRoomBookingById(id);
}

async function getRoomBookingByCustomerId(customerId) {
    return await roomBookingRepository.getRoomBookingByCustomerId(customerId);
}

async function getRoomBookingByRoomId(roomId) {
    return await roomBookingRepository.getRoomBookingByRoomId(roomId);
}

module.exports = {
    getAllRoomBookings,
    createRoomBooking,
    updateRoomBooking,
    deleteRoomBooking,
    getRoomBookingById,
    getRoomBookingByCustomerId,
    getRoomBookingByRoomId,
};
