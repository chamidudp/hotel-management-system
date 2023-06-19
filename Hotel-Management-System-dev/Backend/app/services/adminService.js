const adminRepository = require("../repositories/adminRepository")

async function getAllAdmins() {
    return await adminRepository.getAllAdmins();
}

async function signUpAdmin(name, email, password) {
    return await adminRepository.signUpAdmin(name, email, password);
}

async function getAdminByEmail(email) {
    return await adminRepository.getAdminByEmail(email);
}

async function getAdminById(id) {
    return await adminRepository.getAdminById(id);
}

async function updateAdmin(id, name, email, password) {
    return await adminRepository.updateAdmin(id, name, email, password);
}

async function deleteAdmin(id) {
    return await adminRepository.deleteAdmin(id);
}

module.exports = {
    getAllAdmins,
    signUpAdmin,
    getAdminByEmail,
    getAdminById,
    updateAdmin,
    deleteAdmin,
}