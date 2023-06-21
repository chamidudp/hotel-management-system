const userRepository = require("../repositories/userRepository");

async function getAllUsers() {
  return await userRepository.getAllUsers();
}

async function getUserById(id) {
  return await userRepository.getUserById(id);
}

async function createUser(name, email) {
  return await userRepository.createUser(name, email);
}

async function updateUser(id, name, email) {
  return await userRepository.updateUser(id, name, email);
}

async function deleteUser(id) {
  return await userRepository.deleteUser(id);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
