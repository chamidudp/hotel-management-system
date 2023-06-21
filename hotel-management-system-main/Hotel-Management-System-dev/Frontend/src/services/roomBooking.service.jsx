import * as url from "./url";
import axios from "axios";

const getAllRoomBookings = async () => {
    return await axios.get(url.ROOM_BOOKING, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getRoomBookingById = async (id) => {
    return await axios.get(url.ROOM_BOOKING_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const addRoomBooking = async (data) => {
    return await axios.post(url.ROOM_BOOKING, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const updateRoomBooking = async (id, data) => {
    return await axios.put(url.ROOM_BOOKING_PARAM(id), data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const deleteRoomBooking = async (id) => {
    return await axios.delete(url.ROOM_BOOKING_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getRoomBookingByCustomerId = async (id) => {
    return await axios.get(url.GET_ROOM_BOOKING_BY_CUSTOMER_ID(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getRoomBookingByRoomId = async (id) => {
    return await axios.get(url.GET_ROOM_BOOKING_BY_ROOM_ID(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export default {
    getAllRoomBookings,
    getRoomBookingById,
    addRoomBooking,
    updateRoomBooking,
    deleteRoomBooking,
    getRoomBookingByCustomerId,
    getRoomBookingByRoomId
};