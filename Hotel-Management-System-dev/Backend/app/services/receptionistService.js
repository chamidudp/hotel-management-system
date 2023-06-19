const receptionistRepository = require('../repositories/receptionistRepository');

async function getAllReceptionists() {
    return await receptionistRepository.getAllReceptionists();
}

async function signUpReceptionist(name, email, password, phone) {
    return await receptionistRepository.signUpReceptionist(name, email, password, phone);
}

async function getReceptionistByEmail(email) {
    return await receptionistRepository.getReceptionistByEmail(email);
}

async function getReceptionistById(id) {
    return await receptionistRepository.getReceptionistById(id);
}

async function updateReceptionist(id, name, email, password) {
    return await receptionistRepository.updateReceptionist(id, name, email, password);
}

async function deleteReceptionist(id) {
    return await receptionistRepository.deleteReceptionist(id);
}

module.exports = {
    getAllReceptionists,
    signUpReceptionist,
    getReceptionistByEmail,
    getReceptionistById,
    updateReceptionist,
    deleteReceptionist,
}