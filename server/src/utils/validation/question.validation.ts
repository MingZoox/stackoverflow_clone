import Joi from "joi";

const questionSchema = Joi.object({
    title: Joi.string().required().max(150),
    content: Joi.string().required().max(1500),
    tags: Joi.array().required().max(5),
});

export default questionSchema;
