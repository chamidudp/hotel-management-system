import * as url from "./url";
import axios from "axios";

const getAllHallBookings = async () => {
    return await axios.get(url.HALL_BOOKING, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getHallBookingById = async (id) => {
    return await axios.get(url.HALL_BOOKING_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const addHallBooking = async (data) => {
    return await axios.post(url.HALL_BOOKING, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const updateHallBooking = async (id, data) => {
    return await axios.put(url.HALL_BOOKING_PARAM(id), data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const deleteHallBooking = async (id) => {
    return await axios.delete(url.HALL_BOOKING_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getHallBookingByCustomerId = async (id) => {
    return await axios.get(url.GET_HALL_BOOKING_BY_CUSTOMER_ID(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getHallBookingByHallId = async (id) => {
    return await axios.get(url.GET_HALL_BOOKING_BY_HALL_ID(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export default {
    getAllHallBookings,
    getHallBookingById,
    addHallBooking,
    updateHallBooking,
    deleteHallBooking,
    getHallBookingByCustomerId,
    getHallBookingByHallId
};

