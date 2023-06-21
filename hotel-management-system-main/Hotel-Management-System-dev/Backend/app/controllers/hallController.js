const hallService = require('../services/hallService');

async function getAllHalls(req, res) {
    try {
        const halls = await hallService.getAllHalls();
        res.json(halls);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getHallById(req, res) {
    try {
        const id = req.params.id;
        const hall = await hallService.getHallById(id);
        if (!hall) {
            res.status(404).json({ error: "Hall not found" });
        } else {
            res.json(hall);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function createHall(req, res) {
    try {
        const { name, type, capacity, price, description, image } = req.body;
        const hallId = await hallService.createHall(name, type, capacity, price, description, image);
        res.status(201).json({ id: hallId, type, capacity, price, description, image });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateHall(req, res) {
    try {
        const id = req.params.id;
        const { name, type, capacity, price, description, image } = req.body;
        const result = await hallService.updateHall(id, name, type, capacity, price, description, image);
        if (!result) {
            res.status(404).json({ error: "Hall not found" });
        } else {
            res.sendStatus(200);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteHall(req, res) {
    try {
        const id = req.params.id;
        const result = await hallService.deleteHall(id);
        if (!result) {
            res.status(404).json({ error: "Hall not found" });
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getHallByType(req, res) {
    try {
        const type = req.params.type;
        const hall = await hallService.getHallByType(type);
        if (!hall) {
            res.status(404).json({ error: "Hall not found" });
        } else {
            res.json(hall);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getHallByCapacity(req, res) {
    try {
        const capacity = req.params.capacity;
        const hall = await hallService.getHallByCapacity(capacity);
        if (!hall) {
            res.status(404).json({ error: "Hall not found" });
        } else {
            res.json(hall);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getHallByPrice(req, res) {
    try {
        const price = req.params.price;
        const hall = await hallService.getHallByPrice(price);
        if (!hall) {
            res.status(404).json({ error: "Hall not found" });
        } else {
            res.json(hall);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
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
