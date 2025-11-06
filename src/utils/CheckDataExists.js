import { getByIdProduct } from "../repository/ProductRepository.js";
import { getByIdUser } from "../repository/UsersRepository.js";

const checkUser = async (uuid) => {
  const data = await getByIdUser(uuid);
  if (!data) {
    throw new Error("User not found");
  }
  return data;
};

const checkProduct = async (uuid) => {
  const data = await getByIdProduct(uuid);
  if (!data) {
    throw new Error("Product not found");
  }
  return data;
};

export { checkUser, checkProduct };
