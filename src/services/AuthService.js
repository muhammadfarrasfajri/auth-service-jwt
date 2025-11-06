import argon2 from "argon2";
import { validatedUser } from "../utils/ValidateUser.js";
import jwt from "jsonwebtoken";
import { createUser, getByEmail } from "../repository/UsersRepository.js";

import { validatePassword } from "../utils/PasswordStrength.js";
import generateToken from "../utils/GenerateToken.js";
import { getRefreshToken, updateAuth } from "../repository/AuthRepository.js";

const registerUser = async (dataUser) => {
  validatedUser(dataUser);
  const existUser = await getByEmail(dataUser.email);
  if (existUser) {
    throw new Error("email already registered");
  }
  validatePassword(dataUser.password);
  const hashPassword = await argon2.hash(dataUser.password);
  const data = { ...dataUser, password: hashPassword, role: "user" };
  return await createUser(data);
};

const loginUser = async (email, passoword) => {
  const user = await getByEmail(email);
  if (!user) {
    throw new Error("email or user invalid");
  }
  const valid = await argon2.verify(user.password, passoword);
  if (!valid) {
    throw new Error("email or user invalid");
  }

  const { accessToken, refreshToken } = generateToken(user);

  await updateAuth(user.uuid, refreshToken);
  return { accessToken, refreshToken };
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("no refresh token provided");
  }
  const user = await getRefreshToken(refreshToken);
  if (!user) {
    throw new Error("invalid refresh token");
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const { accessToken } = generateToken(user);
  return accessToken;
};

const logoutUser = async (uuid) => {
  await updateAuth(uuid, null);
};

export { registerUser, loginUser, refreshAccessToken, logoutUser };
