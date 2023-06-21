const userService = require("../services/userService");

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createUser(req, res) {
  try {
    const { name, email } = req.body;
    const userId = await userService.createUser(name, email);
    res.status(201).json({ id: userId, name, email });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const { name, email } = req.body;
    const result = await userService.updateUser(id, name, email);
    if (!result) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const result = await userService.deleteUser(id);
    if (!result) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
