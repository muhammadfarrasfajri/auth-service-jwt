import { checkProduct } from "../utils/CheckDataExists.js";
import {
  createProduct,
  deleteProduct,
  getAll,
  updateProduct,
} from "../repository/ProductRepository.js";

const getAllProduct = async () => {
  return await getAll();
};

const getByIdProduct = async (uuid) => {
  const product = await checkProduct(uuid);
  return product;
};

const productCreate = async (productData) => {
  const { name, price, userId } = productData;
  if (!name || !price || !userId) {
    throw new Error("name, price, userId are required");
  }
  return await createProduct(productData);
};

const productUpdate = async (uuid, productData) => {
  await checkProduct(uuid);
  const { name, price } = productData;
  if (!name || !price) {
    throw new Error("name and price are required");
  }
  return await updateProduct(uuid, productData);
};

const productDelete = async (uuid) => {
  const product = await deleteProduct(uuid);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export {
  getAllProduct,
  getByIdProduct,
  productCreate,
  productUpdate,
  productDelete,
};
