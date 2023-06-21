import * as url from "./url";
import axios from "axios";

const getAllCustomers = async () => {
    return await axios.get(url.CUSTOMER, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const getCustomerById = async (id) => {
    return await axios.get(url.CUSTOMER_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const addCustomer = async (data) => {
    return await axios.post(url.CUSTOMER_SIGNUP, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const updateCustomer = async (id, data) => {
    return await axios.put(url.CUSTOMER_PARAM(id), data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const deleteCustomer = async (id) => {
    return await axios.delete(url.CUSTOMER_PARAM(id), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const login = async (data) => {
    return await axios.post(url.CUSTOMER_LOGIN, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export default {
    getAllCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    login
};