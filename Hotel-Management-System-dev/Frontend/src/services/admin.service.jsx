import * as url from "./url";
import axios from "axios";

const getAllAdmins = async () => {
    return await axios.get(url.ADMIN, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const getAdminById = async (id) => {
    return await axios.get(url.ADMIN_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const addAdmin = async (data) => {
    return await axios.post(url.ADMIN_SIGNUP, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const updateAdmin = async (id, data) => {
    return await axios.put(url.ADMIN_PARAM(id), data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const deleteAdmin = async (id) => {
    return await axios.delete(url.ADMIN_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const login = async (data) => {
    return await axios.post(url.ADMIN_LOGIN, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export default {
    getAllAdmins,
    getAdminById,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    login
};