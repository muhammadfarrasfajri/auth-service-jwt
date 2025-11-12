import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().max(100).min(3).required(),
  email: Joi.string().max(100).email().required(),
  password: Joi.string()
    .max(100)
    .pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,30}$/))
    .required(),
  role: Joi.string().default("user"),
});

const loginUserValidation = Joi.object({
  email: Joi.string().max(100).email().required(),
  password: Joi.string().max(100).required(),
});

const userValidation = Joi.string().max(300).required();

export { registerUserValidation, loginUserValidation, userValidation };
