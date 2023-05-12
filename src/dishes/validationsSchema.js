import Joi from 'joi';

export const dishesValidateSchema = Joi.object({
    title: Joi.string().required().min(3),
    price: Joi.number().required().min(1),
    picture: Joi.string().required(),
    description: Joi.string().required().min(10),
    category: Joi.string().required().min(3),
    subcategory: Joi.string().min(3),
    weight: Joi.number().required().positive(),
    bonus: Joi.number().positive(),
    additionalFood: Joi.array().items(
        Joi.object({
            title: Joi.string().required().min(3),
            price: Joi.number().required().min(1),
            weight: Joi.number().positive(),
        })
    ),
});
