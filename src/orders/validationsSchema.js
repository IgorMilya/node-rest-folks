import Joi from 'joi';

export const ordersValidateSchema = Joi.object({
    status: Joi.string()
        .required()
        .pattern(/^opened|delivering|completed$/),
    diningOptions: Joi.string().required(),
    orderNumber: Joi.string().required(),
    totalPrice: Joi.number().required().min(50),
    paymentMethod: Joi.string().required().min(3),
    tip: Joi.object({
        amount: Joi.number().positive().required(),
        type: Joi.string()
            .required()
            .pattern(/^percentage|fixed$/),
    }),
    dishes: Joi.array().items(
        Joi.object({
            title: Joi.string().required().min(3),
            price: Joi.number().required().min(1),
            amount: Joi.number().required().integer().positive(),
        })
    ),
    additionalFood: Joi.array().items(
        Joi.object({
            title: Joi.string().required().min(3),
            price: Joi.number().required().min(1),
            amount: Joi.number().required().integer().positive(),
        })
    ),
    deliveryDetails: Joi.object({
        phone: Joi.string().required().min(10),
        name: Joi.string().required().min(2),
        addresses: Joi.string().required().min(10),
        email: Joi.string().email(),
    }),
    email: Joi.string().email(),
    description: Joi.string().min(5),
});
