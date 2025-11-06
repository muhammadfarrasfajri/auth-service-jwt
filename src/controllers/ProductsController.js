import {
  getAllProduct,
  getByIdProduct,
  productCreate,
  productDelete,
  productUpdate,
} from "../services/ProductService.js";

const getProducts = async (req, res) => {
  try {
    const getAll = await getAllProduct();
    return res.status(200).json({ getAll });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { uuid } = req.params;
    const product = await getByIdProduct(uuid);
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    await productCreate(productData);
    return res.status(201).json({ message: "created product successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { uuid } = req.params;
    const productData = req.body;
    await productUpdate(uuid, productData);
    return res.status(200).json({ message: "update product suscessfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { uuid } = req.params;
    await productDelete(uuid);
    return res.status(200).json({ message: "delete product susccesfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
