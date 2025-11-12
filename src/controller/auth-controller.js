import authService from "../service/auth-service.js";
const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    return res
      .status(201)
      .json({ message: "register successfully", data: result });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body);
    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    return res.status(200).json(token.accessToken);
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const username = req.user.username;
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token provided" });
    }
    const token = await authService.refreshAccessToken(username, refreshToken);
    return res.status(200).json(token);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user);
    return res.json({ message: "logout successfully" });
  } catch (error) {
    next(error);
  }
};

export default { register, login, refreshToken, logout };
