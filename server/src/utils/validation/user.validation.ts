import Joi from "joi";

const registerSchema = Joi.object({
    username: Joi.string().required().max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
});

const updateProfileSchema = Joi.object({
    username: Joi.string().max(30),
    password: Joi.string().min(8),
    about: Joi.string(),
});

export { registerSchema, loginSchema, updateProfileSchema };
