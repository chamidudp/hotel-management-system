import * as url from "./url";
import axios from "axios";

const getAllHalls = async () => {
    return await axios.get(url.HALL, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getHallById = async (id) => {
    return await axios.get(url.HALL_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const addHall = async (data) => {
    return await axios.post(url.HALL, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const updateHall = async (id, data) => {
    return await axios.put(url.HALL_PARAM(id), data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const deleteHall = async (id) => {
    return await axios.delete(url.HALL_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getHallByType = async (type) => {
    return await axios.get(url.GET_HALL_BY_TYPE(type), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getHallByCapacity = async (capacity) => {
    return await axios.get(url.GET_HALL_BY_CAPACITY(capacity), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getHallByPrice = async (price) => {
    return await axios.get(url.GET_HALL_BY_PRICE(price), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export default {
    getAllHalls,
    getHallById,
    addHall,
    updateHall,
    deleteHall,
    getHallByType,
    getHallByCapacity,
    getHallByPrice
};