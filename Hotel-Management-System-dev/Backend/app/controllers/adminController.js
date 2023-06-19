require("dotenv").config();
const adminService = require("../services/adminService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get all admins
async function getAllAdmins(req, res) {
    try {
        const admins = await adminService.getAllAdmins();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

// Admin Sign up
async function signUpAdmin(req, res) {

    try {
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const admin = await adminService.signUpAdmin(name, email, hashedPassword);
        res.json(admin);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

// Admin Login
async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body;
        const admin = await adminService.getAdminByEmail(email);
        console.log(admin);

        if (admin) {
            const validPassword = await bcrypt.compare(password, admin.password);
            if (validPassword) {
                const token = jwt.sign(
                    { id: admin.ID, email: admin.EMAIL },
                    process.env.JWT_SECRET
                );
                res.json({
                    token,
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                });
            } else {
                res.status(401).json({ error: "Invalid password" });
            }
        } else {
            res.status(404).json({ error: "Admin not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Get admin by id
async function getAdminById(req, res) {
    try {
        const id = req.params.id;
        const admin = await adminService.getAdminById(id);
        if (!admin) {
            res.status(404).json({ error: "Admin not found" });
        } else {
            res.json(admin);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

// Update admin
async function updateAdmin(req, res) {
    try {
        const id = req.params.id;
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await adminService.updateAdmin(id, name, email, hashedPassword);
        if (!result) {
            res.status(404).json({ error: "Admin not found" });
        } else {
            res.sendStatus(200);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

// Delete admin
async function deleteAdmin(req, res) {
    try {
        const id = req.params.id;
        const result = await adminService.deleteAdmin(id);
        if (!result) {
            res.status(404).json({ error: "Admin not found" });
        } else {
            res.sendStatus(200);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getAllAdmins,
    signUpAdmin,
    loginAdmin,
    getAdminById,
    updateAdmin,
    deleteAdmin,
}