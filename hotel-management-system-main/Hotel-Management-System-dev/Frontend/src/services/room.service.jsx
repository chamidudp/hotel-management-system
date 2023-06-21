import * as url from "./url";
import axios from "axios";

const getAllRooms = async () => {
    return await axios.get(url.ROOM, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getRoomById = async (id) => {
    return await axios.get(url.ROOM_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const addRoom = async (data) => {
    return await axios.post(url.ROOM, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const updateRoom = async (id, data) => {
    return await axios.put(url.ROOM_PARAM(id), data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const deleteRoom = async (id) => {
    return await axios.delete(url.ROOM_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getRoomByRoomType = async (id) => {
    return await axios.get(url.GET_ROOM_BY_TYPE(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getRoomByRoomCapacity = async (id) => {
    return await axios.get(url.GET_ROOM_BY_CAPACITY(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getRoomByRoomPrice = async (id) => {
    return await axios.get(url.GET_ROOM_BY_PRICE(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export default {
    getAllRooms,
    getRoomById,
    addRoom,
    updateRoom,
    deleteRoom,
    getRoomByRoomType,
    getRoomByRoomCapacity,
    getRoomByRoomPrice
};
