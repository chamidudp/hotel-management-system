const contactUsService = require('../services/contactUsService');

async function getAllContactUs(req, res) {
    try {
        const contactUs = await contactUsService.getAllContactUs();
        res.json(contactUs);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function createContactUs(req, res) {
    try {
        const { name, email, subject, message } = req.body;
        const contactUsId = await contactUsService.createContactUs(name, email, subject, message);
        res.status(201).json({ id: contactUsId, name, email, subject, message });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateContactUs(req, res) {
    try {
        const id = req.params.id;
        const { name, email, subject, message } = req.body;
        const result = await contactUsService.updateContactUs(id, name, email, subject, message);
        if (!result) {
            res.status(404).json({ error: "ContactUs not found" });
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteContactUs(req, res) {
    try {
        const id = req.params.id;
        const result = await contactUsService.deleteContactUs(id);
        if (!result) {
            res.status(404).json({ error: "ContactUs not found" });
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getContactUsById(req, res) {
    try {
        const id = req.params.id;
        const contactUs = await contactUsService.getContactUsById(id);
        if (!contactUs) {
            res.status(404).json({ error: "ContactUs not found" });
        } else {
            res.json(contactUs);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getAllContactUs,
    createContactUs,
    updateContactUs,
    deleteContactUs,
    getContactUsById,
};