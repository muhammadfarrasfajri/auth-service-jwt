import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../services/AuthService.js";

const register = async (req, res) => {
  try {
    const user = req.body;
    const dataUser = await registerUser(user);
    return res.status(201).json({ message: "register successfully", dataUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tokens = await loginUser(email, password);
    return res.status(200).json(tokens);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const token = await refreshAccessToken(refreshToken);
    return res.status(200).json(token);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    await logoutUser(req.user.uuid);
    return res.json({ message: "logout successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export { register, login, refreshToken, logout };
