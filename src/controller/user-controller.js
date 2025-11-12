import userService from "../service/user-service.js";

const get = async (req, res, next) => {
  try {
    const result = await userService.get(req.params);
    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await userService.create(req.body);
    return res
      .status(201)
      .json({ message: "Create user successfully", data: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;
    const result = await userService.update(user, data);
    return res
      .status(200)
      .json({ message: "Update user Successfully", data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await userService.remove(req.params);
    return res.status(200).json({ message: "Delete user successfully" });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const request = {
      username: req.query.username,
      email: req.query.email,
      page: req.query.page,
      size: req.query.size,
    };
    const result = await userService.search(request);
    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};
export default { get, create, update, remove, search };
