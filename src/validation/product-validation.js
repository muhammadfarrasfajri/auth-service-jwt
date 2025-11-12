import Joi from "joi";

const getByIdProductValidation = Joi.string().guid({ version: ["uuidv4"] });

const createProductValidation = Joi.object({
  name: Joi.string().max(200).required(),
  price: Joi.number().max(100).required(),
});

const updateProductValidation = Joi.object({
  name: Joi.string().max(200).optional(),
  price: Joi.number().max(100).optional(),
});

export {
  getByIdProductValidation,
  createProductValidation,
  updateProductValidation,
};
