const customerRepository = require("../repositories/customerRepository");

async function getAllCustomers() {
  return await customerRepository.getAllCustomers();
}

async function signUpCustomer(name, email, nic, address, phone, password) {
  return await customerRepository.signUpCustomer(
    name,
    email,
    nic,
    address,
    phone,
    password
  );
}

async function getCustomerByEmail(email) {
  return await customerRepository.getCustomerByEmail(email);
}

async function getCustomerById(id) {
  return await customerRepository.getCustomerById(id);
}

async function updateCustomer(id, name, email, nic, address, phone, password) {
  return await customerRepository.updateCustomer(
    id,
    name,
    email,
    nic,
    address,
    phone,
    password
  );
}

async function deleteCustomer(id) {
  return await customerRepository.deleteCustomer(id);
}



module.exports = {
  getAllCustomers,
  signUpCustomer,
  getCustomerByEmail,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
