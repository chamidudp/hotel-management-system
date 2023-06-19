const hallBookingService = require('../services/hallBookingService');

async function getAllHallBookings(req, res) {
    try {
        const hallBookings = await hallBookingService.getAllHallBookings();
        res.json(hallBookings);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function createHallBooking(req, res) {
    try {
        const { customer_id, hall_id, booking_date, booking_time } = req.body;
        const hallBookingId = await hallBookingService.createHallBooking(customer_id, hall_id, booking_date, booking_time);
        res.status(201).json({ id: hallBookingId, customer_id, hall_id, booking_date, booking_time });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateHallBooking(req, res) {
    try {
        const id = req.params.id;
        const { customer_id, hall_id, booking_date, booking_time } = req.body;
        const result = await hallBookingService.updateHallBooking(id, customer_id, hall_id, booking_date, booking_time);
        if (!result) {
            res.status(404).json({ error: "HallBooking not found" });
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteHallBooking(req, res) {
    try {
        const id = req.params.id;
        const result = await hallBookingService.deleteHallBooking(id);
        if (!result) {
            res.status(404).json({ error: "HallBooking not found" });
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getHallBookingById(req, res) {
    try {
        const id = req.params.id;
        const hallBooking = await hallBookingService.getHallBookingById(id);
        if (!hallBooking) {
            res.status(404).json({ error: "HallBooking not found" });
        } else {
            res.json(hallBooking);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getHallBookingByCustomerId(req, res) {
    try {
        const id = req.params.id;
        //console.log(id);

        const hallBooking = await hallBookingService.getHallBookingByCustomerId(id);
        console.log(hallBooking);
        if (!hallBooking) {
            res.status(403).json({ error: "HallBooking not found" });
        } else {
            res.json(hallBooking);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getHallBookingByHallId(req, res) {
    try {
        const hallId = req.params.hallId;
        const hallBooking = await hallBookingService.getHallBookingByHallId(hallId);
        if (!hallBooking) {
            res.status(404).json({ error: "HallBooking not found" });
        } else {
            res.json(hallBooking);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getAllHallBookings,
    getHallBookingById,
    getHallBookingByCustomerId,
    getHallBookingByHallId,
    createHallBooking,
    updateHallBooking,
    deleteHallBooking,
}
