const roomRepository = require('../repositories/roomRepository');

async function getAllRooms() {
    return await roomRepository.getAllRooms();
}

async function createRoom(name, type, capacity, price, description, image) {
    return await roomRepository.createRoom(name, type, capacity, price, description, image);
}

async function updateRoom(id, name, type, capacity, price, description, image) {
    return await roomRepository.updateRoom(id, name, type, capacity, price, description, image);
}

async function deleteRoom(id) {
    return await roomRepository.deleteRoom(id);
}

async function getRoomById(id) {
    return await roomRepository.getRoomById(id);
}

async function getRoomByType(type) {
    return await roomRepository.getRoomByType(type);
}

async function getRoomByCapacity(capacity) {
    return await roomRepository.getRoomByCapacity(capacity);
}

async function getRoomByPrice(price) {
    return await roomRepository.getRoomByPrice(price);
}

module.exports = {
    getAllRooms,
    createRoom,
    updateRoom,
    deleteRoom,
    getRoomById,
    getRoomByType,
    getRoomByCapacity,
    getRoomByPrice,
};
