import * as url from "./url";
import axios from "axios";

const getAllContactUs = async () => {
    return await axios.get(url.CONTACTUS, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getContactUsById = async (id) => {
    return await axios.get(url.CONTACTUS_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const addContactUs = async (data) => {
    return await axios.post(url.CONTACTUS, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const updateContactUs = async (id, data) => {
    return await axios.put(url.CONTACTUS_PARAM(id), data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const deleteContactUs = async (id) => {
    return await axios.delete(url.CONTACTUS_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export default {
    getAllContactUs,
    getContactUsById,
    addContactUs,
    updateContactUs,
    deleteContactUs
};