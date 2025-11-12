import { ResponseError } from "../error/response-error.js";
import productRepository from "../repository/product-repository.js";
import {
  createProductValidation,
  getByIdProductValidation,
  updateProductValidation,
} from "../validation/product-validation.js";
import { validate } from "../validation/validation.js";

const list = async (user) => {
  return await productRepository.list(user);
};

const get = async (username, uuid) => {
  uuid = validate(getByIdProductValidation, uuid);

  const result = await productRepository.get(username, uuid);
  if (!result) throw new ResponseError(404, "product doesn't exist");

  return result;
};

const create = async (username, product) => {
  const data = validate(createProductValidation, product);
  return await productRepository.create(username, data);
};

const update = async (username, uuid, updateProduct) => {
  await get(username, uuid);

  const data = validate(updateProductValidation, updateProduct);

  return await productRepository.update(username, uuid, data);
};

const remove = async (username, uuid) => {
  await get(username, uuid);
  await productRepository.remove(username, uuid);
};

export default { list, get, create, update, remove };
