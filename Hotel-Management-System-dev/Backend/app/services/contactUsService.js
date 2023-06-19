const contactUsRepository = require("../repositories/contactUsRepository");

async function getAllContactUs() {
    return await contactUsRepository.getAllContactUs();
}

async function createContactUs(name, email, subject, message) {
    return await contactUsRepository.createContactUs(name, email, subject, message);
}

async function updateContactUs(id, name, email, subject, message) {
    return await contactUsRepository.updateContactUs(id, name, email, subject, message);
}

async function deleteContactUs(id) {
    return await contactUsRepository.deleteContactUs(id);
}

async function getContactUsById(id) {
    return await contactUsRepository.getContactUsById(id);
}

module.exports = {
    getAllContactUs,
    createContactUs,
    updateContactUs,
    deleteContactUs,
    getContactUsById,
};