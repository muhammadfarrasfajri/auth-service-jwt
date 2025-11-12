import argon2 from "argon2";
import jwt from "jsonwebtoken";
import generateToken from "../helper/generate-token.js";
import userRepository from "../repository/user-repository.js";
import authRepository from "../repository/auth-repository.js";
import { validate } from "../validation/validation.js";
import {
  loginUserValidation,
  registerUserValidation,
  userValidation,
} from "../validation/auth-validation.js";
import { ResponseError } from "../error/response-error.js";

const register = async (user) => {
  const userRegister = validate(registerUserValidation, user);

  const existUser = await userRepository.checkExisUser(userRegister);
  if (existUser) {
    throw new ResponseError(400, "username or email already registered");
  }

  userRegister.password = await argon2.hash(userRegister.password);

  return await userRepository.create(userRegister);
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await userRepository.checkExisUser(loginRequest);
  if (!user) {
    throw new ResponseError(401, "email or password wrong");
  }

  const valid = await argon2.verify(user.password, loginRequest.password);
  if (!valid) {
    throw new ResponseError(401, "email or password wrong");
  }

  if (user.refreshToken) {
    throw new ResponseError(400, "User is already logged in");
  }

  const { accessToken, refreshToken } = generateToken(user);

  await authRepository.updateAuth(user, refreshToken);

  return { accessToken, refreshToken };
};

const refreshAccessToken = async (username, refreshToken) => {
  const token = validate(userValidation, refreshToken);

  const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  if (decode.username !== username) throw new ResponseError(400, "token not match");

  const user = await authRepository.getRefreshToken(decode.username, token);
  if (!user) {
    throw new ResponseError(400, "invalid refresh token");
  }

  const { accessToken } = generateToken(user);

  return accessToken;
};

const logout = async (request) => {
  const user = (userValidation, request);
  if (!user) {
    throw new ResponseError(401, "logout failed");
  }
  await authRepository.updateAuth(user, null);
};

export default { register, login, refreshAccessToken, logout };
