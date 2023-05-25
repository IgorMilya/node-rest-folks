import Joi from 'joi';

export const billsValidateSchema = Joi.object({
    orderID: Joi.string().required(),
    orderType: Joi.string()
        .required()
        .pattern(/^takeaway|delivery|dine-in$/),
    orderNumber: Joi.string().required(),
    table: Joi.string(),
    description: Joi.string(),
    status: Joi.string()
        .required()
        .pattern(/^opened|closed$/),
    totalPrice: Joi.number().positive(),
    tip: Joi.number().positive(),
    email: Joi.string().email(),
    paymentMethod: Joi.string(),
    dishes: Joi.array().items(
        Joi.object({
            dishID: Joi.string().required().min(3),
            amount: Joi.number().required().integer().positive(),
            title: Joi.string().min(3),
            price: Joi.number().required().positive(),
        })
    ),
});
