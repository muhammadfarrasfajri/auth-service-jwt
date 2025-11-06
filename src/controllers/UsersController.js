import {
  getAllUser,
  getByIdUser,
  userCreate,
  userDelete,
  userUpdate,
} from "../services/UserService.js";

const getUsers = async (req, res) => {
  try {
    const user = await getAllUser();
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await getByIdUser(uuid);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = req.body;
    await userCreate(user);
    return res.status(201).json({ message: "Create user successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { uuid } = req.params;
    const dataUser = req.body;
    const user = await userUpdate(uuid, dataUser);
    return res.status(200).json({ message: "Update user Successfully", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { uuid } = req.params;
    await userDelete(uuid);
    return res.status(200).json({ message: "Delete user successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
