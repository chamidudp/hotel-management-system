const hallRepository = require('../repositories/hallRepository');

async function getAllHalls() {
    return await hallRepository.getAllHalls();
}

async function getHallById(id) {
    return await hallRepository.getHallById(id);
}

async function createHall(name, type, capacity, price, description, image) {
    return await hallRepository.createHall(name, type, capacity, price, description, image);
}

async function updateHall(id, name, type, capacity, price, description, image) {
    return await hallRepository.updateHall(id, name, type, capacity, price, description, image);
}

async function deleteHall(id) {
    return await hallRepository.deleteHall(id);
}

async function getHallByType(type) {
    return await hallRepository.getHallByType(type);
}

async function getHallByCapacity(capacity) {
    return await hallRepository.getHallByCapacity(capacity);
}

async function getHallByPrice(price) {
    return await hallRepository.getHallByPrice(price);
}

module.exports = {
    getAllHalls,
    getHallById,
    createHall,
    updateHall,
    deleteHall,
    getHallByType,
    getHallByCapacity,
    getHallByPrice
};