require("dotenv").config();
const receptionistService = require('../services/receptionistService');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getAllReceptionists(req, res) {
    try {
        const receptionists = await receptionistService.getAllReceptionists();
        res.json(receptionists);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function createReceptionist(req, res) {
    try {
        const { name, email, password, phone } = req.body;
        console.log(name, email, password, phone);
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const receptionistId = await receptionistService.signUpReceptionist(name, email, hashedPassword, phone);
        res.status(201).json({ id: receptionistId, name, email, password });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateReceptionist(req, res) {
    try {
        const id = req.params.id;
        const { name, email, password, phone } = req.body;
        const result = await receptionistService.updateReceptionist(id, name, email, password, phone);
        if (!result) {
            res.status(404).json({ error: "Receptionist not found" });
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteReceptionist(req, res) {
    try {
        const id = req.params.id;
        const result = await receptionistService.deleteReceptionist(id);
        if (!result) {
            res.status(404).json({ error: "Receptionist not found" });
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getReceptionistById(req, res) {
    try {
        const id = req.params.id;
        const receptionist = await receptionistService.getReceptionistById(id);
        if (!receptionist) {
            res.status(404).json({ error: "Receptionist not found" });
        } else {
            res.json(receptionist);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const receptionist = await receptionistService.getReceptionistByEmail(email);
        if (!receptionist) {
            res.status(404).json({ error: "Receptionist not found" });
        } else {
            const result = await bcrypt.compare(password, receptionist.password);
            if (result) {
                const payload = {
                    id: receptionist.id,
                    name: receptionist.name,
                    email: receptionist.email
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
                res.json({
                    token: token,
                    id: receptionist.id,
                    name: receptionist.name,
                    email: receptionist.email
                });
            } else {
                res.status(401).json({ error: "Invalid password" });
            }
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getAllReceptionists,
    createReceptionist,
    updateReceptionist,
    deleteReceptionist,
    getReceptionistById,
    login
};
