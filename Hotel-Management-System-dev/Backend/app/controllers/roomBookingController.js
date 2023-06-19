const roomBookingService = require('../services/roomBookingService');

async function getAllRoomBookings(req, res) {
    try {
        const roomBookings = await roomBookingService.getAllRoomBookings();
        res.json(roomBookings);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getRoomBookingById(req, res) {
    try {
        const id = req.params.id;
        const roomBooking = await roomBookingService.getRoomBookingById(id);
        if (!roomBooking) {
            res.status(404).json({ error: "RoomBooking not found" });
        } else {
            res.json(roomBooking);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function createRoomBooking(req, res) {
    try {
        const { customer_id, room_id, booking_date, booking_time } = req.body;
        const roomBookingId = await roomBookingService.createRoomBooking(customer_id, room_id, booking_date, booking_time);
        res.status(201).json({ id: roomBookingId, customer_id, room_id, booking_date, booking_time });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateRoomBooking(req, res) {
    try {
        const id = req.params.id;
        const { customer_id, room_id, booking_date, booking_time } = req.body;
        const result = await roomBookingService.updateRoomBooking(id, customer_id, room_id, booking_date, booking_time);
        if (!result) {
            res.status(404).json({ error: "RoomBooking not found" });
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteRoomBooking(req, res) {
    try {
        const id = req.params.id;
        const result = await roomBookingService.deleteRoomBooking(id);
        if (!result) {
            res.status(404).json({ error: "RoomBooking not found" });
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getRoomBookingByCustomerId(req, res) {
    try {
        const id = req.params.id;
        console.log(id);
        const roomBooking = await roomBookingService.getRoomBookingByCustomerId(id);
        if (!roomBooking) {
            res.status(404).json({ error: "RoomBooking not found" });
        } else {
            res.json(roomBooking);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getRoomBookingByRoomId(req, res) {
    try {
        const roomId = req.params.roomId;
        const roomBooking = await roomBookingService.getRoomBookingByRoomId(roomId);
        if (!roomBooking) {
            res.status(404).json({ error: "RoomBooking not found" });
        } else {
            res.json(roomBooking);
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getAllRoomBookings,
    getRoomBookingById,
    createRoomBooking,
    updateRoomBooking,
    deleteRoomBooking,
    getRoomBookingByCustomerId,
    getRoomBookingByRoomId,
};
