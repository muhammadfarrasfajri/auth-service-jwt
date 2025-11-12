import argon2 from "argon2";
import userRepository from "../repository/user-repository.js";
import {
  createUserValidation,
  getUserValidator,
  searchUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";

const get = async (user) => {
  const userRequest = validate(getUserValidator, user);

  const result = await userRepository.get(userRequest);
  if (!result) throw new ResponseError(404, "user not found");

  return result;
};

const create = async (user) => {
  const userRequest = validate(createUserValidation, user);

  const existUser = await userRepository.checkExisUser(userRequest);
  if (existUser) {
    throw new ResponseError(400, "email already registered");
  }

  userRequest.password = await argon2.hash(userRequest.password);

  return await userRepository.create(userRequest);
};

const update = async (user, updateUser) => {
  const userRequest = validate(getUserValidator, user);
  const data = validate(updateUserValidation, updateUser);

  const checkUser = await userRepository.get(userRequest);
  if (!checkUser) throw new ResponseError(404, "user not found");

  if (
    (data.email && data.email !== checkUser.email) ||
    (data.user && data.username !== checkUser.username)
  ) {
    const existUser = await userRepository.checkExisUser(data);
    if (existUser) {
      throw new Error("email already registered");
    }
  }

  if (data.password) {
    data.password = await argon2.hash(data.password);
  }

  return await userRepository.update(userRequest, data);
};

const remove = async (user) => {
  const userRequest = validate(getUserValidator, user);

  if (!(await userRepository.get(userRequest)))
    throw new ResponseError(404, "user not founc");

  return await userRepository.remove(userRequest);
};

const search = async (request) => {
  request = validate(searchUserValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.username) {
    filters.push({
      username: {
        contains: request.username,
      },
    });
  }
  if (request.price) {
    filters.push({
      email: {
        contains: request.email,
      },
    });
  }
  const user = userRepository.search(request, skip, filters);
  return user;
};
export default { get, create, update, remove, search };
