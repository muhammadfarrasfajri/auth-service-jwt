import Joi from "joi";

const createUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  email: Joi.string().max(100).email().required(),
  password: Joi.string()
    .max(100)
    .pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,30}$/))
    .required(),
  role: Joi.string().max(100).required(),
});

const updateUserValidation = Joi.object({
  username: Joi.string().max(100).optional(),
  email: Joi.string().max(100).email().optional(),
  password: Joi.string()
    .max(100)
    .pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,30}$/))
    .optional(),
  role: Joi.string().optional(),
});

const searchUserValidation = Joi.object({
  username: Joi.string().optional(),
  email: Joi.number().optional(),
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
});

const getUserValidator = Joi.object({
  username: Joi.string().max(100).required(),
});
export {
  createUserValidation,
  updateUserValidation,
  getUserValidator,
  searchUserValidation,
};
