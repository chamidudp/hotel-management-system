import * as url from "./url";
import axios from "axios";

const getAllUsers = async () => {
    return await axios.get(url.USER, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getUserById = async (id) => {
    return await axios.get(url.USER_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const addUser = async (data) => {
    return await axios.post(url.USER, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const updateUser = async (id, data) => {
    return await axios.put(url.USER_PARAM(id), data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const deleteUser = async (id) => {
    return await axios.delete(url.USER_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export default {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};