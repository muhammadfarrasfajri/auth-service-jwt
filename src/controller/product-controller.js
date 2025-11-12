import productService from "../service/product-service.js";

const list = async (req, res, next) => {
  try {
    const result = await productService.list(req.params);
    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const { username, uuid } = req.params;
    const result = await productService.get(username, uuid);
    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const username = req.user.username;
    const result = await productService.create(username, req.body);
    return res
      .status(201)
      .json({ message: "created product successfully", data: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { username, uuid } = req.params;
    const productData = req.body;
    const result = await productService.update(username, uuid, productData);
    return res
      .status(200)
      .json({ message: "update product suscessfully", data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { username, uuid } = req.params;
    await productService.remove(username, uuid);
    return res.status(200).json({ message: "delete product susccesfully" });
  } catch (error) {
    next(error);
  }
};

export default { list, get, create, update, remove };
