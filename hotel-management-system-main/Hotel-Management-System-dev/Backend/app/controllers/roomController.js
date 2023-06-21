const roomService = require('../services/roomService');

async function getAllRooms(req, res) {
    try {
        const rooms = await roomService.getAllRooms();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getRoomById(req, res) {
    try {
        const id = req.params.id;
        const room = await roomService.getRoomById(id);
        if (!room) {
            res.status(404).json({ error: "Room not found" });
        } else {
            res.json(room);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}


async function createRoom(req, res) {
    try {
        const { name, type, capacity, price, description, image } = req.body;
        const roomId = await roomService.createRoom(name, type, capacity, price, description, image);
        res.status(201).json({ id: roomId, name, type, capacity, price, description, image });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateRoom(req, res) {
    try {
        const id = req.params.id;
        const { name, type, capacity, price, description, image } = req.body;
        const result = await roomService.updateRoom(id, name, type, capacity, price, description, image);
        if (!result) {
            res.status(404).json({ error: "Room not found" });
        } else {
            res.sendStatus(200);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteRoom(req, res) {
    try {
        const id = req.params.id;
        const result = await roomService.deleteRoom(id);
        if (!result) {
            res.status(404).json({ error: "Room not found" });
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getRoomByType(req, res) {
    try {
        const type = req.params.type;
        const room = await roomService.getRoomByType(type);
        if (!room) {
            res.status(404).json({ error: "Room not found" });
        } else {
            res.json(room);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getRoomByCapacity(req, res) {
    try {
        const capacity = req.params.capacity;
        const room = await roomService.getRoomByCapacity(capacity);
        if (!room) {
            res.status(404).json({ error: "Room not found" });
        } else {
            res.json(room);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getRoomByPrice(req, res) {
    try {
        const price = req.params.price;
        const room = await roomService.getRoomByPrice(price);
        if (!room) {
            res.status(404).json({ error: "Room not found" });
        } else {
            res.json(room);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
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

