import argon2 from "argon2";
import validator from "validator";
import {
  createUser,
  deleteUser,
  getAll,
  getByEmail,
  updateUser,
} from "../repository/UsersRepository.js";
import { validatedUser } from "../utils/ValidateUser.js";
import { checkUser } from "../utils/CheckDataExists.js";
import { validatePassword } from "../utils/PasswordStrength.js";

const getAllUser = async () => {
  return await getAll();
};

const getByIdUser = async (uuid) => {
  const user = await checkUser(uuid);
  return user;
};

const userCreate = async (dataUser) => {
  validatedUser(dataUser);

  const existUser = await getByEmail(dataUser.email);
  if (existUser) {
    throw new Error("email already registered");
  }
  validatePassword(dataUser.password);

  const hashPassword = await argon2.hash(dataUser.password);
  return await createUser({ ...dataUser, password: hashPassword });
};

const userUpdate = async (uuid, dataUser) => {
  const user = await checkUser(uuid);
  validatedUser(dataUser, true);

  if (dataUser.email && dataUser.email !== user.email) {
    const existUser = await getByEmail(dataUser.email);
    if (existUser) {
      throw new Error("email already registered");
    }
  }

  let hashPassword = user.password;
  if (dataUser.password) {
    validatePassword(dataUser.password);
    hashPassword = await argon2.hash(dataUser.password);
  }
  return await updateUser(uuid, { ...dataUser, password: hashPassword });
};

const userDelete = async (uuid) => {
  await checkUser(uuid);
  return await deleteUser(uuid);
};

export { getAllUser, getByIdUser, userCreate, userUpdate, userDelete };
