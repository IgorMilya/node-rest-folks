import Joi from 'joi';

export const dishesValidateSchema = Joi.object({
    title: Joi.string().required().min(3),
    type: Joi.string().required().min(3),
    price: Joi.number().required().min(1),
    picture: Joi.string(),
    description: Joi.string().min(10),
    categoryID: Joi.string().min(3),
    subcategoryID: Joi.string().min(3),
    weight: Joi.number().required().positive(),
    bonus: Joi.number().positive(),
    additionalFood: Joi.array().items(Joi.string().required().min(3)),
});
