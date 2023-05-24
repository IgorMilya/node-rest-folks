import Joi from 'joi';

export const ordersValidateSchema = Joi.object({
    orderType: Joi.string()
        .required()
        .pattern(/^takeaway|delivery|dine-in$/),
    orderNumber: Joi.string().required(),
    table: Joi.string(),

    dishes: Joi.array().items(
        Joi.object({
            dishID: Joi.string().required().min(3),
            amount: Joi.number().required().integer().positive(),
        })
    ),
    description: Joi.string().min(5),
});
