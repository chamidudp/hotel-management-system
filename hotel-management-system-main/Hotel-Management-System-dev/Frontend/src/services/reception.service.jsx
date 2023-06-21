import * as url from "./url";
import axios from "axios";

const getAllReceptionist = async () => {
    return await axios.get(url.RECEPTIONIST, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getReceptionistById = async (id) => {
    return await axios.get(url.RECEPTIONIST_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const addReceptionist = async (data) => {
    return await axios.post(url.RECEPTIONIST, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const updateReceptionist = async (id, data) => {
    return await axios.put(url.RECEPTIONIST_PARAM(id), data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const deleteReceptionist = async (id) => {
    return await axios.delete(url.RECEPTIONIST_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const login = async (data) => {
    return await axios.post(url.RECEPTIONIST_LOGIN, data, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export default {
    getAllReceptionist,
    getReceptionistById,
    addReceptionist,
    updateReceptionist,
    deleteReceptionist,
    login
};