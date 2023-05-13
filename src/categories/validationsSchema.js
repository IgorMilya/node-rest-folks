import Joi from 'joi';

export const categoriesValidateSchema = Joi.object({
    title: Joi.string().required().min(3),
    picture: Joi.string().required(),
});
